export default function (html) {
  const postArticle = html.querySelector('article');

  return postArticle.innerHTML;
}