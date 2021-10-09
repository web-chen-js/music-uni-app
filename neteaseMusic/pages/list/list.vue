<template>
	<view class="list">
		<view class="fixbg" :style="{'background-image' :'url('+playList.coverImgUrl+')'}">
			
		</view>
		<musichead title='歌单' :icon='true' color='white'></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true" >
				<view class="list-head">
					
					<view class="list-head-img">
						<image :src="playList.coverImgUrl" mode=""></image>
						<text class="iconfont iconyousanjiao"> {{playList.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view class="">{{playList.name}}</view>
						<view class="">
							<image :src="playList.creator.avatarUrl" mode="">{{playList.creator.nickname}}</image>
						</view>
						<view class="">{{playList.description}}</view>
					</view>
					
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="list-share">
					<text class="iconfont iconicon-"></text>分享给微信好友
				</button>
				<!-- #endif -->
				
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont iconbofang1"></text>
						<text>播放全部</text>
						<text>(共 {{playList.trackCount}}首)</text>
					</view>
				</view>
				<view class="list-music-item" v-for="(item,index) in playList.tracks" :key='index'
				@tap="handleToDetail(item.id)">
					<view class="list-music-top">
						{{index+1}}
					</view>
					<view class="list-music-song">
						<view >{{item.name}}</view>
						<view class="">
							<image   src="../../static/dujia.png" mode=""></image>
							<image   src="../../static/sq.png" mode=""></image>
							 {{item.ar[0].name}} - {{item.name}}
						</view>
					</view>
					<text class="iconfont iconbofang"></text>
				</view>
				
				
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	import '@/common/iconfont.css';
	import musichead from '../../components/musichead/musichead.vue'
	import {list} from '../../common/api.js'
	export default {
		data() {
			return {
				playList : {
					playCount: 0 ,
					coverImgUrl : '',
					trackCount : '',
					creator : ''
				},
				privileges : [],
				isShow : false,
				isLoading : true
			}
			
		},
		components:{
			musichead
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中...'
			});
			list(options.listId).then((res)=>{
				//console.log(res)
				if(res[1].data.code == '200'){
					this.playList = res[1].data.playlist;
				    this.privileges = res[1].data.privileges;
					this.$store.commit('INIT_CHANGE',res[1].data.playlist.trackIds)
					this.isLoading = false;
					uni.hideLoading();
				}
				
			})
		},
		methods: {
			handleToDetail(id){
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
	.list-head{display: flex; margin: 30rpx; }
	.list-head-img{width: 264rpx; height: 264rpx; border-radius: 30rpx; overflow: hidden;
	position: relative; margin-right: 42rpx;}
	.list-head-img image{width: 100%; height: 100%;}
	.list-head-img text{position: absolute; right: 8rpx; top: 8rpx; color: white; font-size: 26rpx;}
	.list-head-text {flex: 1; color: #f0f2f7;}
	.list-head-text view:nth-child(1){color: white; font-size: 34rpx;}
	.list-head-text view:nth-child(2){display: flex; margin: 20rpx 0;font-size: 24rpx; align-items: center;}
	.list-head-text view:nth-child(2) image{width: 54rpx; height: 54rpx; border-radius: 50%; margin-right: 14rpx;}
	.list-head-text view:nth-child(3){line-height: 32rpx; font-size: 22rpx;}
	.list-share{width: 330rpx; height: 74rpx; margin: 0 auto; background: rgba(0,0,0,0.4);border-radius: 37rpx; color: white;text-align: center; line-height: 74rpx; font-size: 28rpx;}
	.list-share text {margin-right: 16rpx;}
	
	/* list - miusic  */
	.list-music{background:white0; border-radius: 50rpx; margin-top: 40rpx;}
	.list-music-head{height: 50prx; margin: 30rpx; margin: 30rpx 0 70rpx 22rpx;}
	.list-music-head text:nth-child(1){height: 50rpx; font-size: 50rpx;}
	.list-music-head text:nth-child(2){font-size: 30rpx; margin:0 10rpx 0 26rpx ;}
	.list-music-head text:nth-child(3){font-size: 20rpx; color: #C0C0C0;}
	
	.list-music-item{ display: flex; margin: 0 32rpx 66rpx 46rpx; align-items: center;}
	.list-music-top{ width: 58rpx; font-size: 30rpx; line-height: 30rpx; }
	.list-music-song{flex: 1;}
	.list-music-song view:nth-child(1){ font-size: 28rpx; color: black; width: 70vw; white-space: nowrap; overflow: hidden;
	text-overflow: ellipsis;}
	.list-music-song view:nth-child(2){  font-size: 20rpx; align-items: center;width: 70vw; white-space: nowrap; overflow: hidden;
	text-overflow: ellipsis; }
	.list-music-song view:nth-child(2) image{width: 32rpx; height: 20rpx;margin-right: 20rpx;}
	.item-music-item text {font-size: 50rpx; color:#c7c7c7c7;}
</style>
