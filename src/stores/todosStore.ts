import { defineStore } from 'pinia';
import {
  Ref,
  ref,
  computed,
  ComputedRef,
  unref,
  watch,
} from 'vue';
import { Todo } from '@/interfaces/Todo';
import { Stats } from '@/interfaces/Stats';
import { Filter } from '@/interfaces/Filter';
import { Filters } from '@/constants/Filters';
import { TodoEditing } from '@/interfaces/TodoEditing';

export const useTodosStore = defineStore('todos', () => {
  const todos: Ref<Todo[]> = ref([]);
  const activeFilter = ref(Filters.ALL);
  const todoEditing: Ref<TodoEditing> = ref({
    editing: false,
    id: null,
  });

  const activeTodos: ComputedRef<Todo[]> = computed(() => unref(todos).filter((todo) => !todo.completed));
  const doneTodos: ComputedRef<Todo[]> = computed(() => unref(todos).filter((todo) => todo.completed));

  const stats: ComputedRef<Stats> = computed(() => ({
    active: unref(activeTodos).length,
    done: unref(doneTodos).length,
  }));

  const filteredTodos: ComputedRef<Todo[]> = computed(() => {
    switch (unref(activeFilter)) {
      case (Filters.DONE):
        return unref(todos).filter((todo) => todo.completed);
      case (Filters.ACTIVE):
        return unref(todos).filter((todo) => !todo.completed);
      case Filters.ALL:
      default:
        return unref(todos);
    }
  });

  const cancelEditTodo = () => {
    todoEditing.value.editing = false;
    todoEditing.value.id = null;
  };

  const setFilter = (filter: Filter): void => {
    activeFilter.value = filter;
    cancelEditTodo();
  };

  const removeTodo = (id: number): void => {
    todos.value = unref(todos).filter((todo: Todo) => todo.id !== id);
  };

  const addTodo = (todo: Todo): void => {
    unref(todos).push(todo);
  };

  const toggleTodo = (id: number): void => {
    const targetTodo = unref(todos).find((todo: Todo) => todo.id === id);

    if (targetTodo) {
      targetTodo.completed = !targetTodo.completed;
    }
  };

  const editTodo = (id: number): void => {
    todoEditing.value.editing = true;
    todoEditing.value.id = id;
  };

  const saveEditingTodo = (id: number, newText: string): void => {
    const targetTodo = unref(todos).find((todo: Todo) => todo.id === id);

    if (targetTodo) {
      targetTodo.text = newText;
      targetTodo.completed = false;
    }

    cancelEditTodo();
  };

  const todosInLocalStorage = localStorage.getItem('todos');

  if (todosInLocalStorage) {
    todos.value = JSON.parse(todosInLocalStorage)._value;
  }

  watch(() => todos, (state) => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, { deep: true });

  return {
    todos,
    filteredTodos,
    activeFilter,
    stats,
    todoEditing,
    setFilter,
    removeTodo,
    addTodo,
    editTodo,
    toggleTodo,
    cancelEditTodo,
    saveEditingTodo,
  };
});
