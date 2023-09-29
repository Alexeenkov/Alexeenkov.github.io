<template>
  <header class="app-header">
    <span class="logo">
      TODOS
    </span>
  </header>

  <AppFilters />

  <main class="app-main">
    <AppTodoList />
    <AppAddTodo />
  </main>

  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppFilters from './components/AppFilters.vue';
import AppTodoList from './components/AppTodoList.vue';
import AppAddTodo from './components/AppAddTodo.vue';
import AppFooter from './components/AppFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppFilters,
    AppTodoList,
    AppAddTodo,
    AppFooter,
  },
});
</script>
