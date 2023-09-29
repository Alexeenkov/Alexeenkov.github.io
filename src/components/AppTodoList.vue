<template>
  <div class="todo-list-wrapper">
    <ul
      v-if="filteredTodos.length"
      class="todo-list"
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
  toRefs,
} from 'vue';
import { useTodosStore } from '@/stores/todosStore';
import { Filters } from '@/constants/Filters';
import AppTodoItem from './AppTodoItem.vue';

export default defineComponent({
  name: 'AppTodoList',
  components: {
    AppTodoItem,
  },
  setup() {
    const { filteredTodos, activeFilter } = toRefs(useTodosStore());

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
