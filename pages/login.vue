<script setup lang="ts">
import { v4 as uuid } from 'uuid'

useSeoMeta({
  title: 'Login | Nuxt CRM'
})

const router = useRouter()
const authStore = useAuthStore()
const isLoadingStore = useIsLoadingStore()

const name = ref('')
const email = ref('')
const password = ref('')

const login = async () => {
  isLoadingStore.set(true)
  await account.createEmailSession(email.value, password.value)
  const response = await account.get()
  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status
    })
  }

  email.value = ''
  password.value = ''
  name.value = ''

  await router.push('/')
  isLoadingStore.set(false)
}

const register = async () => {
  await account.create(uuid(), email.value, password.value, name.value)
  await login()
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <ui-input v-model="email" placeholder="Email" type="email" class="mb-3" />
        <ui-input v-model="password" placeholder="Password" type="password" class="mb-3" />
        <ui-input v-model="name" placeholder="Name" type="name" class="mb-3" />

        <div class="flex items-center justify-center gap-5">
          <ui-button type="button" @click="login">Sign in</ui-button>
          <ui-button type="button" @click="register">Sign up</ui-button>
        </div>
      </form>
    </div>
  </div>
</template>
