<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selection v-model="doughId" :dough-items="dataStore.doughs" />
        <size-selection v-model="sizeId" :size-items="dataStore.sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selection
                v-model="sauceId"
                :sauce-items="dataStore.sauces"
              />
              <ingredients-selection
                :values="pizzaStore.ingredientQuantities"
                :ingredient-items="dataStore.ingredients"
                @update="pizzaStore.setIngredientQuantity"
              />
            </div>
          </div>
        </div>
        <PizzaView
          :dough="pizzaStore.dough.value"
          :sauce="pizzaStore.sauce.value"
          :ingredients="pizzaStore.ingredientsExtended"
          @drop="pizzaStore.incrementIngredientQuantity"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed, onMounted } from "vue";
import {
  DoughSelection,
  SauceSelection,
  SizeSelection,
  IngredientsSelection,
  PizzaView,
} from "@/modules/constructor";
//
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();

const doughId = computed({
  get() {
    return pizzaStore.doughId;
  },
  set(value) {
    pizzaStore.setDough(value);
  },
});

const sizeId = computed({
  get() {
    return pizzaStore.sizeId;
  },
  set(value) {
    pizzaStore.setSize(value);
  },
});

const sauceId = computed({
  get() {
    return pizzaStore.sauceId;
  },
  set(value) {
    pizzaStore.setSauce(value);
  },
});

onMounted(() => {
  if (pizzaStore.index === null) {
    pizzaStore.resetPizza();
  }
});
</script>

<style scoped lang="scss">
@import "../assets/scss/ds-system/ds.scss";
@import "../assets/scss/mixins/mixins";

// contnent //

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>

<style lang="scss" scoped>
@import "../assets/scss/ds-system/ds.scss";
@import "../assets/scss/mixins/mixins";
</style>
