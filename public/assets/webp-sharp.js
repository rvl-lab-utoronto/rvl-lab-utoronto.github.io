// Script to convert images in a folder to WebP format using Sharp 
// Usage: node webp-sharp.js

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");


const inputFolder = "./project-assets/images";         // Your source folder
const outputFolder = "./project-assets/webp-images";        // Your target folder

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const imageExtensions = ['.jpg', '.jpeg', '.png'];

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
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`✅ Converted: ${file} → ${outputFileName}`);
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err);
      }
    }
  }
});
