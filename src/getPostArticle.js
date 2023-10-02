
export default function (html) {
  const postArticle = html.querySelector('article.post');
  if (!postArticle) {
    // This is a second method in case the article is not found
    const headerNav = html.querySelector('.site-header');
    headerNav.remove()

    const shareDivStart = html.innerHTML.indexOf('id="jp-post-flair"');

    const shareDiv = html.querySelector('#jp-post-flair');
    shareDiv.remove()

    return html.innerHTML.slice(0, shareDivStart);
  }

  return postArticle.innerHTML;
}