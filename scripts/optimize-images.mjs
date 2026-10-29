// Generates responsive WebP sizes into public/images/r/, a JPEG Open Graph image and PNG icons,
// and writes src/data/image-sizes.json, which <Img> reads to build srcset.
// Run after adding or replacing photos: npm run images
import sharp from 'sharp'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'

const SRC = 'public/images'
const OUT = `${SRC}/r`
mkdirSync(OUT, { recursive: true })
mkdirSync('src/data', { recursive: true })

const widthsFor = (w) => [360, 560, 800, 1120, 1600].filter((x) => x < w * 0.9)
const manifest = {}

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.webp')).sort()) {
  const name = file.replace(/\.webp$/, '')
  const meta = await sharp(`${SRC}/${file}`).metadata()
  const widths = name === 'og' ? [] : widthsFor(meta.width)
  for (const w of widths) {
    const out = `${OUT}/${name}-${w}.webp`
    if (!existsSync(out)) await sharp(`${SRC}/${file}`).resize({ width: w }).webp({ quality: 70 }).toFile(out)
  }
  manifest[name] = { w: meta.width, h: meta.height, sizes: widths }
}

// Some link-preview crawlers still ignore WebP, so ship a JPEG twin of the OG image.
await sharp(`${SRC}/og.webp`).jpeg({ quality: 84, mozjpeg: true }).toFile('public/og.jpg')
await sharp('public/favicon.svg').resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp('public/favicon.svg').resize(32, 32).png().toFile('public/favicon-32.png')

writeFileSync('src/data/image-sizes.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(`Optimised ${Object.keys(manifest).length} images → ${OUT}`)
