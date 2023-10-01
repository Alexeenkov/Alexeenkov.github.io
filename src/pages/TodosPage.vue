<template>
  <LayoutDefault class="todos-page">
    <template #filters>
      <TodosFilters class="todos-page__filters"/>
      <TodosSortBtn class="todos-page__sort"/>
    </template>

    <TodosList/>
    <TodosFormAdd/>

    <template #footer>
      <TodosFooter/>
    </template>
  </LayoutDefault>
</template>

<script setup lang="ts">
import TodosFilters from '@/components/TodosFilters/TodosFilters.vue';
import TodosList from '@/components/TodosList/TodosList.vue';
import TodosFormAdd from '@/components/TodosFormAdd/TodosFormAdd.vue';
import TodosFooter from '@/components/TodosFooter/TodosFooter.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import TodosSortBtn from '@/components/TodosSortBtn/TodosSortBtn.vue';
</script>

<style scoped lang="scss">
  @import "@/pages/styles/todos-page";
</style>
