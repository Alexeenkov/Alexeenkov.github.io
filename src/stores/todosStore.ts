import { defineStore } from 'pinia';
import {
  Ref,
  ref,
  computed,
  ComputedRef,
  unref,
} from 'vue';
import { Todo } from '@/interfaces/Todo';
import { Stats } from '@/interfaces/Stats';
import { Filter } from '@/interfaces/Filter';
import { Filters } from '@/constants/Filters';

export const useTodosStore = defineStore('todos', () => {
  const todos: Ref<Todo[]> = ref([
    {
      id: 0,
      text: 'Learn the basics of Vue',
      completed: true,
    },
    {
      id: 1,
      text: 'Learn the basics of Typescript',
      completed: false,
    },
    {
      id: 2,
      text: 'Subscribe to the channel',
      completed: false,
    },
  ]);

  const activeFilter = ref(Filters.ALL);

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

  const setFilter = (filter: Filter): void => {
    activeFilter.value = filter;
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

  return {
    todos,
    filteredTodos,
    activeFilter,
    stats,
    setFilter,
    removeTodo,
    addTodo,
    toggleTodo,
  };
});
