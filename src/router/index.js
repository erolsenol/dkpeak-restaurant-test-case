import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/container/SignIn";
import SignInForm from "@/components/SignInForm";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: SignIn,
    redirect: "/auth/sign-in",
    children: [
      {
        path: "/auth/sign-in",
        component: SignInForm,
        name: "sign-in",
      },
      {
        path: "/auth/sign-up",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/components/SignUpForm"),
        name: "sign-up",
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
