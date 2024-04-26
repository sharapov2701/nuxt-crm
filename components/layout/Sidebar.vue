<script setup lang="ts"></script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <nuxt-link class="mb-10 block" to="/">
      <nuxt-img src="/logo.svg" width="100px" class="mx-auto" />
    </nuxt-link>

    <button class="absolute top-2 right-3 transition-colors hover:text-primary">
      <icon name="line-md:logout" size="22" />
    </button>
  </aside>
</template>
