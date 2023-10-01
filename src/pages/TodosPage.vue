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

<script setup lang="ts">
import TodosFilters from '@/components/TodosFilters/TodosFilters.vue';
import TodosList from '@/components/TodosList/TodosList.vue';
import TodosFormAdd from '@/components/TodosFormAdd/TodosFormAdd.vue';
import TodosFooter from '@/components/TodosFooter/TodosFooter.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
</script>
