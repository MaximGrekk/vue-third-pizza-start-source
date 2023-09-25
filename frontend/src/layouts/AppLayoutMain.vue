<template>
  <div class="app-default-layout">
    <app-header-default />
    <slot />
  </div>
</template>

<script setup>
import AppHeaderDefault from "./AppHeaderDefault.vue";
</script>

<style lang="scss" scoped>
.app-default-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
