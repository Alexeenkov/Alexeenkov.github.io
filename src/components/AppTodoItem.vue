<template>
  <li
    class="todo-item"
    :class="todoItemClasses"
  >
    <button
      @click="toggleTodo(todo.id)"
      type="button"
      class="todo-item__button"
    >
      <div class="todo-item__status">
        <i class="bi bi-check2"></i>
      </div>
      <span class="todo-item__text">
        {{ todo.text }}
      </span>
      <button
        @click.stop="removeTodo(todo.id)"
        type="button"
        class="todo-item__remove-button"
      >
        <i class="bi bi-trash3"></i>
      </button>
    </button>
  </li>
</template>

<script lang="ts">
import {
  PropType,
  computed,
  defineComponent,
  toRefs,
  unref,
} from 'vue';
import { Todo } from '@/interfaces/Todo';
import { useTodosStore } from '@/stores/todosStore';

export default defineComponent({
  name: 'AppTodoItem',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  setup(props) {
    const { todo } = toRefs(props);
    const { toggleTodo, removeTodo } = useTodosStore();

    const todoItemClasses = computed(() => ({
      'todo-item--done': unref(todo).completed,
    }));

    return {
      toggleTodo,
      removeTodo,
      todoItemClasses,
    };
  },
});
</script>
