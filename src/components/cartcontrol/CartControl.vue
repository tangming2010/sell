<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="subCart($event)"></div>
		</transition>
		<transition name="move">
			<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
		</transition>
		<div class="cart-increase icon-add_circle" @click="addCart($event)"></div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				this.$emit('cartAdd', event.target);
			},
			subCart(event) {
				if (!event._constructed) {
					return;
				}
				this.food.count--;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size: 0
		.cart-decrease
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)
			transform: rotate(180deg);
			&.move-enter, &.move-leave-active
				opacity: 0
				transform: translate3D(24px, 0, 0) rotate(0)
			&.move-enter-active, &.move-leave-active
				transition: all 0.4s linear				
		.cart-count
			display: inline-block
			line-height: 24px
			vertical-align: top
			width: 14px
			padding-top: 6px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
			&.move-enter, &.move-leave-active
				opacity: 0
			&.move-enter-active, &.move-leave-active
				transition: opacity 0.4s linear
		.cart-increase
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)
</style>