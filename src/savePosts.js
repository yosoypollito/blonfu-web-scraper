import constants from './constants.js'
import path from 'node:path'

import stringToFilename from './stringToFilename.js';
import createDir from './createDir.js';
import saveImages from './saveImages.js';
import htmlToMD from './htmlToMD.js'
import saveFile from './saveFile.js'


export default async function (posts, savePath) {
  if (!posts) {
    throw new Error('No posts provided');
  }

  await createDir(constants.SAVE_PATH)
  const savingPath = path.join(constants.SAVE_PATH, savePath);
  await createDir(savingPath);

  for (const post of posts) {
    if (!post) {
      continue;
    }
    console.log(`___ Saving ${post.title} `)

    const normalizedPostTitle = stringToFilename(post.title);

    const currentPath = path.join(savingPath, normalizedPostTitle);
    await createDir(currentPath)

    await createDir(path.join(currentPath, 'images'))

    const htmlToSave = await saveImages(post.article, path.join(currentPath, 'images'));

    await saveFile(path.join(currentPath, 'index.html'), htmlToSave);
    await saveFile(path.join(currentPath, 'readme.md'), htmlToMD(htmlToSave));
    console.log(`___ Post Saved ___ \n`)
  }
}