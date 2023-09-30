<template>
  <li
    class="todos-item"
    :class="todoItemClasses"
  >
    <button
      @click.stop="toggleThisTask"
      type="button"
      class="todos-item__button"
    >
      <div class="todos-item__status">
        <i class="bi bi-check2"></i>
      </div>
      <div class="todos-item__text">
        {{ todo.text }}
        <textarea
          v-if="editingThisTodo"
          v-autofocus
          v-model="newText"
          class="todos-item__textarea"/>
      </div>
      <div class="todos-item__buttons">
        <button
          v-if="!editingThisTodo"
          @click.stop="editTodo(todo.id)"
          type="button"
          class="todos-item__edit"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <button
          v-if="!editingThisTodo"
          @click.stop="removeTodo(todo.id)"
          type="button"
          class="todos-item__remove"
        >
          <i class="bi bi-trash3"></i>
        </button>
        <button
          v-if="editingThisTodo"
          @click.stop="saveEditingTodo(todo.id, newText)"
          type="button"
          class="todos-item__save"
        >
          <i class="bi bi-floppy"></i>
        </button>
        <button
          v-if="editingThisTodo"
          @click.stop="cancelEditTask"
          type="button"
          class="todos-item__cancel"
        >
          <i class="bi bi-x-lg"></i>
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
  ref,
  unref,
  Ref,
  onBeforeUnmount,
} from 'vue';
import { Todo } from '@/interfaces/Todo';
import { useTodosStore } from '@/stores/todosStore';
import { storeToRefs } from 'pinia';

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
    const todosStore = useTodosStore();
    const { todoEditing } = storeToRefs(todosStore);
    const {
      toggleTodo,
      removeTodo,
      editTodo,
      saveEditingTodo,
      cancelEditTodo,
    } = todosStore;
    const newText: Ref<string> = ref(unref(todo).text);
    const editingThisTodo = computed(() => unref(todoEditing).editing && unref(todoEditing).id === unref(todo).id);

    const todoItemClasses = computed(() => ({
      'todos-item--done': unref(todo).completed && !unref(editingThisTodo),
      'todos-item--disabled': unref(todoEditing).editing && unref(todoEditing).id !== unref(todo).id,
      'todos-item--editing': unref(editingThisTodo),
    }));

    const toggleThisTask = () => {
      if (unref(todoEditing).editing) {
        return;
      }

      toggleTodo(unref(todo).id);
    };

    const cancelEditTask = () => {
      cancelEditTodo();
      newText.value = unref(todo).text;
    };

    onBeforeUnmount(() => {
      if (unref(editingThisTodo)) {
        cancelEditTodo();
      }
    });

    return {
      newText,
      toggleThisTask,
      removeTodo,
      editTodo,
      cancelEditTask,
      saveEditingTodo,
      todoItemClasses,
      editingThisTodo,
    };
  },
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosList/styles/todos-list-item";
</style>
