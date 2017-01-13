<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'hightlight': totalCount > 0}">
						<i class="icon-shopping_cart" :class="{'hightlight': totalCount > 0}"></i>
					</div>
					<transition name="fade">
						<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
					</transition>
				</div>
				<div class="price" :class="{'hightlight': totalPrice > 0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">{{payDesc}}</div>
			</div>
		</div>
		<div class="ball-container">
			<transition-group name="drop" :css="false"
				@before-enter="beforeEnter" 
				@enter="enter" 
				@after-enter="afterEnter">
				<div v-for="(ball,index) in balls" v-show="ball.show" class="ball" :key="'ball'+index">
					<div class="inner inner-hook"></div>
				</div>
			</transition-group>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		methods: {
			drop(target) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = target;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter(el) {
				let count = this.balls.length;
				while (count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						console.info(`x=${x},y=${y}`);
						el.style.display = 'block';
						console.info(`translate3d(0, ${y}px, 0)`);
						el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
						el.style.transform = `translate3d(0, ${y}px, 0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
						inner.style.transform = `translate3d(${x}px, 0, 0)`;
					}
				}
			},
			enter(el, done) {
				/* eslint-disable no-unused-vars */
			    let rf = el.offsetHeight;
			    this.$nextTick(() => {
			    	el.style.display = 'block';
					el.style.webkitTransform = 'translate3d(0, 0, 0)';
					el.style.transform = 'translate3d(0, 0, 0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0, 0, 0)';
					inner.style.transform = 'translate3d(0, 0, 0)';
			    });
				// done();
			},
			afterEnter(el) {
				let self = this;
				setTimeout(() => {
				    let ball = self.dropBalls.shift();
				    if (ball) {
				    	ball.show = false;
				    	el.style.display = 'none';
				    }
				}, 400);
			}
		},
		data() {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropBalls: []
			};
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
					return `还差￥${this.minPrice - this.totalPrice}元起送`;
				} else {
					return '去结算';
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enpugh';
				} else {
					return 'enough';
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position: fixed
		left: 0
		bottom: 0
		z-index: 50
		width: 100%
		height: 48px
		.content
			display: flex
			background-color: #141d27
			color: rgba(255, 255, 255, 0.4)
			.content-left
				flex: 1
				font-size: 0
				.logo-wrapper
					display: inline-block
					vertical-align: top
					position: relative
					top: -10px
					margin:  0 12px
					padding: 6px
					width: 56px
					height:56px
					box-sizing: border-box
					border-radius: 50%
					background-color: #141d27
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background-color: #2b343c
						text-align: center
						transition: all 0.4s linear
						&.hightlight
							background-color: rgb(0, 160, 220)
						.icon-shopping_cart
							line-height: 44px
							font-size: 24px
							color: #80858a
							&.hightlight
								color: #FFF
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						line-height: 16px
						text-align: center
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #FFF
						background-color: rgb(240, 20, 20)
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
						&.fade-enter, &.fade-leave-active
							opacity: 0
						&.fade-enter-active, &.fade-leave-active
							transition: all 0.4s linear
				.price
					display: inline-block
					vertical-align: top
					margin-top: 12px
					box-sizing: border-box
					padding-right: 12px
					line-height: 24px
					font-size: 16px
					font-weight: 700
					transition: all 0.4s linear
					border-right: 1px solid rgba(255, 255, 255, 0.1)
					&.hightlight
						color: #FFF
				.desc
					display: inline-block
					vertical-align: top
					margin: 12px 0 0 12px
					line-height: 24px
					font-size: 10px
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height: 48px
					line-height: 48px
					text-align: center
					font-size: 12px
					font-weight: 700
					background-color: #2b333b
					transition: all 0.4s linear
					&.not-enough
						background-color: #2b333b
					&.enough
						background-color: #00b43c
						color: #FFF
		.ball-container
			.ball
				position: fixed
				left: 32px
				bottom: 22px
				z-index: 200
				transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
				&.drop-enter-active
					transform: translate3d(0, 0, 0)
				.inner
					width: 16px
					height: 16px
					border-radius: 50%
					background-color: rgb(0, 160, 220)
					transition: all 0.4s linear
</style>