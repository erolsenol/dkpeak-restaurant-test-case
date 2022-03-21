import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/container/SignIn";
import FullContent from "@/container/FullContent";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import Restaurant from "@/views/restaurant";
import CreateRestaurant from "@/views/restaurant/CreateRestaurant";
import Items from "@/views/item";
import CreateItem from "@/views/item/CreateItem";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/auth/sign-in",
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
      },
      {
        path: "/auth/sign-up",
        component: SignUpForm,
        name: "sign_up",
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
      },
      {
        path: "/restaurant/create",
        component: CreateRestaurant,
        name: "restaurant_create",
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
      },
      {
        path: "/item/create",
        component: CreateItem,
        name: "item_create",
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
