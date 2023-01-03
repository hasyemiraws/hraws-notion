<template>
  <div>
    <NuxtWelcome />
    <h1 class="text-4xl font-bold underline">
      Hello world!
    </h1>
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