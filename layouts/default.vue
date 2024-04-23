<script setup lang="ts">
console.log('Loaded')
</script>

<template>
  <section class="grid">
    <layout-sidebar />
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>
