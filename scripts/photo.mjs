// Turns an IB's original portrait into the small WebP the hero uses.
//   npm run photo -- <input image> [output name]
// Crops to the hero's 4:5 frame (keeping the face, via sharp's attention crop), resizes to
// 840×1050 (2× the largest on-screen size, 420×525) and writes public/<name>.webp.
// Upload that file next to ib.json on the server and set "photo": "<name>.webp".
import sharp from 'sharp'
import { statSync } from 'node:fs'
import { basename, extname } from 'node:path'

const [input, name] = process.argv.slice(2)
if (!input) {
  console.error('usage: npm run photo -- <input image> [output name]')
  process.exit(1)
}

const out = `public/${(name ?? basename(input, extname(input))).replace(/\.webp$/, '')}.webp`
await sharp(input)
  .rotate() // honour EXIF orientation from phone photos
  .resize(840, 1050, { fit: 'cover', position: sharp.strategy.attention })
  .webp({ quality: 78, effort: 6 })
  .toFile(out)

const kb = (p) => `${Math.round(statSync(p).size / 1024)} KB`
console.log(`${input} (${kb(input)}) -> ${out} (${kb(out)})`)
