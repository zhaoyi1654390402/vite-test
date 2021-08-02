# Vue 3 + Typescript + Vite

# 升级 node 版本到最新稳定版(Vite 构建工具 Node.js 版本>= 12.0.0)

-   方法一:`nvm install stable`使用 nvm 安装最新稳定版 Node.js
-   方法二:
    -   github 搜索 Kenshin/gnvm,下载 gnvm.exe 放在 nodejs 文件夹(找不到就 cmd 命令行窗口输入`where node`会出现 nodejs 路径)下,`gnvm update latest`,等待更新(下载慢需要多等一会儿)
    -   `gnvm ls`查看当前安装的所有 Node 版本
    -   `gnvm use 版本号`切换到指定版本
    -   `npm -g install npm` 升级 npm

# Vite 初始化项目

-   `npm init @vitejs/app vite-vue3-test` 初始化 vite 项目选择 vue 继续选择 vue-ts
-   使用模板初始化 Vite + Vue3 + TypeScript 项目
    -   npm6+`npm init @vitejs/app vite-vue3-starter --template vue-ts`
    -   npm7+`npm init @vitejs/app vite-vue3-starter -- --template vue-ts`
-   `cd vite-vue3-test`进入项目目录`npm i`安装依赖
-   配置`vite.config.ts`文件,设置@指向 src 目录(tsconfig.json也需加)、服务启动端口、打包路径、代理、全局scss变量等
    ```typescript
        export default defineConfig(({ mode }: UserConfig): UserConfig => {
        return {
            plugins: [
                vue(),
                styleImport({
                    // 注意 styleImport 这个名字不能改
                    libs: [
                        {
                            libraryName: 'element-plus',
                            esModule: true,
                            ensureStyleFile: true,
                            resolveStyle: (name) => {
                                name = name.slice(3);
                                return `element-plus/packages/theme-chalk/src/${name}.scss`;
                            },
                            resolveComponent: (name) => {
                                return `element-plus/lib/${name}`;
                            },
                        },
                    ],
                }),
                vitePluginImport([
                    {
                        libraryName: 'element-plus',
                        libraryDirectory: 'es',
                        style(name) {
                            return `element-plus/lib/theme-chalk/${name}.css`;
                        },
                        ignoreStyles: [],
                    },
                ]),
            ],
            resolve: {
                alias: {
                    '@': resolve(__dirname, 'src'),
                },
            },

            // css预设配置
            css: {
                preprocessorOptions: {
                    scss: {
                        // 注意：全局变量,只能写相对路径,全局scss变量
                        additionalData: "@import'./src/styles/variable.scss';",
                    },
                },
            },

            base: './', // 设置打包路径
            server: {
                port: 8090, // 设置服务启动端口号
                open: true, // 设置服务启动时是否自动打开浏览器
                cors: true, // 允许跨域
                https: false, // 是否开启 https
                // 设置代理，根据项目实际情况配置
                // proxy: {
                //   '/api': {
                //     target: 'http://xxx.xxx.xxx.xxx:8000',
                //     changeOrigin: true,
                //     secure: false,
                //     rewrite: (path) => path.replace('/api/', '/')
                //   }
                // }
            },
            optimizeDeps: {
                include: [
                    'element-plus',
                    'element-plus/lib/locale/lang/zh-cn',
                    'dayjs/locale/zh-cn',
                ],
            },
            build: {
                // 压缩
                minify: 'esbuild',
                assetsDir: '',
                outDir: `./dist`,
            },
        };
    });
    ```
-   安装支持 Vue3 的路由工具`npm i vue-router@4`,创建 src/router/index.ts 文件设置基础路由并在 main.ts 下挂载路由
    ```typescript
    import router from './router/index';
    createApp(App).use(router).mount('#app');
    ```
-   `npm i vuex@next`集成状态管理工具 Vuex,创建 src/store/index.ts 文件并在 main.ts 文件中挂载 Vuex 配置
    ```typescript
    import store from './store/index';
    createApp(App).use(router).use(store).mount('#app');
    ```
