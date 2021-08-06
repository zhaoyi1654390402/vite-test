<template>
	<h1>{{ msg }}</h1>
	<p @click="addCount">
		{{ count }}
	</p>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect } from 'vue';
export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	setup: (props, context) => {
		console.log(props.count, context, 'HelloWorld setup');
		function addCount() {
			context.emit('add');
		}
		return { addCount };
	},
	methods: {},
	beforeCreate() {
		console.log('beforeCreate');
	},
});
</script>

<style scoped>
a {
	color: #42b983;
}

label {
	margin: 0 0.5em;
	font-weight: bold;
}

code {
	background-color: #eee;
	padding: 2px 4px;
	border-radius: 4px;
	color: #304455;
}
</style>
