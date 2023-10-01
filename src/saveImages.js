import path from 'node:path'
import parseHTML from './parseHTML.js'
import { writeFile } from 'node:fs/promises';

export default async function (html, pathToSave) {
  console.log(`Saving Images`)
  if (!html) {
    throw new Error('No html provided');
  }
  const HTML = parseHTML(html);

  const imgs = HTML.querySelectorAll('img');

  await Promise.all(imgs.map(async (img) => {
    const { src } = img.attrs;
    //const filename = stringToFilename(src);
    const res = await fetch(src);
    const blob = await res.blob();

    const filename = `${new Date().getTime()}.png`
    const finalPath = path.join(pathToSave, filename);

    const dir = path.dirname(finalPath).split(path.sep).reverse()[0];
    const webPath = `./${dir}/${filename}`;

    await writeFile(path.toNamespacedPath(finalPath), blob.stream());

    img.setAttribute('src', webPath);
    img.removeAttribute('srcset')
  }))

  console.log(`Images Saved`);
  return HTML.innerHTML;
}