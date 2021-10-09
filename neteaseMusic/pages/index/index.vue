<template>
	<view class="index">
		<musichead title='网易云音乐' :icon='false'></musichead>
		<view class="container">
			<scroll-view scroll-y="true">

				<view class="index-search" @tap="handleToSearch()">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>

				<view class="index-list">

					<view class="index-list-item" v-for="(item,index) in topList" :key="index" @tap="handleToList(item.id)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text> {{item.updateFrequery}}</text>
						</view>
						<view class="index-list-text" >
							<view v-for="(item,index) in item.tracks" :key='index'> {{index+1}}.{{item.first}} - {{item.second}}</view>
						</view>
					</view>
				</view>




			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css';
	import musichead from '../../components/musichead/musichead.vue'
	import {topList} from '../../common/api.js'
	export default {
		data() {
			return {
				title: 'Hello',
				topList:[]
			}
		},
		components: {
			musichead
		},
		onLoad(options) {
			topList().then((res) =>{
				console.log(res)
				this.topList = res;
			});
		},
		methods: {
			handleToList(listId){
				uni.navigateTo({
					url: '/pages/list/list?listId=' + listId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});			
			},
			handleToSearch(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		height: calc(100vh - 70px);
		overflow: hidden;
	}

	.container scroll-view {
		height: 100%;
	}

	.index {}

	.index-search {
		display: flex;
		background-color: #f8f6f8;
		border-radius: 50rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		align-items: center;
		height: 70rpx;
	}

	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}

	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}

	.index-list {
		margin: 0 30rpx;
	}

	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;

	}

	.index-list-img {
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}

	.index-list-img image {
		width: 100%;
		height: 100%;
	}

	.index-list-img text {
		position: absolute;
		font-size: 22rpx;
		color: white;
		bottom: 15rpx;
		left: 15rpx;
	}


	.index-list-text {
		font-size: 24rpx;
		line-height: 66rpx;
		flex: 1;
	}
	.index-list-text view{
	}
</style>
