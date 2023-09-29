<template>
  <footer class="app-footer">
    {{ stats.active }} more to do, {{ stats.done }} done
  </footer>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useTodosStore } from '@/stores/todosStore';

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const { stats } = toRefs(useTodosStore());

    return {
      stats,
    };
  },
});
</script>