-   `npm i element-plus`安装支持 Vue3 的 UI 框架 Element Plus并在 main.ts 文件中挂载 Element Plus
    ```typescript
    import ElementPlus from 'element-plus'
    import 'element-plus/lib/theme-chalk/index.css'
    createApp(App).use(router).use(store).use(ElementPlus).mount('#app');
    //如按需引入npm install vite-plugin-style-import -D 在vite.config.ts中配置并按需引入即可
    import {
        ElAlert,
        ElAside,
        ElAutocomplete,
        ElAvatar,
        ElBacktop,
        ElBadge,
        ElBreadcrumb,
        ElBreadcrumbItem,
        ElButton,
        ElButtonGroup,
        ElCalendar,
        ElCard,
        ElCarousel,
        ElCarouselItem,
        ElCascader,
        ElCascaderPanel,
        ElCheckbox,
        ElCheckboxButton,
        ElCheckboxGroup,
        ElCol,
        ElCollapse,
        ElCollapseItem,
        ElCollapseTransition,
        ElColorPicker,
        ElContainer,
        ElDatePicker,
        ElDialog,
        ElDivider,
        ElDrawer,
        ElDropdown,
        ElDropdownItem,
        ElDropdownMenu,
        ElFooter,
        ElForm,
        ElFormItem,
        ElHeader,
        ElIcon,
        ElImage,
        ElInput,
        ElInputNumber,
        ElLink,
        ElMain,
        ElMenu,
        ElMenuItem,
        ElMenuItemGroup,
        ElOption,
        ElOptionGroup,
        ElPageHeader,
        ElPagination,
        ElPopconfirm,
        ElPopover,
        ElPopper,
        ElProgress,
        ElRadio,
        ElRadioButton,
        ElRadioGroup,
        ElRate,
        ElRow,
        ElScrollbar,
        ElSelect,
        ElSlider,
        ElStep,
        ElSteps,
        ElSubmenu,
        ElSwitch,
        ElTabPane,
        ElTable,
        ElTableColumn,
        ElTabs,
        ElTag,
        ElTimePicker,
        ElTimeSelect,
        ElTimeline,
        ElTimelineItem,
        ElTooltip,
        ElTransfer,
        ElTree,
        ElUpload,
        ElInfiniteScroll,
        ElLoading,
        ElMessage,
        ElMessageBox,
        ElNotification,
    } from 'element-plus';

    const components = [
        ElAlert,
        ElAside,
        ElAutocomplete,
        ElAvatar,
        ElBacktop,
        ElBadge,
        ElBreadcrumb,
        ElBreadcrumbItem,
        ElButton,
        ElButtonGroup,
        ElCalendar,
        ElCard,
        ElCarousel,
        ElCarouselItem,
        ElCascader,
        ElCascaderPanel,
        ElCheckbox,
        ElCheckboxButton,
        ElCheckboxGroup,
        ElCol,
        ElCollapse,
        ElCollapseItem,
        ElCollapseTransition,
        ElColorPicker,
        ElContainer,
        ElDatePicker,
        ElDialog,
        ElDivider,
        ElDrawer,
        ElDropdown,
        ElDropdownItem,
        ElDropdownMenu,
        ElFooter,
        ElForm,
        ElFormItem,
        ElHeader,
        ElIcon,
        ElImage,
        ElInput,
        ElInputNumber,
        ElLink,
        ElMain,
        ElMenu,
        ElMenuItem,
        ElMenuItemGroup,
        ElOption,
        ElOptionGroup,
        ElPageHeader,
        ElPagination,
        ElPopconfirm,
        ElPopover,
        ElPopper,
        ElProgress,
        ElRadio,
        ElRadioButton,
        ElRadioGroup,
        ElRate,
        ElRow,
        ElScrollbar,
        ElSelect,
        ElSlider,
        ElStep,
        ElSteps,
        ElSubmenu,
        ElSwitch,
        ElTabPane,
        ElTable,
        ElTableColumn,
        ElTabs,
        ElTag,
        ElTimePicker,
        ElTimeSelect,
        ElTimeline,
        ElTimelineItem,
        ElTooltip,
        ElTransfer,
        ElTree,
        ElUpload,
    ];

    const plugins = [
        ElInfiniteScroll,
        ElLoading,
        ElMessage,
        ElMessageBox,
        ElNotification,
    ];
    const app = createApp(App);

    components.forEach((component) => {
        app.component(component.name, component);
    });

    plugins.forEach((plugin) => {
        app.use(plugin);
    });
    app.mount('#app');
    ```
-   `npm i axios`集成 HTTP 工具 Axios,在 src 下创建 utils 目录来存储我们常用的工具函数,在utils下新建api/axios.ts文件,配置Axiosi前置/后置拦截器,在Axios.vue中尝试使用