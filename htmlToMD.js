import { NodeHtmlMarkdown } from "node-html-markdown"
export default function (html) {
  if (!html) {
    throw new Error('MD not provided')
  }
  return NodeHtmlMarkdown.translate(html);
}