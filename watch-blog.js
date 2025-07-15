const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

console.log('Watching blog-pages for .qmd changes...');

chokidar.watch('public/assets/blog-pages/**/*.qmd').on('change', (filePath) => {
  console.log(`📝 ${filePath} changed, rendering...`);
  
  exec(`quarto render "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error rendering ${filePath}:`, error.message);
      return;
    }
    console.log(`✅ ${path.basename(filePath)} rendered successfully!`);
  });
});

// Also watch for new files
chokidar.watch('blog-pages/**/*.qmd').on('add', (filePath) => {
  console.log(`📄 New file detected: ${filePath}, rendering...`);
  exec(`quarto render "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error rendering ${filePath}:`, error.message);
      return;
    }
    console.log(`✅ ${path.basename(filePath)} rendered successfully!`);
  });
});