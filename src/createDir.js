import { mkdir } from 'node:fs/promises'

export default async function (path) {
  console.log(`Creating ${path}`);
  try {
    await mkdir(path);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw new Error(e);
    }
  }
}