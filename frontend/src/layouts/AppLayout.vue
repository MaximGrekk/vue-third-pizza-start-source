<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "./AppLayoutDefault.vue";

const route = useRoute();
const layout = shallowRef();

watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta) {
        const layoutComponent = await import(`./${meta.layout}.vue`);
        layout.value = layoutComponent?.default || AppLayoutDefault;
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch (error) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        error
      );
      layout.value = AppLayoutDefault;
    }
  }
);
</script>
