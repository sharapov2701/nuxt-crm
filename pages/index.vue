<script setup lang="ts">
import dayjs from 'dayjs'
import { useMutation } from '@tanstack/vue-query'

import type { EnumStatus } from '~/types/deals.types'
import { convertCurrency } from '@/utils/convertCurrency'
import { useDealSlideStore } from '~/store/deal-slide.store'
import { useKanbanQuery } from '@/components/kanban/useKanbanQuery'
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { generateColumnStyle } from '@/components/kanban/generate-gradient'

type TypeMutationVariables = {
  docId: string
  status?: EnumStatus
}

const store = useDealSlideStore()

const { data, isLoading, refetch } = useKanbanQuery()

useSeoMeta({
  title: 'Home | CRM System'
})

const config = useRuntimeConfig()

const { mutate } = useMutation({
  mutationKey: ['move card'],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
    DB.updateDocument(config.public.dbId, config.public.collectionDeals, docId, {
      status
    }),
  onSuccess: () => {
    refetch()
  }
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card
  sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Nuxt CRM</h1>
    <div v-if="isLoading">Loading...</div>

    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          class="min-h-screen"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>

          <div>
            <kanban-create-deal :refetch="refetch" :status="column.id" />
            <ui-card
              v-for="card in column.items"
              :key="card.id"
              class="mb-5"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)"
            >
              <ui-card-header role="button" @click="store.set(card)">
                <ui-card-title>{{ card.name }}</ui-card-title>

                <ui-card-description class="mt-2 block">
                  {{ convertCurrency(card.price) }}
                </ui-card-description>
              </ui-card-header>

              <ui-card-content class="text-xs">
                <div>Компания</div>
                {{ card.companyName }}
              </ui-card-content>

              <ui-card-footer>
                {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
              </ui-card-footer>
            </ui-card>
          </div>
        </div>
      </div>

      <kanban-slideover />
    </div>
  </div>
</template>
