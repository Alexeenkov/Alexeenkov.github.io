<template>
  <aside class="app-filters">
    <section class="toggle-group">
      <button
        v-for="filter in filters"
        :key="filter"
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
  PropType,
  toRefs,
  unref,
} from 'vue';
import { Filter } from '@/types/Filter';

interface State {
  filters: Filter[],
}

export default defineComponent({
  data(): State {
    return {
      filters: [
        'All',
        'Active',
        'Done',
      ],
    };
  },
  props: {
    activeFilter: {
      type: String as PropType<Filter>,
      required: true,
    },
  },
  methods: {
    setFilter(filter: Filter) {
      this.$emit('setFilter', filter);
    },
  },
  emits: {
    setFilter: (filter: Filter) => filter,
  },
  setup(props) {
    const { activeFilter } = toRefs(props);

    const buttonClasses = (filter: Filter) => ({
      'button--primary': unref(activeFilter) === filter,
    });

    return {
      buttonClasses,
    };
  },
});
</script>
