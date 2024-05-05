<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { useMutation, useQuery } from '@tanstack/vue-query'

import type { ICustomer } from '~/types/deals.types'

interface InputFileEvent extends Event {
  target: HTMLInputElement
}

interface ICustomerFormState extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

useSeoMeta({
  title: `Редактирование компании`
})

const route = useRoute()
const customerId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormState>()

const { data, isSuccess } = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(import.meta.env.DB_ID, import.meta.env.COLLECTION_CUSTOMERS, customerId)
})

watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || '',
    name: initialData.name
  })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const { mutate, isPending } = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: ICustomerFormState) =>
    DB.updateDocument(import.meta.env.DB_ID, import.meta.env.COLLECTION_CUSTOMERS, customerId, data)
})

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ['upload image'],
  mutationFn: (file: File) => storage.createFile(import.meta.env.STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const response = storage.getFileDownload(import.meta.env.STORAGE_ID, data.$id)
    setFieldValue('avatar_url', response.href)
  }
})

const onSubmit = handleSubmit(values => {
  mutate(values)
})
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Редактирование {{ (data as unknown as ICustomerFormState)?.name }}</h1>

    <form class="form" @submit="onSubmit">
      <ui-input v-model="name" v-bind="nameAttrs" class="input" type="text" placeholder="Наименование" />

      <ui-input v-model="email" v-bind="emailAttrs" class="input" type="text" placeholder="Email" />
      <ui-input v-model="fromSource" v-bind="fromSourceAttrs" class="input" type="text" placeholder="Откуда пришел?" />

      <img
        v-if="values.avatar_url || isUploadImagePending"
        class="rounded-full my-4"
        alt=""
        width="50"
        height="50"
        :src="values.avatar_url"
      />

      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">Логотип</div>

          <ui-input
            type="file"
            :disabled="isUploadImagePending"
            :onchange="(e: InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
          />
        </label>
      </div>

      <ui-button class="mt-3" variant="secondary" :disabled="isPending">
        {{ isPending ? 'Загрузка...' : 'Сохранить' }}
      </ui-button>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>
