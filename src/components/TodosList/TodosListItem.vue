<template>
  <li
    class="todos-list-item"
    :class="todoItemClasses"
  >
    <button
      @click.stop="toggleThisTask"
      type="button"
      class="todos-list-item__button"
    >
      <div class="todos-list-item__status">
        <i class="bi bi-check2"></i>
      </div>
      <div class="todos-list-item__text">
        {{ todo.text }}
        <textarea
          v-if="isEditingThisTodo"
          v-autofocus
          v-model="newText"
          class="todos-list-item__textarea"
        />
      </div>
      <div class="todos-list-item__date">
        <template v-if="!isEditingThisTodo">
          {{ day }}.{{ month }}.{{ year }}
        </template>
        <VueDatePicker
          v-else
          v-model="changedDate"
          :enableTimePicker="false"
          :clearable="false"
          :minDate="new Date()"
          :format="formatDatepicker"
          class="todos-list-item__datepicker"
        />
      </div>
      <div class="todos-list-item__buttons">
        <button
          v-if="!isEditingThisTodo"
          @click.stop="editTodo(todo.id)"
          type="button"
          class="todos-list-item__edit"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <button
          v-if="!isEditingThisTodo"
          @click.stop="removeTodo(todo.id)"
          type="button"
          class="todos-list-item__remove"
        >
          <i class="bi bi-trash3"></i>
        </button>
        <button
          v-if="isEditingThisTodo"
          @click.stop="saveEditTask"
          type="button"
          class="todos-list-item__save"
        >
          <i class="bi bi-floppy"></i>
        </button>
        <button
          v-if="isEditingThisTodo"
          @click.stop="cancelEditTask"
          type="button"
          class="todos-list-item__cancel"
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
const changedDate: Ref<Date> = ref(dateTodo);

const {
  day,
  month,
  year,
  formatDatepicker,
} = useDateParser(changedDate);

const isEditingThisTodo = computed(() => unref(editableTodo).isEditing && unref(editableTodo).id === unref(todo).id);

const todoItemClasses = computed(() => ({
  'todos-list-item--done': unref(todo).completed && !unref(isEditingThisTodo),
  'todos-list-item--disabled': unref(editableTodo).isEditing && unref(editableTodo).id !== unref(todo).id,
  'todos-list-item--editing': unref(isEditingThisTodo),
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
    unref(changedDate),
  );

  dateTodo = unref(changedDate);
};

const cancelEditTask = () => {
  cancelEditTodo();
  newText.value = unref(todo).text;
  changedDate.value = dateTodo;
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
