<template>
  <app-sidebar-layout>
    <template #sidebar>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'orders' }"
        :to="{ name: 'orders' }"
      >
        История заказов
      </router-link>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'profile' }"
        :to="{ name: 'profile' }"
      >
        Мои данные
      </router-link>
    </template>

    <!--  Здесь будут располагаться компоненты дочерних маршрутов  -->
    <router-view />
  </app-sidebar-layout>
</template>

<script setup>
import AppSidebarLayout from "@/layouts/AppSidebarLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const routeName = computed(() => route.name);
</script>
