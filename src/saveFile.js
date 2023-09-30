import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import stringToFilename from './stringToFilename.js';

/**
 * @param {string} filename - File Name WITH Extension
 * @param {string} data - Data to save inside file support Buffer and strings (if using html or other type of data must be converted to string before using this function)
 * @description Save data to a file
 */
export default async function (filename, data) {
  try {

    const controller = new AbortController();
    const { signal } = controller;
    const fileData = new Uint8Array(Buffer.from(data, 'utf-8'))

    const promise = writeFile(stringToFilename(filename), fileData, {
      signal
    })

    await promise;

    return filename + 'Saved!'
  } catch (e) {
    console.error(e)
    return null;
  }
}