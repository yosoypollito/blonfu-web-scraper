import constants from './constants.js'
import path from 'node:path'

import stringToFilename from './stringToFilename.js';
import createDir from './createDir.js';
import saveImages from './saveImages.js';
import htmlToMD from './htmlToMD.js'
import saveFile from './saveFile.js'


export default async function (posts) {
  if (!posts) {
    throw new Error('No posts provided');
  }

  await createDir(constants.SAVE_PATH)

  for (const post of posts) {
    if (!post) {
      continue;
    }
    console.log(`Saving ${post.title}`)

    const normalizedPostTitle = stringToFilename(post.title);

    await createDir(path.join(constants.SAVE_PATH, normalizedPostTitle))
    const currentPath = path.join(constants.SAVE_PATH, normalizedPostTitle);

    await createDir(path.join(currentPath, 'images'))

    const htmlToSave = await saveImages(post.article, path.join(currentPath, 'images'));

    await saveFile(path.join(currentPath, 'index.html'), htmlToSave);
    await saveFile(path.join(currentPath, 'readme.md'), htmlToMD(htmlToSave));
  }
}