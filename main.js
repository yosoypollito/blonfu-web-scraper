import getPostText from "./src/getPostText.js";
import filterByCategory from "./src/filterByCategory.js";
import parseHTML from "./src/parseHTML.js";
import getPostArticle from "./src/getPostArticle.js";
import savePosts from './src/savePosts.js';

const URL = "https://andalinux.wordpress.com/tag/cinelerra/";
const HTMLTEXT = await fetch(
  URL
).then(res => res.text());

const HTML = parseHTML(HTMLTEXT);
const Anchors = HTML.querySelectorAll('a');
const URLS = Anchors.map(link => link.attrs.href)

const postsURLS = filterByCategory(URLS, "cinelerra");

const posts = await Promise.all(postsURLS.map(async (postURL) => {
  const text = await getPostText(postURL);
  if (!text) {
    return null
  }
  const html = parseHTML(text);
  const article = getPostArticle(html);

  const title = html.querySelector('title').text;

  return {
    text,
    html,
    article,
    title
  }
}))

savePosts(posts);