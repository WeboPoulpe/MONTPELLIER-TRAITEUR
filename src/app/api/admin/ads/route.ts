import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";
import { getGoogleAdsReport } from "@/lib/google/ads";

export async function GET() {
  if (!(await isAuthenticated())) return unauthorizedResponse();
  return Response.json(await getGoogleAdsReport());
}
