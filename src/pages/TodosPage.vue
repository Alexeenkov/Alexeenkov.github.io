<template>
  <LayoutDefault>
    <template #filters>
      <TodosFilters />
    </template>

    <TodosList />
    <TodosFormAdd />

    <template #footer>
      <TodosFooter />
    </template>
  </LayoutDefault>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodosFilters from '@/components/TodosFilters/TodosFilters.vue';
import TodosList from '@/components/TodosList/TodosList.vue';
import TodosFormAdd from '@/components/TodosFormAdd/TodosFormAdd.vue';
import TodosFooter from '@/components/TodosFooter/TodosFooter.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';

export default defineComponent({
  name: 'TodosPage',
  components: {
    TodosFilters,
    TodosList,
    TodosFormAdd,
    TodosFooter,
    LayoutDefault,
  },
});
</script>
