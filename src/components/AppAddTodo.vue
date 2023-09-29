<template>
  <section class="add-todo">
    <form
      v-if="isFormVisible"
      @submit.prevent="addNewTask"
      class="add-todo__form"
    >
      <button
        @click="closeForm"
        type="button"
        class="close-button"
      >
        <i class="bi bi-x"></i>
      </button>
      <div class="text-input text-input--focus">
        <input
          v-model="todoText"
          class="input"
        />
      </div>
      <button class="button button--filled">
        Add task
      </button>
    </form>
    <button
      v-else
      @click="showForm"
      class="add-todo__show-form-button"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTodosStore } from '@/stores/todosStore';

export default defineComponent({
  name: 'AppAddTodo',
  setup() {
    const { addTodo } = useTodosStore();
    const isFormVisible = ref(false);
    const todoText = ref('');

    const showForm = (): void => {
      isFormVisible.value = true;
    };

    const closeForm = (): void => {
      isFormVisible.value = false;
    };

    const addNewTask = () => {
      addTodo({
        id: Date.now(),
        text: todoText.value,
        completed: false,
      });

      todoText.value = '';
    };

    return {
      isFormVisible,
      todoText,
      showForm,
      closeForm,
      addTodo,
      addNewTask,
    };
  },
});
</script>
