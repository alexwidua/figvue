import Vue from 'vue'
import App from './App.vue'

// Import global figma-plugin-ds-vue stylesheet
import 'figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css'

new Vue({
	render: (h) => h(App)
}).$mount('#app')
