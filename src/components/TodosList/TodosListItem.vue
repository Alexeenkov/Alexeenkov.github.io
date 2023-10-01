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
          v-if="isEditingThisTodo"
          v-autofocus
          v-model="newText"
          class="todos-item__textarea"
        />
      </div>
      <div class="todos-item__date">
        <template v-if="!isEditingThisTodo">
          {{ day }}.{{ month }}.{{ year }}
        </template>
        <VueDatePicker
          v-else
          v-model="newDate"
          :enableTimePicker="false"
          :clearable="false"
          :minDate="new Date()"
          :format="formatDatepicker"
          class="todos-item__datepicker"
        />
      </div>
      <div class="todos-item__buttons">
        <button
          v-if="!isEditingThisTodo"
          @click.stop="editTodo(todo.id)"
          type="button"
          class="todos-item__edit"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <button
          v-if="!isEditingThisTodo"
          @click.stop="removeTodo(todo.id)"
          type="button"
          class="todos-item__remove"
        >
          <i class="bi bi-trash3"></i>
        </button>
        <button
          v-if="isEditingThisTodo"
          @click.stop="saveEditTask"
          type="button"
          class="todos-item__save"
        >
          <i class="bi bi-floppy"></i>
        </button>
        <button
          v-if="isEditingThisTodo"
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

<script setup lang="ts">
import {
  PropType,
  computed,
  toRefs,
  ref,
  unref,
  Ref,
  onBeforeUnmount,
} from 'vue';
import { Todo } from '@/interfaces/Todo';
import { useTodosStore } from '@/stores/todosStore';
import { storeToRefs } from 'pinia';
import { useDateParser } from '@/features/useDateParser';

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    required: true,
  },
});

const { todo } = toRefs(props);
const dataTodosStore = useTodosStore();
const { editableTodo } = storeToRefs(dataTodosStore);
const {
  toggleTodo,
  removeTodo,
  editTodo,
  saveEditingTodo,
  cancelEditTodo,
} = dataTodosStore;

let dateTodo = new Date(todo.value.date);
const newText: Ref<string> = ref(unref(todo).text);
const newDate: Ref<Date> = ref(dateTodo);

const {
  day,
  month,
  year,
  formatDatepicker,
} = useDateParser(newDate);

const isEditingThisTodo = computed(() => unref(editableTodo).isEditing && unref(editableTodo).id === unref(todo).id);

const todoItemClasses = computed(() => ({
  'todos-item--done': unref(todo).completed && !unref(isEditingThisTodo),
  'todos-item--disabled': unref(editableTodo).isEditing && unref(editableTodo).id !== unref(todo).id,
  'todos-item--editing': unref(isEditingThisTodo),
}));

const toggleThisTask = () => {
  if (unref(editableTodo).isEditing) {
    return;
  }

  toggleTodo(unref(todo).id);
};

const saveEditTask = () => {
  saveEditingTodo(
    unref(todo).id,
    unref(newText),
    unref(newDate),
  );

  dateTodo = unref(newDate);
};

const cancelEditTask = () => {
  cancelEditTodo();
  newText.value = unref(todo).text;
  newDate.value = dateTodo;
};

onBeforeUnmount(() => {
  if (unref(isEditingThisTodo)) {
    cancelEditTodo();
  }
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosList/styles/todos-list-item";
</style>
