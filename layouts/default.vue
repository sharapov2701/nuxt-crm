<script lang="ts" setup>
import { account } from '@/lib/appwrite'
import { useAuthStore, useIsLoadingStore } from '~/store/auth.store'

const router = useRouter()
const store = useAuthStore()
const isLoadingStore = useIsLoadingStore()

onMounted(async () => {
  try {
    const user = await account.get()
    if (user) store.set(user)
  } catch (error) {
    router.push('/login')
  } finally {
    isLoadingStore.set(false)
  }
})
</script>

<template>
  <layout-loader v-if="isLoadingStore.isLoading" />

  <section v-else :class="{ grid: store.isAuth }" style="min-height: 100vh">
    <layout-sidebar v-if="store.isAuth" />

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
