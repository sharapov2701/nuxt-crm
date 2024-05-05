<script setup lang="ts">
import dayjs from 'dayjs'

import { useDealSlideStore } from '~/store/deal-slide.store'

const store = useDealSlideStore()
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">О сделке</div>

    <kanban-slideover-label label-text="Наименование">
      <h2>
        {{ store.card?.name }}
      </h2>
    </kanban-slideover-label>

    <kanban-slideover-label label-text="Сумма">
      {{ convertCurrency(store.card?.price || 0) }}
    </kanban-slideover-label>

    <kanban-slideover-label label-text="Статус">
      <ui-badge variant="outline">
        {{ store.card?.status }}
      </ui-badge>
    </kanban-slideover-label>

    <kanban-slideover-label label-text="Клиент">
      {{ store.card?.companyName }}
    </kanban-slideover-label>

    <kanban-slideover-label label-text="Дата создания">
      {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
    </kanban-slideover-label>
  </div>
</template>
