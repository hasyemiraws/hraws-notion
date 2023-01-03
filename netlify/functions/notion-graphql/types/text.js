const TextBlock = `
  type Text {
    richText: [RichText]
    color: String
    isToggleable: Boolean
  }
  type Quote {
    richText: [RichText]
    color: String
  }
  type TextBlock implements PageBlock {
    id: ID
    pageId: ID
    type: String
    content: Text
  }
  type QuoteBlock implements PageBlock {
    id: ID
    pageId: ID
    type: String
    content: Quote
  }
  type Callout {
    richText: [RichText]
    icon: Emoji
    color: String
    children: [PageBlock]
  }
  type CalloutBlock implements PageBlock {
    id: ID
    pageId: ID
    type: String
    content: Callout
  }`

module.exports = TextBlock