import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import vitePluginImport from 'vite-plugin-babel-import';
import { resolve } from 'path';
// https://vitejs.dev/config/
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
			rollupOptions: {
				// 配置运行 vite build 时，将会使用一套面向库的 Rollup 预设，并且将为该库提供两种构建格式：es 和 umd (可在 build.lib 中配置)
				// 可以通过 build.rollupOptions 直接调整底层的 Rollup 选项
				//  确保外部化处理那些你不想打包进库的依赖
				external: ['vue'],
				output: {
					// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
					globals: {
						vue: 'Vue',
					},
				},
			},
			// lib: {
			// 	entry: resolve(__dirname, 'lib/main.js'),
			// 	name: 'MyLib',
			// 	fileName: (format) => `my-lib.${format}.js`,
			// },
			// 压缩
			minify: 'esbuild',
			assetsDir: '',
			outDir: `./dist`, // 默认打包输出路径
		},
	};
});
