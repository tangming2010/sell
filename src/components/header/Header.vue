<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar"  width="64" height="64" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports"  @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper"  @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}<i class="icon-keyboard_arrow_right"></i></span>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<div class="name">{{seller.name}}</div>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item, index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">{{seller.bulletin}}</div>					
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="closeDetail"></i>
				</div>
			</div>
		</transition>

	</div>
</template>

<script type="text/javascript">
	import Star from 'components/star/Star';

	export default{
		data() {
			return {
				classMap: [],
				detailShow: false
			};
		},
		methods: {
			showDetail: function() {
				this.detailShow = true;
			},
			closeDetail: function() {
				this.detailShow = false;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		},
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			Star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/mixin"
	.header
		position:relative
		color: #FFF
		background: rgba(7 , 17, 27, .4)
		overflow: hidden
		.content-wrapper
			position:relative
			padding: 24px 12px 18px 24px
			font-size: 0
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block
				margin-left: 16px
				.title
					font-size: 0
					margin: 2px 0 8px 0
					.brand
						display: inline-block
						vertical-align: top
						width: 30px
						height: 18px
						bg-img('brand')
						background-size: 30px 18px
						background-repeat: no-repeat
					.name
						display: inline-block
						vertical-align: top
						margin-left: 6px
						line-height: 18px
						font-size: 16px
						font-weight: bold
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size: 12px
				.supports
					.icon
						display: inline-block
						vertical-align: top
						margin-right: 4px
						width: 12px
						height: 12px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-img('decrease_1')
						&.discount
							bg-img('discount_1')
						&.guarantee
							bg-img('guarantee_1')
						&.invoice
							bg-img('invoice_1')
						&.special
							bg-img('special_1')
					.text
						line-height: 12px
						font-size: 10px
			.support-count
				position: absolute
				right: 12px
				bottom: 14px
				padding: 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background: rgba(0, 0, 0, 0.2)
				text-align: center
				.count
					vertical-align: top
					font-size: 10px
				.icon-keyboard_arrow_right
					margin-left: 2px
					font-size: 10px
					line-height: 24px
		.bulletin-wrapper
			position:relative
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			background: rgba(7, 17, 27,0.2)
			.bulletin-title
				display: inline-block		
				vertical-align: top	
				margin-top: 8px	
				width: 22px
				height: 12px
				bg-img('bulletin')
				background-size: 22px 12px
				background-repeat: no-repeat
			.bulletin-text
				vertical-align: top
				margin: 0 4px
				font-size: 10px
			.icon-keyboard_arrow_right
				position: absolute
				font-size: 10px
				right: 12px
				top: 8px
		.background
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(10px)
		.detail
			position: fixed
			left: 0
			top: 0
			z-index: 100
			width: 100%
			height: 100%
			overflow: auto
			background: rgba(7, 17, 27, .8)
			&.fade-enter-active,&.fade-leave-active
				transition: opacity  0.5s
			&.fade-enter, &.fade-leave-active
				opacity: 0
			.detail-wrapper
				min-height: 100%
				width: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						text-align: center
						font-size: 16px
						font-weight: 700
					.star-wrapper
						margin-top: 18px
						padding: 2px 0
						text-align: center
					.title
						display: flex
						width: 80%
						margin: 28px auto 24px auto
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom: 1px solid rgba(255, 255, 255, 0.2)
						.text
							padding: 0 12px
							font-size: 14px
							font-weight: 700
					.supports
						width: 80%
						margin: 0 auto
						.support-item
							padding: 0 12px
							margin-bottom: 12px
							font-size: 0
							&:last-child
								margin-bottom: 0
							.icon
								display: inline-block
								width: 16px
								height: 16px
								vertical-align: top
								margin-right: 6px
								background-size: 16px 16px
								background-repeat: no-repeat
								&.decrease
									bg-img('decrease_2')
								&.discount
									bg-img('discount_2')
								&.guarantee
									bg-img('guarantee_2')
								&.invoice
									bg-img('invoice_2')
								&.special
									bg-img('special_2')
							.text
								line-height: 12px
								font-size: 12px
					.bulletin
						box-sizing: border-box
						width: 80%
						padding: 0 12px
						margin: 0 auto
						line-height: 24px
						font-size: 12px
						font-weight: 200
			.detail-close
				position: relative
				width: 32px
				height: 32px
				margin: -64px auto 0 auto
				clear: both
				font-size: 32px
</style>