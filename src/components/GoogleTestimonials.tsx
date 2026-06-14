import Testimonials from "@/components/Testimonials";
import { getGoogleReviews } from "@/lib/google/reviews";

export default async function GoogleTestimonials() {
  const data = await getGoogleReviews();

  if (!data) return null;

  return <Testimonials data={data} />;
}
