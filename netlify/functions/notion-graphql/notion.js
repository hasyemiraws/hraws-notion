const { Client } = require('@notionhq/client')

// Initializing a client
const notion = new Client({
  auth: process.env.NUXT_NOTION_SECRET,
})
const databaseId = process.env.NUXT_NOTION_DB_ID
const getAllPages = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'published_date',
          direction: 'descending',
        },
      ],
      filter: {
        "property": "status",
        "multi_select": {
            "contains": "Published"
        }
      }
    })
    const resultData = response.results
    return resultData.map(({ id, properties }) => {
      return transformResponse(id, properties)
    })
  } catch (err) {
    return err
  }
}

const getPageBlocks = async (pageId) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 50,
    })
    const resultData = response.results
    return resultData.map((data) => {
        const obj = {
            id: data.id,
            pageId: data.parent.page_id,
            type: data.type,
        }
        switch (data.type) {
          case 'paragraph':
          case 'heading_1':
          case 'heading_2':
          case 'heading_3':
          case 'quote':
            obj['content'] = { 
              richText: data[`${data.type}`].rich_text, 
              color: data[`${data.type}`].color, 
              isToggleable: data[`${data.type}`].is_toggleable
            }
            break;
          case 'callout':
            obj['content'] = { 
              richText: data[`${data.type}`].rich_text, 
              color: data[`${data.type}`].color, 
              icon: data[`${data.type}`].icon,
              children: data[`${data.type}`].children
            }
            break;
          default:
            obj['content'] = null
            break;
        }

        return obj
    })
  } catch (err) {
    return err
  }
}

const transformResponse = (id, properties) => ({
  id,
  page_title: properties?.['Page Title']?.title[0]?.plain_text,
  meta_title: properties?.['Meta Title']?.rich_text[0]?.plain_text,
  meta_description: properties?.['Meta Description']?.rich_text[0]?.plain_text,
  slug: properties?.slug?.rich_text[0]?.plain_text
})

exports.getAllPages = getAllPages
exports.getPageBlocks = getPageBlocks
