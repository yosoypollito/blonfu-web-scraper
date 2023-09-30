export default async function (postURL) {
  try {
    const res = await fetch(postURL);
    const text = await res.text();

    return text;
  } catch {
    return null;
  }
}