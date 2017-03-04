// See https://babeljs.io/learn-es2015/ about ES6

import './styles/app.scss';

import Vue from '../node_modules/vue/dist/vue.esm.js';

import TestVue from './test.vue';

// Register components
Vue.component('test-vue', TestVue);

// App
var app = new Vue({
	el: '#app',
	data: {
	},
});
