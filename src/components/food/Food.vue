<template>
	<transition name="move">
		<div class="food" v-show="showFlag"  ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" />
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}元</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}元</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cart-control :food="food"></cart-control>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count || food.count == 0" @click.stop="addFirst($event)">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split v-show="food.ratings"></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<rating-select :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @ratingTypeSelect="ratingTypeSelect" @contentToggle="contentToggle"></rating-select>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll';
	import CartControl from 'components/cartcontrol/CartControl';
	import Split from 'components/split/Split';
	import RatingSelect from 'components/ratingselect/RatingSelect';

	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				if (!event._constructed) {
					return;
				}
				this.$emit('cartAdd', event.target);
				this.$set(this.food, 'count', 1);
			},
			ratingTypeSelect(type) {
				// this.selectType = type;
				console.info(type);
			},
			contentToggle(toggle) {
				// this.onlyContent = toggle;
				console.info(toggle);
			}
		},
		components: {
			'cart-control': CartControl,
			'split': Split,
			'rating-select': RatingSelect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food
		position: fixed
		left: 0
		top: 0
		bottom: 48px
		z-index: 30
		width: 100%
		background: #FFF
		&.move-enter, &.move-leave-active
			transform: translate3d(100%, 0, 0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.2s linear
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				left: 0
				top: 10px
				.icon-arrow_lift
					display: block
					padding: 10px
					font-size: 20px
					color: #FFF
		.content
			position: relative
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 8px
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)
			.detail
				height: 10px
				margin-bottom: 18px
				line-height: 10px
				font-size: 0
				.sell-count, .rating
					font-size: 10px
					color: rgb(147, 153, 159)
				.sell-count
					margin-right: 12px
			.price
				font-weight: 700
				line-height: 24px
				.now
					margin-right: 8px
					font-size: 14px
					color: rgb(240, 20, 20)
				.old
					text-decoration: line-through
					font-size: 10px
					color: rgb(147, 153, 159)
			.cartcontrol-wrapper
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				position: absolute
				right: 18px
				bottom: 18px
				z-index: 10
				line-height: 24px
				height: 24px
				padding: 0 12px
				box-sizing: border-box
				font-size: 10px
				border-radius: 12px
				color: #FFF
				background: rgb(0, 160, 220)
				&.fade-enter-active, &.fade-leave-active
					opacity: 0
					transition: all 0.2s linear
		.info
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 6px
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)
			.text
				line-height: 24px
				padding: 0 8px
				font-size: 12px
				color: rgb(77, 85, 93)
		.rating
			padding-top: 18px
			.title
				line-height: 14px
				margin-left: 18px
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)

</style>