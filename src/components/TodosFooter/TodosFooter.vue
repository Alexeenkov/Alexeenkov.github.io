<template>
  <footer class="todos-footer">
    {{ stats.active }} more to do, {{ stats.done }} done
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTodosStore } from '@/stores/todosStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'TodosFooter',
  setup() {
    const { stats } = storeToRefs(useTodosStore());

    return {
      stats,
    };
  },
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosFooter/styles/todos-footer";
</style>
