<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauceItem in sauceItems"
      :key="sauceItem.id"
      class="radio ingredients__input"
    >
      <input
        v-model="sauceComputed"
        :value="sauceItem.id"
        :checked="sauceComputed === sauceItem.id"
        type="radio"
        name="sauce"
      />
      <span>{{ sauceItem.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  sauceItems: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const sauceComputed = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

// sauces
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
