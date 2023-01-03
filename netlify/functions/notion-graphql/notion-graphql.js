const { ApolloServer, gql, __resolveType } = require('apollo-server-lambda')
const { getAllPages, getPageBlocks } = require('./notion.js')
const Page = require('./types/page.js')
const Common = require('./types/common.js')
const TextBlock = require('./types/text.js')

const typeDefs = gql`
  type DefaultBlock implements PageBlock {
    id: ID
    pageId: ID
    type: String
    content: String
  }
  type Query {
    getPages: [Page]
    getPageBlocks(pageId: ID!): [PageBlock]
  }
`

const resolvers = {
  PageBlock: {
    __resolveType(obj) {
      if (obj.type === 'paragraph' || obj.type === 'heading_1' || obj.type === 'heading_2' || obj.type === 'heading_3') {
        return 'TextBlock'
      }
      if (obj.type === 'quote') {
        return 'QuoteBlock'
      }
      if (obj.type === 'callout') {
        return 'CalloutBlock'
      }
      return 'DefaultBlock'
    }
  },
  Query: {
    getPages: () => {
      try {
        const allRecords = getAllPages()
        return allRecords
      } catch (error) {
        throw new Error(error)
      }
    },
    getPageBlocks: (_, args) => {
      try {
        const pageBlocks = getPageBlocks(args.pageId)
        return pageBlocks
      } catch (error) {
        throw new Error(error)
      }
    }
  },
}

const getHandler = (event, context) => {
  const server = new ApolloServer({
    typeDefs: [Common, Page, TextBlock, typeDefs],
    resolvers,
  })
  const handler = server.createHandler()
  if (!event.requestContext) {
    event.requestContext = context
  }
  return handler(event, context)
}

exports.handler = getHandler
