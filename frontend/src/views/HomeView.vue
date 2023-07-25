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
.content {
  padding-top: 20px;
}

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
.content:deep() {
  // title //
  .title {
    box-sizing: border-box;
    width: 100%;
    margin: 0;

    color: $black;

    &--big {
      @include b-s36-h42;
    }

    &--small {
      @include b-s18-h21;
    }
  }

  // sheet //
  .sheet {
    padding-top: 15px;

    border-radius: 8px;
    background-color: $white;
    box-shadow: $shadow-light;
  }

  .sheet__title {
    padding-right: 18px;
    padding-left: 18px;
  }

  .sheet__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-top: 8px;
    padding-top: 18px;
    padding-right: 18px;
    padding-left: 18px;

    border-top: 1px solid rgba($green-500, 0.1);
  }
  // button //
  .button {
    $bl: &;

    @include b-s18-h21;
    font-family: inherit;
    display: block;

    box-sizing: border-box;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: 0.3s;
    text-align: center;

    color: $white;
    border: none;
    border-radius: 8px;
    outline: none;
    box-shadow: $shadow-medium;

    background-color: $green-500;

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      opacity: 0.5;
    }

    &:disabled {
      background-color: $green-300;
      color: rgba($white, 0.2);
      cursor: default;
    }

    &--border {
      background-color: transparent;
      border: 1px solid $green-500;
      color: $black;
      box-shadow: none;

      &:hover:not(:active):not(:disabled) {
        color: $green-500;
        border-color: $green-500;
        background-color: transparent;
      }

      &:active:not(:disabled) {
        color: $green-600;
        border-color: $green-600;
        background-color: transparent;
      }

      &:disabled {
        opacity: 0.5;
      }
    }

    &--transparent {
      @include b-s14-h16;
      background-color: transparent;
      box-shadow: none;
      color: $black;

      &:hover:not(:active):not(:disabled) {
        color: $red-800;
        background-color: transparent;
      }

      &:active:not(:disabled) {
        color: $red-900;
        background-color: transparent;
      }

      &:disabled {
        opacity: 0.25;
      }
    }

    &--arrow {
      &::before {
        content: "";
        background-image: url("../assets/img/button-arrow.svg");
        background-position: center;
        background-repeat: no-repeat;
        margin-right: 16px;
        width: 18px;
        height: 18px;
        display: inline-block;
        vertical-align: middle;
        transform: translateY(-1px);
      }
    }

    &--white {
      background-color: $white;
      color: $green-500;
    }
  }

  // counter //
  .counter {
    display: flex;

    justify-content: space-between;
    align-items: center;
  }

  .counter__button {
    $el: &;
    $size_icon: 50%;

    position: relative;

    display: block;

    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: 0.3s;

    border: none;
    border-radius: 50%;
    outline: none;

    &--minus {
      background-color: $purple-100;

      &::before {
        @include p_center-all;

        width: $size_icon;
        height: 2px;

        content: "";

        border-radius: 2px;
        background-color: $black;
      }

      &:hover:not(:active):not(:disabled) {
        background-color: $purple-200;
      }

      &:active:not(:disabled) {
        background-color: $purple-300;
      }

      &:focus:not(:disabled) {
        box-shadow: $shadow-regular;
      }

      &:disabled {
        cursor: default;

        &::before {
          opacity: 0.1;
        }
      }
    }

    &--plus {
      background-color: $green-500;

      &::before {
        @include p_center-all;

        width: $size_icon;
        height: 2px;

        content: "";

        border-radius: 2px;
        background-color: $white;
      }

      &::after {
        @include p_center-all;

        width: $size_icon;
        height: 2px;

        content: "";
        transform: translate(-50%, -50%) rotate(90deg);

        border-radius: 2px;
        background-color: $white;
      }

      &:hover:not(:active):not(:disabled) {
        background-color: $green-400;
      }

      &:active:not(:disabled) {
        background-color: $green-600;
      }

      &:focus:not(:disabled) {
        box-shadow: $shadow-regular;
      }

      &:disabled {
        cursor: default;

        opacity: 0.3;
      }
    }

    &--orange {
      background-color: $orange-200;

      &:hover:not(:active):not(:disabled) {
        background-color: $orange-100;
      }

      &:active:not(:disabled) {
        background-color: $orange-300;
      }
    }
  }

  .counter__input {
    @include r-s14-h16;

    box-sizing: border-box;
    width: 22px;
    margin: 0;
    padding: 0 3px;

    text-align: center;

    color: $black;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: transparent;

    &:focus {
      box-shadow: inset $shadow-regular;
    }
  }

  // input //
  .input {
    display: block;

    span {
      @include r-s14-h16;

      display: block;

      margin-bottom: 4px;
    }

    input {
      @include r-s16-h19;

      display: block;

      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 8px 16px;

      transition: 0.3s;

      color: $black;
      border: 1px solid $purple-400;
      border-radius: 8px;
      outline: none;
      background-color: $white;

      font-family: inherit;

      &:focus {
        border-color: $green-500;
      }
    }

    &:hover {
      input {
        border-color: $black;
      }
    }

    &--big-label {
      display: flex;
      align-items: center;

      span {
        @include b-s16-h19;

        margin-right: 16px;

        white-space: nowrap;
      }
    }
  }

  // radio //

  .radio {
    cursor: pointer;

    span {
      @include r-s16-h19;

      position: relative;

      padding-left: 28px;

      &:before {
        @include p_center-v;

        display: block;

        box-sizing: border-box;
        width: 20px;
        height: 20px;

        content: "";
        transition: 0.3s;

        border: 1px solid $purple-400;
        border-radius: 50%;
        background-color: $white;
      }
    }

    &:hover {
      input:not(:checked):not(:disabled) + span {
        &:before {
          border-color: $purple-800;
        }
      }
    }

    input {
      display: none;

      &:checked + span {
        &:before {
          border: 6px solid $green-500;
        }
      }

      &:disabled {
        & + span {
          &:before {
            border-color: $purple-400;
            background-color: $silver-200;
          }
        }

        &:checked + span {
          &:before {
            border: 6px solid $purple-400;
          }
        }
      }
    }
  }
}
</style>
