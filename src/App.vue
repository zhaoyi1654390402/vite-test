<template>
	<el-button type="primary" @click="addCount">{{ count }}</el-button>
	<span class="red-font">{{ object.foo }}</span>
	<hello-world msg="标题" :count="count" @add="add">{{
		plusCopy
	}}</hello-world>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, Ref, computed } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
export default defineComponent({
	name: 'App',
	components: {
		HelloWorld,
	},
	setup: () => {
		// 在 setup 中this找不到组件实例
		// setup 的调用发生在 data property、computed property 或 methods 被解析之前
		// setup函数内不要做耗时长的阻塞操作,耗时长的操作可以在 onMounted 生命周期中进行或者用setTimeout,不要在new Promise里,new Promise是同步执行的
		let count = ref(0);
		let countCopy = ref(0);
		const object = reactive({ foo: 'bar' });

		function addCount() {
			count.value++;
		}
		// computed 传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。
		const plusOne = computed(() => count.value + 1);
		// 或者传入一个拥有 get 和 set 函数的对象，创建一个可手动修改的计算状态。
		const plusCopy = computed({
			get: () => countCopy.value + 1,
			set: (val) => {
				countCopy.value = val - 1;
			},
		});
		function add() {
			plusCopy.value++;
		}
		return { object, count, addCount, plusOne, plusCopy, countCopy };
	},
	methods: {},
});
</script>

<style lang="scss">
.red-font {
	color: $red-color;
}
</style>
