import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";

const PUBLIC_DIR = path.resolve("public");
const MAX_WIDTH = 1920;
const QUALITY = 80;
const EXTENSIONS = [".jpg", ".jpeg", ".png"];

// Collect all image files recursively
async function collectImages(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip MODIFICATION, logos SVG dirs
      if (entry.name === "MODIFICATION") continue;
      results.push(...(await collectImages(fullPath)));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function getFileSize(filePath) {
  const s = await stat(filePath);
  return s.size;
}

function formatSize(bytes) {
  if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
  return `${(bytes / 1024).toFixed(0)}K`;
}

async function convertImage(filePath) {
  const originalSize = await getFileSize(filePath);
  const ext = path.extname(filePath);
  const webpPath = filePath.replace(new RegExp(`\\${ext}$`, "i"), ".webp");

  try {
    const metadata = await sharp(filePath).metadata();
    let pipeline = sharp(filePath);

    // Resize if wider than MAX_WIDTH
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    // Convert to WebP
    await pipeline
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const newSize = await getFileSize(webpPath);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(0);

    // Delete original
    if (webpPath !== filePath) {
      await unlink(filePath);
    }

    return {
      original: filePath,
      webp: webpPath,
      originalSize,
      newSize,
      savings: `${savings}%`,
      resized: metadata.width > MAX_WIDTH,
    };
  } catch (err) {
    console.error(`  ERROR: ${filePath} — ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("Scanning /public for images...\n");
  const images = await collectImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to optimize.\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  const results = [];

  // Process in batches of 10 for memory
  for (let i = 0; i < images.length; i += 10) {
    const batch = images.slice(i, i + 10);
    const batchResults = await Promise.all(batch.map(convertImage));
    for (const r of batchResults) {
      if (r) {
        results.push(r);
        totalOriginal += r.originalSize;
        totalNew += r.newSize;
        const rel = path.relative(PUBLIC_DIR, r.original);
        const relNew = path.relative(PUBLIC_DIR, r.webp);
        console.log(`  ${rel} (${formatSize(r.originalSize)}) → ${relNew} (${formatSize(r.newSize)}) [${r.savings}]${r.resized ? " [resized]" : ""}`);
      }
    }
  }

  console.log(`\n${"═".repeat(60)}`);
  console.log(`TOTAL: ${formatSize(totalOriginal)} → ${formatSize(totalNew)} (${((1 - totalNew / totalOriginal) * 100).toFixed(0)}% saved)`);
  console.log(`Images converted: ${results.length}/${images.length}`);
}

main().catch(console.error);
