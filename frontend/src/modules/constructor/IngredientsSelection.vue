<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredientItem in ingredientItems"
        :key="ingredientItem.id"
        class="ingredients__item"
      >
        <AppDrag draggable :data-transfer="ingredientItem">
          <span :class="`filling--${ingredientItem.value}`" class="filling">{{
            ingredientItem.name
          }}</span>
        </AppDrag>
        <AppCounter
          :ingredient-item="ingredientItem"
          :max-value="MAX_INGREDIENT_COUNT"
          :value="getValue(ingredientItem.value)"
          @decrement="decrementValue"
          @increment="incrementValue"
          @input="inputValue"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRef } from "vue";
import { AppDrag, AppCounter } from "@/common/components";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

const props = defineProps({
  values: {
    type: Object,
    default: () => ({}),
  },
  ingredientItems: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update"]);
const values = toRef(props, "values");

const getValue = (ingredient) => {
  return values.value[ingredient].count ?? 0;
};

const setValue = (ingredient, count) => {
  emit("update", ingredient, Number(count));
};

const decrementValue = (ingredient) => {
  setValue(ingredient, getValue(ingredient) - 1);
};

const incrementValue = (ingredient) => {
  setValue(ingredient, getValue(ingredient) + 1);
};

const inputValue = (ingredient, count) => {
  return setValue(
    ingredient,
    count < 0 ? 0 : parseInt(Math.min(MAX_INGREDIENT_COUNT, Number(count)))
  );
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins";
// ingredients //
.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

// .ingredients__counter {
//   width: 54px;
//   margin-top: 10px;
//   margin-left: 36px;
// }

// filling //
.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("../../assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("../../assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("../../assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("../../assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("../../assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("../../assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("../../assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("../../assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("../../assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("../../assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("../../assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("../../assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("../../assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("../../assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("../../assets/img/filling/salmon.svg");
  }
}
</style>
