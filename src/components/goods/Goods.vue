<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item, index) in goods" class="menu-item">
					<span class="text border-1px">
						<span v-show="item.type > 0" class="icon" :class="classMap[index]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon"><img :src="food.icon" width="57" height="57"></div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}元</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}元</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll';
	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				classMap: [],
				goods: [],
				listHeight: []
			};
		},
		methods: {
			_initScroll() {
				if (!this.menuScroll) {
					this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
				} else {
					this.menuScroll.reflesh();
				}
				if (!this.foodScroll) {
					this.foodScroll = new BScroll(this.$refs.foodWrapper, {});
				} else {
					this.foodScroll.reflesh();
				}
			},
			_calculateHeight() {
				let foodWrapper = this.$refs.foodWrapper;
				let foodList = foodWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i]; // 进不来
					height += item.clientHeight;
					this.listHeight.push(height);
				}
				console.info(this.listHeight);
			}
		},
		created() {
			this.$http.get('/api/goods').then(
				res => {
				        let response = res.data;
				        if (response.errno === ERR_OK) {
				        	this.goods = response.data;
				        }
				        this.$nextTick(() => {
				        	this._initScroll();
							this._calculateHeight();
						});
			        },
		        err => {
		          console.error(err);
		        }
			);
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			width: 80px
			flex: 0 0 80px
			background-color: #f3f5f7
			.menu-item
				display: table
				padding: 0 12px
				height: 54px
				width: 56px
				line-height: 14px
				.icon
					display: inline-block
					vertical-align: top
					margin-right: 2px
					width: 12px
					height: 12px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-img('decrease_3')
					&.discount
						bg-img('discount_3')
					&.guarantee
						bg-img('guarantee_3')
					&.invoice
						bg-img('invoice_3')
					&.special
						bg-img('special_3')
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					border-1px(rgba(7, 17, 27, 0.1))
					font-size: 12px
		.foods-wrapper
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: rgb(147, 153, 159)
				background-color: #f3f5f7
			.food-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
					img
						border-radius: 2px
				.content
					flex: 1
					.name
						margin: 2px 0 8px 0
						height: 14px
						line-height: 14px
						font-size: 14px
						color: rgb(7, 17, 27)
					.desc,.extra
						line-height: 12px
						font-size: 10px
						color: rgb(147, 153, 159)
					.desc
						margin-bottom: 8px
					.extra
						.count
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
</style>