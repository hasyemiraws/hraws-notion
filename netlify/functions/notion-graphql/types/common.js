const Common = `
interface PageBlock {
    id: ID
    pageId: ID
    type: String
  }
  type Annotations {
    bold: Boolean
    italic: Boolean
    strikethrough: Boolean
    underline: Boolean
    code: Boolean
    color: String
  }
  type URL {
    url: String
  }
  type RichTextContent {
    content: String
    link: URL
  }
  type RichText {
    type: String
    text: RichTextContent
    annotations: Annotations
    plain_text: String
    href: String
  }
  type Emoji {
    type: String
    emoji: String
  }
`;

module.exports = Common
