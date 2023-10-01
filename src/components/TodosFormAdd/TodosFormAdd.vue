<template>
  <section class="todos-form-add">
    <form
      v-if="isFormVisible"
      @submit.prevent="addNewTask"
      class="todos-form-add__form"
    >
      <button
        @click="closeForm"
        type="button"
        class="todos-form-add__close"
      >
        <i class="bi bi-x"></i>
      </button>
      <div class="todos-form-add__input-container">
        <div class="todos-form-add__input todos-form-add__input--focus">
          <input
            v-autofocus
            v-model="todoText"
          />
        </div>
        <VueDatePicker
          v-model="newDate"
          :enableTimePicker="false"
          :minDate="dateToday"
          :format="formatDatepicker"
          :clearable="false"
          class="todos-form-add__datepicker"
        />
      </div>
      <button class="button button--filled">
        Add task
      </button>
    </form>
    <button
      v-else
      @click="showForm"
      class="todos-form-add__show-form"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todosStore';
import { useDateParser } from '@/features/useDateParser';

const { addTodo, cancelEditTodo } = useTodosStore();
const isFormVisible = ref(false);
const todoText = ref('');
const dateToday = new Date();
const newDate = ref(dateToday);
const { formatDatepicker } = useDateParser(newDate);

const showForm = (): void => {
  isFormVisible.value = true;
  cancelEditTodo();
};

const closeForm = (): void => {
  isFormVisible.value = false;
};

const addNewTask = (): void => {
  addTodo({
    id: Date.now(),
    text: todoText.value,
    completed: false,
    date: newDate.value,
  });

  todoText.value = '';
  closeForm();
};
</script>

<style scoped lang="scss">
  @import "@/components/TodosFormAdd/styles/todos-form-add";
</style>
