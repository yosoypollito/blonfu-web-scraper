import { parse } from 'node-html-parser'

export default function (text) {
  const HTML = parse(text);

  return HTML
}