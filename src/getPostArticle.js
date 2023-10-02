
export default function (html) {
  const postArticle = html.querySelector('article.post');
  if (!postArticle) {
    // This is a second method in case the article is not found
    const headerNav = html.querySelector('.site-header');
    headerNav.remove()

    return html.innerHTML;
  }

  return postArticle.innerHTML;
}