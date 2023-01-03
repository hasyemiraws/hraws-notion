// @ts-nocheck 
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    modules: ['@nuxtjs/apollo'],
    apollo: {
        clients: {
          default: {
            httpEndpoint: process.env.NUXT_API_ENDPOINT || 'http://localhost:9999/.netlify/functions/notion-graphql'
          }
        },
      },
})