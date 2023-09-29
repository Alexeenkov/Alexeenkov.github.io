<template>
  <aside class="app-filters">
    <section class="toggle-group">
      <button
        v-for="(filter, index) in filters"
        :key="`${filter}-${index}`"
        @click="setFilter(filter)"
        class="button"
        :class="buttonClasses(filter)"
      >
        {{ filter }}
      </button>
    </section>
  </aside>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  unref,
} from 'vue';
import { Filter } from '@/interfaces/Filter';
import { useTodosStore } from '@/stores/todosStore';
import { Filters } from '@/constants/Filters';

export default defineComponent({
  name: 'AppFilters',
  setup() {
    const { activeFilter, setFilter } = toRefs(useTodosStore());

    const filters = [
      Filters.ALL,
      Filters.ACTIVE,
      Filters.DONE,
    ];

    const buttonClasses = (filter: Filter) => ({
      'button--primary': unref(activeFilter) === filter,
    });

    return {
      filters,
      setFilter,
      buttonClasses,
    };
  },
});
</script>
