require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ Error: Missing environment variables SUPABASE_URL or SUPABASE_KEY"
  );
  process.exit(1);
}

// Use service_role key for uploads (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
const BUCKET_NAME = "game-assets";
const SOURCE_DIR = path.join(__dirname, "../../frontend/src/assets");
const OUTPUT_MAP_FILE = path.join(__dirname, "../../frontend/assets_map.json");
const MAX_WIDTH = 800;
const WEBP_QUALITY = 80;

// Supported image formats
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".tiff",
];

/**
 * Get list of all images from directory
 */
async function getImageFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    return files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    });
  } catch (error) {
    console.error(`❌ Error reading directory ${dir}:`, error.message);
    throw error;
  }
}

/**
 * Optimize image using sharp
 */
async function optimizeImage(inputPath, originalFilename) {
  try {
    const buffer = await sharp(inputPath)
      .resize({
        width: MAX_WIDTH,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    return buffer;
  } catch (error) {
    console.error(`❌ Error optimizing ${originalFilename}:`, error.message);
    throw error;
  }
}

/**
 * Upload file to Supabase Storage
 */
async function uploadToSupabase(buffer, filename) {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, buffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
    throw error;
  }
}

/**
 * Save assets mapping to JSON file
 */
async function saveAssetsMap(assetsMap) {
  try {
    await fs.writeFile(
      OUTPUT_MAP_FILE,
      JSON.stringify(assetsMap, null, 2),
      "utf8"
    );
    console.log(`\n✅ Mapping saved to: ${OUTPUT_MAP_FILE}`);
  } catch (error) {
    console.error(`❌ Error saving mapping:`, error.message);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Starting asset optimization and upload process...\n");
  console.log(`📁 Source: ${SOURCE_DIR}`);
  console.log(`☁️  Bucket: ${BUCKET_NAME}`);
  console.log(
    `📊 Settings: max-width=${MAX_WIDTH}px, quality=${WEBP_QUALITY}, format=WebP\n`
  );

  // Check if directory exists
  try {
    await fs.access(SOURCE_DIR);
  } catch (error) {
    console.error(`❌ Directory not found: ${SOURCE_DIR}`);
    console.error("💡 Create the folder and place images in it.");
    process.exit(1);
  }

  // Get list of images
  const imageFiles = await getImageFiles(SOURCE_DIR);

  if (imageFiles.length === 0) {
    console.log("⚠️  No images found in directory!");
    console.log(`💡 Place images in: ${SOURCE_DIR}`);
    process.exit(0);
  }

  console.log(`📦 Found images: ${imageFiles.length}\n`);

  const assetsMap = {};
  let successCount = 0;
  let errorCount = 0;

  // Process each image
  for (const file of imageFiles) {
    const originalPath = path.join(SOURCE_DIR, file);
    const originalName = file;
    const nameWithoutExt = path.parse(file).name;
    const webpFilename = `${nameWithoutExt}.webp`;

    try {
      console.log(`📤 Uploading ${originalName}...`);

      // Optimize
      const optimizedBuffer = await optimizeImage(originalPath, originalName);

      // Upload to Supabase
      const publicUrl = await uploadToSupabase(optimizedBuffer, webpFilename);

      // Add to mapping
      assetsMap[originalName] = publicUrl;

      console.log(`   ✅ Success → ${webpFilename}`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error processing ${originalName}: ${error.message}`);
      errorCount++;
    }
  }

  // Save mapping
  if (Object.keys(assetsMap).length > 0) {
    await saveAssetsMap(assetsMap);
  }

  // Final statistics
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 STATISTICS:");
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${imageFiles.length}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (errorCount > 0) {
    console.log("⚠️  Some files were not uploaded. Check logs above.");
  } else {
    console.log("🎉 All files successfully processed and uploaded!");
  }
}

// Run script
main().catch((error) => {
  console.error("\n❌ Critical error:", error);
  process.exit(1);
});
