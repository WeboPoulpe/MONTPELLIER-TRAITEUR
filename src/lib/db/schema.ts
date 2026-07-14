import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  featuredImage: text("featured_image").notNull(),
  featuredImageAlt: text("featured_image_alt").notNull(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  pageKey: text("page_key").notNull().unique(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const leadSubmissions = pgTable("lead_submissions", {
  id: serial("id").primaryKey(),
  leadId: text("lead_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date"),
  eventCity: text("event_city"),
  eventPostalCode: text("event_postal_code"),
  estimatedValue: text("estimated_value"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  gclid: text("gclid"),
  gbraid: text("gbraid"),
  wbraid: text("wbraid"),
  fbclid: text("fbclid"),
  landingPage: text("landing_page"),
  referrer: text("referrer"),
  crmSuccess: boolean("crm_success").notNull().default(false),
  crmStatus: integer("crm_status"),
  emailSent: boolean("email_sent").notNull().default(false),
  status: text("status").notNull().default("lead"),
  googleAdsConversionStatus: text("google_ads_conversion_status")
    .notNull()
    .default("pending"),
  googleAdsConversionUploadedAt: timestamp("google_ads_conversion_uploaded_at", {
    withTimezone: true,
  }),
  googleAdsConversionAction: text("google_ads_conversion_action"),
  googleAdsConversionError: text("google_ads_conversion_error"),
  formData: jsonb("form_data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type PageContent = typeof pageContents.$inferSelect;
export type LeadSubmission = typeof leadSubmissions.$inferSelect;
