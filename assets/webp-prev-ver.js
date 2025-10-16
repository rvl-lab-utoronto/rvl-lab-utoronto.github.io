const webp=require('webp-converter');

webp.grant_permission();


//pass input image(.jpeg,.pnp .....) path ,output image(give path where to save and image file name with .webp extension)
//pass option(read  documentation for options)

//cwebp(input,output,option)

const result = webp.cwebp("nodejs_logo.jpg","nodejs_logo.webp","-q 80",logging="-v");
result.then((response) => {
  console.log(response);
});


const webp = require("webp-converter");
const fs = require("fs");
const path = require("path");

const inputFolder = "./images";           // Change to your input folder
const outputFolder = "./converted-webp";  // Change to your output folder

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// List of valid image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png'];

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("Error reading input folder:", err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();

    if (imageExtensions.includes(ext)) {
      const inputPath = path.join(inputFolder, file);
      const outputFileName = path.basename(file, ext) + ".webp";
      const outputPath = path.join(outputFolder, outputFileName);

      const result = webp.cwebp(inputPath, outputPath, "-q 80", "-v");
      result.then((response) => {
        console.log(`Converted ${file} → ${outputFileName}:`, response);
      }).catch((err) => {
        console.error(`Error converting ${file}:`, err);
      });
    }
  });
});
