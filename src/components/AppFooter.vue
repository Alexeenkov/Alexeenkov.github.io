<template>
  <footer class="app-footer">
    {{ stats.active }} more to do, {{ stats.done }} done
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Stats } from '@/types/Stats';

export default defineComponent({
  props: {
    stats: {
      type: Object as PropType<Stats>,
      required: true,
    },
  },
});
</script>
