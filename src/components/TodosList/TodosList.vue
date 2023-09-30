<template>
  <div class="todos-list">
    <ul
      v-if="filteredTodos.length"
      class="todos-list__items"
    >
      <AppTodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
      />
    </ul>
    <span v-else>
      {{ emptyMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  unref,
} from 'vue';
import { useTodosStore } from '@/stores/todosStore';
import { Filters } from '@/constants/Filters';
import { storeToRefs } from 'pinia';
import AppTodoItem from './TodosListItem.vue';

export default defineComponent({
  name: 'TodosList',
  components: {
    AppTodoItem,
  },
  setup() {
    const { filteredTodos, activeFilter } = storeToRefs(useTodosStore());

    const emptyMessage = computed((): string => {
      switch (unref(activeFilter)) {
        case (Filters.DONE):
          return 'You have not completed any tasks';
        case (Filters.ACTIVE):
          return 'No active tasks';
        case Filters.ALL:
        default:
          return 'Add your first task';
      }
    });

    return {
      filteredTodos,
      emptyMessage,
    };
  },
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosList/styles/todos-list";
</style>
