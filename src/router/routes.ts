import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/vuex",
        name: "Vuex",
        component: () => import("@/views/Vuex.vue"),
    },
];
export default routes;
