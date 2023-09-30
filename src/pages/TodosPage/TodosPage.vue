<template>
  <AppFilters />

  <main class="main">
    <AppTodoList />
    <AppAddTodo />
  </main>

  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppFilters from '@/components/TodosFilters/TodosFilters.vue';
import AppTodoList from '@/components/TodosList/TodosList.vue';
import AppAddTodo from '@/components/TodosFormAdd/TodosFormAdd.vue';
import AppFooter from '@/components/TodosFooter/TodosFooter.vue';

export default defineComponent({
  name: 'TodosPage',
  components: {
    AppFilters,
    AppTodoList,
    AppAddTodo,
    AppFooter,
  },
});
</script>

<style scoped lang="scss">
@import "@/pages/TodosPage/styles/todos-page";
</style>
