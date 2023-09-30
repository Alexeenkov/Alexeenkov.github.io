<template>
  <li
    class="todos-item"
    :class="todoItemClasses"
  >
    <button
      @click="toggleTodo(todo.id)"
      type="button"
      class="todos-item__button"
    >
      <div class="todos-item__status">
        <i class="bi bi-check2"></i>
      </div>
      <span class="todos-item__text">
        {{ todo.text }}
      </span>
      <div class="todos-item__buttons">
        <button
          @click.stop
          type="button"
          class="todos-item__edit"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <button
          @click.stop="removeTodo(todo.id)"
          type="button"
          class="todos-item__remove"
        >
          <i class="bi bi-trash3"></i>
        </button>
      </div>
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
  name: 'TodosItem',
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
      'todos-item--done': unref(todo).completed,
    }));

    return {
      toggleTodo,
      removeTodo,
      todoItemClasses,
    };
  },
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosList/styles/todos-list-item";
</style>
