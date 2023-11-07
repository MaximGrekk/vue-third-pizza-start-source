<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        v-model="name"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <AppDrop @drop="emit('drop', $event.id)">
      <div class="content__constructor">
        <div :class="`pizza--foundation--${dough}-${sauce}`" class="pizza">
          <div class="pizza__wrapper">
            <transition-group name="scale">
              <div
                v-for="item in ingredients"
                :key="item.id"
                class="pizza__filling"
                :class="[
                  `pizza__filling--${item.value}`,
                  item.quantity === TWO_INGREDIENTS && 'pizza__filling--second',
                  item.quantity === THREE_INGREDIENTS &&
                    'pizza__filling--third',
                ]"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ pizzaStore.price }} ₽</p>
      <button
        type="button"
        class="button"
        :disabled="disableSubmit"
        @click="addToCart"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script setup>
import { AppDrop } from "@/common/components";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { usePizzaStore } from "@/stores/pizza";

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;

const router = useRouter();

const cartStore = useCartStore();
const pizzaStore = usePizzaStore();

const name = computed({
  get() {
    return pizzaStore.name;
  },
  set(value) {
    pizzaStore.setName(value);
  },
});

const disableSubmit = computed(() => {
  return name.value.length === 0 || pizzaStore.price === 0;
});

const addToCart = async () => {
  cartStore.savePizza(pizzaStore.$state);
  await router.push({ name: "cart" });
  pizzaStore.resetPizza();
};

defineProps({
  dough: {
    type: String,
    default: "",
  },
  sauce: {
    type: String,
    default: "",
  },
  ingredients: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["drop"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins";

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button.button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
// pizza //
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url("../../assets/img/foundation/big-creamy.svg");
  }

  &--foundation--large-tomato {
    background-image: url("../../assets/img/foundation/big-tomato.svg");
  }

  &--foundation--light-creamy {
    background-image: url("../../assets/img/foundation/small-creamy.svg");
  }

  &--foundation--light-tomato {
    background-image: url("../../assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  $bl: &;
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: "";

    background-image: inherit;
  }

  &--second {
    &::before {
      display: block;

      transform: rotate(45deg);
    }
  }

  &--third {
    &::before {
      display: block;

      transform: rotate(45deg);
    }

    &::after {
      display: block;

      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/ananas.svg");
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese,
  &--blue.pizza__filling--second::before,
  &--blue.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/cheddar.svg");
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/chile.svg");
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/ham.svg");
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/mushrooms.svg");
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/olives.svg");
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/onion.svg");
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/parmesan.svg");
  }

  &--salami,
  &---salami.pizza__filling--second::before,
  &---salami.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/salami.svg");
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/salmon.svg");
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/tomatoes.svg");
  }
}
</style>
