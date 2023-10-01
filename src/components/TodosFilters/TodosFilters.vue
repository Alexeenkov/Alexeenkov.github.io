<template>
  <aside class="todos-filters">
    <button
      v-for="(filter, index) in filters"
      :key="`${filter}-${index}`"
      @click="setFilter(filter)"
      class="todos-filters__button button"
      :class="buttonClasses(filter)"
    >
      {{ filter }}
    </button>
  </aside>
</template>

<script setup lang="ts">
import { unref } from 'vue';
import { Filter } from '@/interfaces/Filter';
import { useTodosStore } from '@/stores/todosStore';
import { Filters } from '@/constants/Filters';
import { storeToRefs } from 'pinia';

const dataTodosStore = useTodosStore();
const { activeFilter } = storeToRefs(dataTodosStore);
const { setFilter } = dataTodosStore;

const filters = [
  Filters.ALL,
  Filters.ACTIVE,
  Filters.DONE,
];

const buttonClasses = (filter: Filter) => ({
  'button--primary': unref(activeFilter) === filter,
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosFilters/styles/todos-filters";
</style>
