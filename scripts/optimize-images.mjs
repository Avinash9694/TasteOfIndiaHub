// Resizes the full-size photos in image-src/ (gitignored) into web-ready webp
// files under public/img. Run with `npm run images`.
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'image-src');
const OUT = join(ROOT, 'public', 'img');

const PROFILES = {
  recipes: { width: 1200, quality: 78 },
  'top-cheff': { width: 800, quality: 80, dir: 'chefs' },
  gallery: { width: 1200, quality: 76 },
};

const toKebab = (name) =>
  name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

for (const [folder, profile] of Object.entries(PROFILES)) {
  const outDir = join(OUT, profile.dir ?? folder);
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(join(SRC, folder))).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const { name } = parse(file);
    const target = join(outDir, `${toKebab(name)}.webp`);
    const info = await sharp(join(SRC, folder, file))
      .rotate()
      .resize({ width: profile.width, withoutEnlargement: true })
      .webp({ quality: profile.quality })
      .toFile(target);
    console.log(
      `${folder}/${file} -> ${target.replace(ROOT, '')} ${info.width}x${info.height} ${Math.round(info.size / 1024)}K`,
    );
  }
}
