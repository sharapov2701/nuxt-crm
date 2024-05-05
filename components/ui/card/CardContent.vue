<script setup lang="ts">
import { cn } from '@/lib'

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="cn('p-3 pt-0', props.class)">
    <slot />
  </div>
</template>
