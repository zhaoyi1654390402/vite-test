import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routes from "./routes";
const router = createRouter({
    history: createWebHashHistory(),//开启history模式
    routes,
});
export default router;
