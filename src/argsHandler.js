export default function () {

  const args = process.argv.slice(2);

  const categoryIndex = args.findIndex(arg => arg === 'category');
  const category = args[(categoryIndex + 1)];

  if (!category || !category || category.length === 0) {
    throw new Error('No category provided');
  }

  const saveDirIndex = args.findIndex(arg => arg === 'dir');
  let saveDir = args[(saveDirIndex + 1)];

  console.log(`Searching in category: ${category}`);

  if (saveDirIndex === -1 || saveDir.length === 0 || typeof saveDir !== 'string') {
    console.log('Invalid save directory');
    saveDir = category;
  }

  return {
    category,
    saveDir
  }
}