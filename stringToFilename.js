export default function (string) {
  return string.replaceAll(" ", "_").replaceAll(':', "");
}