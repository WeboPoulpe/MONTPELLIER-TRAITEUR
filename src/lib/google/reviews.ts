import "server-only";

import { unstable_cache } from "next/cache";

export interface GoogleReview {
  authorName: string;
  authorPhotoUrl?: string;
  authorUrl?: string;
  rating: number;
  text: string;
  publishedAt: string;
  relativeTime: string;
  reviewUrl?: string;
}

export interface GoogleReviewsData {
  placeName: string;
  rating: number;
  totalReviews: number;
  googleMapsUrl: string;
  reviews: GoogleReview[];
}

interface GooglePlaceResponse {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    name?: string;
    rating?: number;
    text?: { text?: string };
    publishTime?: string;
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
}

interface LegacyGoogleReview {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  text?: string;
  time?: number;
  relative_time_description?: string;
}

interface LegacyPlaceResponse {
  status?: string;
  error_message?: string;
  candidates?: Array<{ place_id?: string }>;
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: LegacyGoogleReview[];
  };
}

function legacyReviewData(
  place: LegacyPlaceResponse["result"],
  placeId: string
): GoogleReviewsData | null {
  const reviews = (place?.reviews ?? [])
    .filter((review) => review.text?.trim() && review.author_name)
    .map((review) => ({
      authorName: review.author_name ?? "Client Google",
      authorPhotoUrl: review.profile_photo_url,
      authorUrl: review.author_url,
      rating: Math.max(1, Math.min(5, review.rating ?? 5)),
      text: review.text ?? "",
      publishedAt: review.time
        ? new Date(review.time * 1000).toISOString()
        : "",
      relativeTime: review.relative_time_description ?? "Avis Google",
      reviewUrl: review.author_url,
    }));

  if (reviews.length === 0) return null;

  return {
    placeName: place?.name ?? "Traiteur Montpellier",
    rating: place?.rating ?? 0,
    totalReviews: place?.user_ratings_total ?? 0,
    googleMapsUrl:
      place?.url ??
      `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`,
    reviews,
  };
}

async function getLegacyGoogleReviews(
  apiKey: string
): Promise<GoogleReviewsData | null> {
  let placeId = process.env.GOOGLE_PLACE_ID;

  if (!placeId) {
    const query =
      process.env.GOOGLE_PLACE_QUERY ??
      "Traiteur Montpellier, 81 rue de Padirac, 34070 Montpellier";
    const searchUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    );
    searchUrl.searchParams.set("input", query);
    searchUrl.searchParams.set("inputtype", "textquery");
    searchUrl.searchParams.set("fields", "place_id");
    searchUrl.searchParams.set("language", "fr");
    searchUrl.searchParams.set("key", apiKey);

    const searchResponse = await fetch(searchUrl, { cache: "no-store" });
    const search = (await searchResponse.json()) as LegacyPlaceResponse;
    placeId = search.candidates?.[0]?.place_id;

    if (!searchResponse.ok || search.status !== "OK" || !placeId) {
      console.error(
        `Google Places search error: ${search.status ?? searchResponse.status} ${search.error_message ?? ""}`
      );
      return null;
    }
  }

  const detailsUrl = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );
  detailsUrl.searchParams.set("place_id", placeId);
  detailsUrl.searchParams.set(
    "fields",
    "name,rating,user_ratings_total,url,reviews"
  );
  detailsUrl.searchParams.set("language", "fr");
  detailsUrl.searchParams.set("key", apiKey);

  const detailsResponse = await fetch(detailsUrl, { cache: "no-store" });
  const details = (await detailsResponse.json()) as LegacyPlaceResponse;

  if (!detailsResponse.ok || details.status !== "OK") {
    console.error(
      `Google Places details error: ${details.status ?? detailsResponse.status} ${details.error_message ?? ""}`
    );
    return null;
  }

  return legacyReviewData(details.result, placeId);
}

const getCachedGoogleReviews = unstable_cache(
  async (): Promise<GoogleReviewsData | null> => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey) return null;

    if (!placeId) return getLegacyGoogleReviews(apiKey);

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=fr&regionCode=FR`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,googleMapsUri,reviews",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Google Places API error: ${response.status} ${await response.text()}`
      );
      return getLegacyGoogleReviews(apiKey);
    }

    const place = (await response.json()) as GooglePlaceResponse;
    const reviews = (place.reviews ?? [])
      .filter((review) => review.text?.text && review.authorAttribution?.displayName)
      .map((review) => ({
        authorName: review.authorAttribution?.displayName ?? "Client Google",
        authorPhotoUrl: review.authorAttribution?.photoUri,
        authorUrl: review.authorAttribution?.uri,
        rating: Math.max(1, Math.min(5, review.rating ?? 5)),
        text: review.text?.text ?? "",
        publishedAt: review.publishTime ?? "",
        relativeTime: review.relativePublishTimeDescription ?? "Avis Google",
        reviewUrl: review.googleMapsUri,
      }));

    if (reviews.length === 0) return null;

    return {
      placeName: place.displayName?.text ?? "Traiteur Montpellier",
      rating: place.rating ?? 0,
      totalReviews: place.userRatingCount ?? 0,
      googleMapsUrl:
        place.googleMapsUri ??
        `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`,
      reviews,
    };
  },
  ["google-place-reviews"],
  { revalidate: 21600, tags: ["google-reviews"] }
);

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  try {
    return await getCachedGoogleReviews();
  } catch (error) {
    console.error("Unable to load Google reviews", error);
    return null;
  }
}
