import getPostText from "./src/getPostText.js";
import filterByCategory from "./src/filterByCategory.js";
import parseHTML from "./src/parseHTML.js";
import getPostArticle from "./src/getPostArticle.js";
import savePosts from './src/savePosts.js';

import arguments from './src/arguments.js';

const { category, saveDir } = arguments();

const getPost = async (category, page) => {

  console.log(`Getting posts from ${category} page ${page}`);

  const URL = `https://andalinux.wordpress.com/tag/${category}/page/${page}`;
  const HTMLTEXT = await fetch(
    URL
  ).then(res => res.text());

  const HTML = parseHTML(HTMLTEXT);
  const Anchors = HTML.querySelectorAll('article > a');
  const URLS = Anchors.map(link => link.attrs.href)

  const postsURLS = [...new Set(filterByCategory(URLS, category))];

  if (postsURLS.length === 0) {
    console.log(`No posts found for ${category} page ${page}`);
    return null;
  }
  console.log(`Found ${postsURLS.length} posts for ${category} page ${page}`);
  console.log('Saving into:', saveDir);

  const posts = await Promise.all(postsURLS.map(async (postURL) => {
    const text = await getPostText(postURL);
    if (!text || text.length === 0 || typeof text !== 'string') {
      return null
    }
    const html = parseHTML(text);
    const article = getPostArticle(html);
    if (!article || article.length === 0 || typeof article !== 'string') {
      return null;
    }

    const title = html.querySelector('title').text;

    return {
      text,
      html,
      article,
      title
    }
  }))

  await savePosts(posts, saveDir);

  return getPost(category, page + 1);
}

getPost(category, 1)