<template>
  <div>
    <h1>Hello</h1>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { SET_AUTH, SET_ROUTE_TREE } from '@/store/mutationTypes'
  const store = useStore()
  store.dispatch('setRouteTree')
</script>

<style scoped>

</style>