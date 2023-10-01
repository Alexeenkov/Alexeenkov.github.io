<template>
  <button
    @click="toggleSortOrder"
    type="button"
    class="todos-sort-btn"
  >
    <i
      v-if="isSortEarlyFirst"
      class="bi bi-sort-down-alt"
    />
    <i
      v-else
      class="bi bi-sort-up-alt"
    />
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/stores/todosStore';

const dataTodosStore = useTodosStore();
const { isSortEarlyFirst } = storeToRefs(dataTodosStore);
const { toggleSortOrder } = dataTodosStore;
</script>

<style scoped lang="scss">
  @import "@/components/TodosSortBtn/styles/todos-sort-btn";
</style>
