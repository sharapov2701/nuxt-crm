<script setup lang="ts">
import { cn } from '~/utils'

import TableRow from './TableRow.vue'
import TableCell from './TableCell.vue'

interface Props {
  class?: string
  colspan?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  colspan: 1
})
</script>

<template>
  <table-row>
    <table-cell
      :class="cn('p-4 whitespace-nowrap align-middle text-sm text-foreground', props.class)"
      :colspan="props.colspan"
    >
      <div class="flex items-center justify-center py-10">
        <slot />
      </div>
    </table-cell>
  </table-row>
</template>
