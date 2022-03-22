import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "@/store";

import SignIn from "@/container/SignIn";
import FullContent from "@/container/FullContent";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import Restaurant from "@/views/restaurant";
import CreateRestaurant from "@/views/restaurant/CreateRestaurant";
import Items from "@/views/item";
import CreateItem from "@/views/item/CreateItem";
import Orders from "@/views/order";
import CreateOrders from "@/views/order/CreateOrder";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/auth/sign-in",
    name: "index",
  },
  {
    path: "/auth",
    name: "auth",
    component: SignIn,
    redirect: "/auth/sign-in",
    children: [
      {
        path: "/auth/sign-in",
        component: SignInForm,
        name: "sign_in",
        meta: {
          public: true,
        },
      },
      {
        path: "/auth/sign-up",
        component: SignUpForm,
        name: "sign_up",
        meta: {
          public: true,
        },
      },
    ],
  },
  {
    path: "/restaurant",
    name: "restaurant",
    component: FullContent,
    redirect: "/restaurant/list",
    children: [
      {
        path: "/restaurant/list",
        component: Restaurant,
        name: "restaurant_list",
        meta: {
          public: false,
        },
      },
      {
        path: "/restaurant/create",
        component: CreateRestaurant,
        name: "restaurant_create",
        meta: {
          public: false,
        },
      },
    ],
  },
  {
    path: "/items",
    name: "items",
    component: FullContent,
    children: [
      {
        path: "/items/list",
        component: Items,
        name: "items_list",
        meta: {
          public: false,
        },
      },
      {
        path: "/item/create",
        component: CreateItem,
        name: "item_create",
        meta: {
          public: false,
        },
      },
    ],
  },
  {
    path: "/order",
    name: "order",
    component: FullContent,
    children: [
      {
        path: "/order/list",
        component: Orders,
        name: "order_list",
        meta: {
          public: false,
        },
      },
      {
        path: "/order/create",
        component: CreateOrders,
        name: "order_create",
        meta: {
          public: false,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
console.log(store.getters.isLogin);
router.beforeEach((to, from, next) => {
  if (!store.getters.isLogin && !to.meta.public) {
    return next({ name: "sign_in" });
  }
  return next();
});

export default router;
