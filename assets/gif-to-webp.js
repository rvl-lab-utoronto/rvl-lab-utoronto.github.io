const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "./slideshow";         // Your source folder
const outputFolder = "./slideshow/test";   // Your target folder

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Include GIF in supported extensions
const imageExtensions = ['.gif'];

fs.readdir(inputFolder, async (err, files) => {
  if (err) {
    console.error("❌ Failed to read input folder:", err);
    return;
  }

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (imageExtensions.includes(ext)) {
      const inputPath = path.join(inputFolder, file);
      const outputFileName = path.basename(file, ext) + ".webp";
      const outputPath = path.join(outputFolder, outputFileName);

      try {
        if (ext === '.gif') {
          console.log(`🔄 Converting GIF (first frame only): ${file}...`);
        }
        
        await sharp(inputPath, { pages: -1 })
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        const status = ext === '.gif' ? '(static)' : '';
        console.log(`✅ Converted ${status}: ${file} → ${outputFileName}`);
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err.message);
      }
    }
  }

  console.log("\n🎉 Conversion complete!");
  if (files.some(f => path.extname(f).toLowerCase() === '.gif')) {
    console.log("ℹ️  Note: GIF animations were converted to static images.");
    console.log("   For animated WebP, consider using the FFmpeg version.");
  }
});