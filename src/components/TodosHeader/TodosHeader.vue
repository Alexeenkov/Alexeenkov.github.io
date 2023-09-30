<template>
  <header class="todos-header">
    <RouterLink to="/">
      <span class="todos-header__logo">
        TODOS
      </span>
    </RouterLink>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodosHeader',
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosHeader/styles/todos-header";
</style>
