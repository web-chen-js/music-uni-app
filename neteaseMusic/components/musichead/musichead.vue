<template>
	<view class="music-head" :style="{color : color}">
		<view v-if="icon" class="music-head-icon" :class="{'music-head-iconblack':iconblack}">
			<text class="iconfont iconzuojiantou-copy"
			@tap="handleToBack"></text>
		    |<text class="iconfont iconshouye"@tap="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:['title','icon','color','iconblack'],
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:'../../pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
.music-head{
	width: 100%;
	height: 75px;
	font-size: 16px;
	line-height: 80px;
	text-align: center;
	color: #2C405A;
	position: relative;
}
.music-head-icon{
	position: absolute;
	left: 8px;
	top: 28px;
	width: 90px;
	height: 30px;
	background: rgba(0,0,0,0.4);
	line-height: 30px;
	border-radius: 15px;
	color: white;
	display: flex;
	justify-content: space-evenly;
}
.music-head-iconblack{
	color: black;
	border: 1px #eaeaea solid;
	background: white ;
}
</style>
