<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span class="block positive" :class="{'active': type === 2}" @click="select(2, $event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active': type === 0}" @click="select(0, $event)">{{desc.positive}}<span class="count">{{positiveCount}}</span></span>
			<span class="block negative" :class="{'active': type === 1}" @click="select(1, $event)">{{desc.negative}}<span class="count">{{negativeCount}}</span></span>
		</div>
		<div class="switch" @click="toggleContent($event)">
			<span class="icon-check_circle" :class="{'on': isOnlyContent}"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		computed: {
			positiveCount() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				}).length;
			},
			negativeCount() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				}).length;
			}
		},
		data() {
			return {
				type: ALL,
				isOnlyContent: true
			};
		},
		created() {
			this.type = this.selectType;
			this.isOnlyContent = this.onlyContent;
		},
		methods: {
			select(type, event) {
				if (!event._constructed) {
					return;
				}
				this.type = type;
				this.$emit('ratingTypeSelect', type);
			},
			toggleContent(event) {
				if (!event._constructed) {
					return;
				}
				this.isOnlyContent = 	!this.isOnlyContent;
				this.$emit('contentToggle', this.isOnlyContent);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"

	.ratingselect
		.rating-type
			padding: 18px 0
			margin: 0 18px
			border-1px(rgba(7, 17, 27, 0.1))
			font-size: 0
			.block
				display: inline-block
				line-height: 16px
				padding: 8px 12px
				border-radius: 1px
				margin-right: 8px
				color: rgb(77, 85, 93)
				font-size: 12px
				&.active
					color: #FFF
				.count
					font-size: 8px
					margin-left: 2px
				&.positive
					background: rgba(0, 160, 220, 0.2)
					&.active
						background: rgb(0, 160, 220)
				&.negative
					background: rgba(77, 85, 93, 0.2)
					&.active
						background: rgb(77, 85, 93)
		.switch
			padding: 12px 18px
			line-height: 24px
			border-bottom: 1px solid rgba(7, 17, 27, 0.1)
			color: rgb(147, 153, 159)
			font-size: 0
			.icon-check_circle
				display: inline-block
				margin-right: 4px
				font-size: 24px
				vertical-align: top
				&.on
					color: #00C850
			.text
				display: inline-block
				font-size: 12px
</style>