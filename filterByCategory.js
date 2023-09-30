export default function (links, category) {
  const postCategoryFilter = new RegExp(`(\\/\\d{1,4}){3}\\/${category}`)
  return links.filter(link => link?.match(postCategoryFilter))
}