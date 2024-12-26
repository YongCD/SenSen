<template>
  <div>
    <h1>Hello</h1>
  </div>
</template>

<script setup lang="ts">
  import { getUserRouteList } from '@/api'
  async function getList () {
    const res = await getUserRouteList(3)
    console.log(res)
  }
  getList()
</script>

<style scoped>

</style>