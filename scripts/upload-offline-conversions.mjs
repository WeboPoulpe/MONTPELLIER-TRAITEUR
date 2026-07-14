#!/usr/bin/env node
import { readFileSync } from "node:fs";

function readEnv(path) {
  const values = {};
  try {
    const raw = readFileSync(path, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const index = trimmed.indexOf("=");
      values[trimmed.slice(0, index).trim()] = trimmed
        .slice(index + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // Optional local env file.
  }
  return values;
}

const localEnv = readEnv(".env.production");
const adminPassword = process.env.ADMIN_PASSWORD || localEnv.ADMIN_PASSWORD;
const baseUrl =
  process.env.TRAITEUR_ADMIN_BASE_URL || "https://www.traiteurmontpellier.com";
const validateOnly = process.argv.includes("--upload") ? false : true;
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const sinceArg = process.argv.find((arg) => arg.startsWith("--since="));

if (!adminPassword) {
  throw new Error("ADMIN_PASSWORD manquant");
}

const body = {
  validateOnly,
  ...(limitArg ? { limit: Number(limitArg.split("=")[1]) } : {}),
  ...(sinceArg ? { since: sinceArg.split("=")[1] } : {}),
};

const response = await fetch(`${baseUrl}/api/admin/ads/offline-conversions`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${adminPassword}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const text = await response.text();
let payload;
try {
  payload = text ? JSON.parse(text) : {};
} catch {
  payload = text;
}

console.log(JSON.stringify(payload, null, 2));

if (!response.ok) {
  process.exitCode = 1;
}
