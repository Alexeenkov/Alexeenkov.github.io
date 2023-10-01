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
import { Filters } from '@/constants/Filters';
import { EditableTodo } from '@/interfaces/EditableTodo';

export const useTodosStore = defineStore('todos', () => {
  const todos: Ref<Todo[]> = ref([]);
  const activeFilter = ref(Filters.ALL);
  const isSortEarlyFirst = ref(true);
  const filteredDate: Ref<null | number> = ref(null);
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

  const filteredTodosByActive: ComputedRef<Todo[]> = computed(() => {
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

  const filteredTodos: ComputedRef<Todo[]> = computed(() => {
    if (unref(filteredDate) === null) {
      return unref(filteredTodosByActive);
    }

    const millisecondsPerDay = 86400000;
    console.log('Фильтрация по дате сработала!');
    return unref(filteredTodosByActive).filter((todo) => todo.date > unref(filteredDate)! && todo.date < unref(filteredDate)! + millisecondsPerDay);
  });

  const setFilteredDate = (date: Date | null): void => {
    if (!date) {
      filteredDate.value = null;
      return;
    }
    filteredDate.value = new Date(date.toDateString()).getTime();
  };

  const sortTodosByDate = (): void => {
    if (unref(isSortEarlyFirst)) {
      todos.value.sort((a: Todo, b: Todo) => a.date - b.date);
      return;
    }
    todos.value.sort((a: Todo, b: Todo) => b.date - a.date);
  };

  const toggleSortOrder = (): void => {
    isSortEarlyFirst.value = !unref(isSortEarlyFirst);
    sortTodosByDate();
  };

  const cancelEditTodo = () => {
    editableTodo.value.isEditing = false;
    editableTodo.value.id = null;
  };

  const setFilter = (filter: Filters): void => {
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

  const saveEditedTodo = (id: number, newText: string, date: Date): void => {
    const targetTodo = unref(todos).find((todo: Todo) => todo.id === id);

    if (targetTodo) {
      targetTodo.text = newText;
      targetTodo.completed = false;
      targetTodo.date = date.getTime();
    }

    cancelEditTodo();
  };

  const todosInLocalStorage = localStorage.getItem('todos');

  if (todosInLocalStorage) {
    todos.value = JSON.parse(todosInLocalStorage)._value;
    sortTodosByDate();
  }

  watch(() => todos, (state) => {
    localStorage.setItem('todos', JSON.stringify(state));
    sortTodosByDate();
  }, { deep: true });

  return {
    todos,
    activeFilter,
    isSortEarlyFirst,
    filteredDate,
    editableTodo,
    filteredTodos,
    stats,
    setFilteredDate,
    toggleSortOrder,
    setFilter,
    removeTodo,
    addTodo,
    editTodo,
    toggleTodo,
    cancelEditTodo,
    saveEditedTodo,
  };
});
