<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selection v-model="pizzaState.dough" :dough-items="doughItems" />
        <size-selection v-model="pizzaState.size" :size-items="sizeItems" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selection
                v-model="pizzaState.sauce"
                :sauce-items="sauceItems"
              />
              <ingredients-selection
                :values="pizzaState.ingredients"
                :ingredient-items="ingredientItems"
                @update="update"
              />
            </div>
          </div>
        </div>

        <PizzaView
          :pizza-state="pizzaState"
          :price="commonPrice"
          @drop="drop"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, computed } from "vue";
import {
  DoughSelection,
  SauceSelection,
  SizeSelection,
  IngredientsSelection,
  PizzaView,
} from "@/modules/constructor";

import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSize);

const getIngredientValuesInitial = (items) => {
  return items.reduce((prevValue, value) => {
    return {
      ...prevValue,
      [value.value]: {
        count: 0,
        price: value.price,
        commonPrice: 0,
      },
    };
  }, {});
};

const drop = (ingredientType) => {
  if (pizzaState.ingredients[ingredientType].count < MAX_INGREDIENT_COUNT) {
    pizzaState.ingredients[ingredientType].count += 1;
    pizzaState.ingredients[ingredientType].commonPrice =
      pizzaState.ingredients[ingredientType].price *
      pizzaState.ingredients[ingredientType].count;
  }
};

const pizzaState = reactive({
  dough: doughItems[0].value,
  size: sizeItems[0].value,
  sauce: sauceItems[0].value,
  ingredients: getIngredientValuesInitial(ingredientItems),
});

const update = (ingredientType, count) => {
  pizzaState.ingredients[ingredientType].count = count;
  pizzaState.ingredients[ingredientType].commonPrice =
    pizzaState.ingredients[ingredientType].price * count;
};

const commonPrice = computed(() => {
  return Object.values(pizzaState.ingredients).reduce((resultValue, value) => {
    return (resultValue += value.commonPrice);
  }, 0);
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
