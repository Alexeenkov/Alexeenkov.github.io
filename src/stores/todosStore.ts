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
import { EditableTodo } from '@/interfaces/EditableTodo';

export const useTodosStore = defineStore('todos', () => {
  const todos: Ref<Todo[]> = ref([]);
  const activeFilter = ref(Filters.ALL);
  const editableTodo: Ref<EditableTodo> = ref({
    isEditing: false,
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
    editableTodo.value.isEditing = false;
    editableTodo.value.id = null;
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
    editableTodo.value.isEditing = true;
    editableTodo.value.id = id;
  };

  const saveEditingTodo = (id: number, newText: string, date: Date): void => {
    const targetTodo = unref(todos).find((todo: Todo) => todo.id === id);

    if (targetTodo) {
      targetTodo.text = newText;
      targetTodo.completed = false;
      targetTodo.date = date;
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
    editableTodo,
    setFilter,
    removeTodo,
    addTodo,
    editTodo,
    toggleTodo,
    cancelEditTodo,
    saveEditingTodo,
  };
});
