<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from '~/store/auth.store'

const router = useRouter()
const store = useAuthStore()
const isLoadingStore = useIsLoadingStore()

const logout = async () => {
  isLoadingStore.set(true)
  await account.deleteSession('current')
  store.clear()
  await router.push('/login')
  isLoadingStore.set(false)
}
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <nuxt-link to="/" class="mb-10 block">
      <nuxt-img src="/logo.svg" alt="" width="140px" class="mx-auto" />
    </nuxt-link>

    <button class="absolute top-2 right-3 transition-colors hover:text-primary" @click="logout">
      <icon name="line-md:logout" size="20" />
    </button>

    <layout-menu />
  </aside>
</template>
