import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Goods from 'components/goods/Goods';
import Seller from 'components/seller/Seller';
import Ratings from 'components/ratings/Ratings';

Vue.use(VueRouter);
Vue.use(VueResource);
const router = new VueRouter({
	routes: [
		{ path: '/goods', component: Goods },
		{ path: '/ratings', component: Ratings },
		{ path: '/seller', component: Seller }
	],
	linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});

router.push('/goods');
