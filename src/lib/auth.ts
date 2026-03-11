import { headers } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  return token === process.env.ADMIN_PASSWORD;
}

export function unauthorizedResponse() {
  return Response.json({ error: "Non autorisé" }, { status: 401 });
}
