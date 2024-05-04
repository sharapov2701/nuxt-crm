<script setup lang="ts">
useSeoMeta({ title: 'Login | Nuxt CRM' })

const name = ref('')
const email = ref('')
const password = ref('')
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <ui-input v-model="email" placeholder="Email" type="email" class="mb-3" />
        <ui-input v-model="password" placeholder="Password" type="password" class="mb-3" />
        <ui-input v-model="name" placeholder="Name" type="text" class="mb-3" />
      </form>

      <div class="flex items-center justify-center gap-5">
        <ui-button type="button">Sign in</ui-button>
        <ui-button type="button">Sign up</ui-button>
      </div>
    </div>
  </div>
</template>
