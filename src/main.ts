import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import element from '@/utils/component';
import 'element-plus/packages/theme-chalk/src/base.scss'
import '@/styles/index.scss';
import api from '@/utils/api/request';
import "@/utils/lodashFun/index";
const app = createApp(App);

// 挂载全局属性或者方法，类似于 Vue.prototype.$api = api
app.config.globalProperties.$api = api;

app.use(router);
app.use(store);
element(app);
app.mount('#app');
