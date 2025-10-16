const imagemin = require('imagemin'),
  webp = require('imagemin-webp')
const outputFolder = 'webp_img'
const produceWebP = async () => {
  await imagemin(['slideshow-copy/*.png'], {
    destination: outputFolder,
    plugins: [
      webp({
        lossless: true
      })
    ]
  })
  console.log('PNGs processed')
  await imagemin(['slideshow-copy/*.{jpg,jpeg}'], {
    destination: outputFolder,
    plugins: [
      webp({
        quality: 65
      })
    ]
  })
  console.log('JPGs and JPEGs processed')
}
produceWebP()