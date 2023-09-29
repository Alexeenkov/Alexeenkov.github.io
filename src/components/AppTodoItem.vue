<template>
  <li class="todo-item" :class="todoItemClasses">
    <button
      @click="toggleTodo"
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
        @click.stop="removeTodo"
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
import { Todo } from '@/types/Todo';

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  methods: {
    toggleTodo() {
      this.$emit('toggleTodo', this.todo.id);
    },
    removeTodo() {
      this.$emit('removeTodo', this.todo.id);
    },
  },
  emits: {
    toggleTodo: (id: number) => Number.isInteger(id),
    removeTodo: (id: number) => Number.isInteger(id),
  },
  setup(props) {
    const { todo } = toRefs(props);

    const todoItemClasses = computed(() => ({
      'todo-item--done': unref(todo).completed,
    }));

    return {
      todoItemClasses,
    };
  },
});
</script>
