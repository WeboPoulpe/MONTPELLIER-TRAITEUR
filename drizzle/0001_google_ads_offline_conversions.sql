ALTER TABLE "lead_submissions"
ADD COLUMN IF NOT EXISTS "google_ads_conversion_status" text NOT NULL DEFAULT 'pending';

ALTER TABLE "lead_submissions"
ADD COLUMN IF NOT EXISTS "google_ads_conversion_uploaded_at" timestamp with time zone;

ALTER TABLE "lead_submissions"
ADD COLUMN IF NOT EXISTS "google_ads_conversion_action" text;

ALTER TABLE "lead_submissions"
ADD COLUMN IF NOT EXISTS "google_ads_conversion_error" text;
