<template>
	<div class="p-xxsmall pt-small">
		<div class="flex column align-items-center">
			<img src="./assets/rect.svg" />
			<h3>Create Rectangles</h3>
		</div>
		<NumInput iconText="#" min="1" v-model="rectNum" border />
		<div class="flex mt-xxsmall">
			<Button @click="cancel()" style="width: 30%" secondary>
				Cancel
			</Button>
			<Button class="ml-xxsmall flex-grow" @click="create()">
				Create
			</Button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NumInput, Button } from 'figma-plugin-ds-vue'

export default Vue.extend({
	name: 'App',
	components: {
		NumInput,
		Button
	},
	data() {
		return {
			rectNum: 1
		}
	},
	methods: {
		create(): void {
			const count = this.rectNum
			parent.postMessage(
				{ pluginMessage: { type: 'create', count } },
				'*'
			)
		},
		cancel(): void {
			parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
		}
	}
})
</script>
