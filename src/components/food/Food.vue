<template>
	<transition name="move">
		<div class="food" v-show="showFlag"  ref="food">
			<div class="food-content" ref="foodContent">
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
				<div class="rating-wrapper">
					<transition-group name="fade" tag="ul" v-show="food.ratings && food.ratings.length">
						<li v-for="(rating,index) in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)" :key="index">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" width="12" height="12" :src="rating.avatar" />
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="text">
								<span class="icon" :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
							</p>
						</li>
					</transition-group>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">
						暂无评价
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import {formateDate} from 'common/js/Date';
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
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formateDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
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
			_scrollToBottom() {
				this.$nextTick(() => {
					this.scroll.refresh();
					let scrollHeight = this.$refs.food.offsetHeight - this.$refs.foodContent.offsetHeight;
					this.scroll.scrollTo(0, scrollHeight, 200);
				});
			},
			ratingTypeSelect(type) {
				this.selectType = type;
				this._scrollToBottom();
			},
			contentToggle(toggle) {
				this.onlyContent = toggle;
				this._scrollToBottom();
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		components: {
			'cart-control': CartControl,
			'split': Split,
			'rating-select': RatingSelect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/mixin"
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
		.rating-wrapper
			padding: 0 18px
			.fade-enter
				opacity: 0
				transform: translateY(30px);
			.fade-enter-active, .fade-leave-active
				transition: all 0.2s linear
			.fade-leave-active
				opacity: 0
				transform: translateX(-30px)
			.no-rating
				padding: 16px 0
				font-size: 12px
				color: rgb(147, 153, 159)
			.rating-item
				position: relative
				padding: 16px 0
				border-1px(rgba(7, 17, 27, 0.1))
				.user
					position: absolute
					right: 0
					top: 16px
					line-height: 12px
					font-size: 0
					.name
						display: inline-block
						vertical-align: top
						margin-right: 6px
						font-size: 10px
						color: rgb(147, 153, 159)
					.avatar
						display: inline-block
						border-radius: 50%
				.time
					margin-bottom: 6px
					line-height: 12px
					font-size: 10px
					color: rgb(147, 153, 159)
				.text
					line-height: 16px
					font-size: 12px
					color: rgb(7, 17, 27)
					.icon
						display: inline-block
						margin-right: 4px
						line-height: 12px
						font-size: 12px
						&.icon-thumb_up
							color: rgb(0, 160, 220)
						&.icon-thumb_down
							color: rgb(147, 153, 159)
</style>