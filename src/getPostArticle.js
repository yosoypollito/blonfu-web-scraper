export default function (html) {
  const postArticle = html.querySelector('article');
  if (!postArticle) {
    return null;
  }

  return postArticle.innerHTML;
}