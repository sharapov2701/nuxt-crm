<script lang="ts" setup>
import dayjs from 'dayjs'

import type { IDeal } from '~/types/deals.types'

import { useComments } from './useComments'
import { useCreateComment } from './useCreateComment'

const { data, refetch, isLoading } = useComments()
const { comment, writeComment } = useCreateComment({ refetch })

const card = data as unknown as IDeal
</script>

<template>
  <ui-input v-model="comment" placeholder="Оставьте комментарий" @keyup.enter="writeComment" />

  <ui-skeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
  <div v-else-if="card">
    <div v-for="comm in card?.comments" :key="comm.$id" class="flex items-start mt-5">
      <icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />

      <div class="border-border bg-black/20 rounded p-3 w-full">
        <div class="mb-2 text-sm">Комментарий {{ dayjs(comm.$createdAt).format('HH:mm') }}</div>
        <p>{{ comm.text }}</p>
      </div>
    </div>
  </div>
</template>
