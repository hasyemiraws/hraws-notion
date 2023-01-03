<template>
  <div>
    <NuxtWelcome />
    <div v-for="pages in data?.getPages" :key="pages.id">
      {{ pages.page_title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
const query = gql`
query GetPages {
  getPages {
    id
    page_title
  }
}
`
const { data } = await useAsyncQuery(query)
</script>