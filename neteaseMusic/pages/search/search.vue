<template>
	<view class="search">

		<musichead title='搜索' :icon='true' :iconblack='true'></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<input type="text" value="" placeholder="搜索歌曲" v-model="searchWord"
						@confirm="handleToSearch(searchWord)"  @tap="handleToSuggest"/>
					<text  v-show="searchType !=1" class="iconfont iconguanbi" @tap="handleToclose"></text>
				</view>
				<block v-if="searchType == 1">
					
					
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont iconlajitong" @tap="handleToclear()"></text>
						</view>
						<view class="search-history-list">
							<text v-for="(item,index) in searchHistory" :key='index'
							@tap="handleToWord(item)"> 
							{{item}} 
							</text>
						</view>
					</view>
					
					<view class="search-hot">
						<view class="search-hot-head">
							热搜榜
						</view>
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key='index'
							@tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{index + 1}}</view>
							<view class="search-hot-word">
								<view class="">
									{{item.searchWord}}
									<image src="item.conurl" mode=""></image>
								</view>
								<view class="">{{item.centent}}</view>
							</view>
					
							<text class="search-hot-count"> {{item.score}}</text>
						</view>
					
						<!-- <view class="search-hot-item">
							<view class="search-hot-top">2</view>
							<view class="search-hot-word">
								<view class="">
									少年 <image src="../../static/dujia.png" mode=""></image>
								</view>
								<view class="">这里太美丽了</view>
					
							</view>
							<text class="search-hot-count"> 3456693</text>
						</view> -->
					</view>
				</block>
				
				<block v-else-if="searchType == 2"> 
					<view class="search-result">
						<view class="search-result-item" v-for="(item,index) in searchlist" 
						:key='index'  @tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view class="">{{item.name}}</view>
								<view class="">{{item.artists[0].name }} - {item.album.name}</view>
							</view>
							<text class="iconfont iconbofang1"></text>
						</view>
						<!-- <view class="search-result-item">
							<view class="search-result-word">
								<view class="">少年</view>
								<view class="">许巍 - 少年</view>
							</view>
							<text class="iconfont iconbofang1"></text>
						</view> -->
						
					</view>
				</block>
				<block v-else-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-head"> {{searchWord}}</view>
						<view class="search-suggest-item" v-for="(item,index) in searchSuggest"
						:key='index'>
							<text class="iconfont iconsearch"></text> {{item.keyword}}
						</view>
						<!-- <view class="search-suggest-item">
							<text class="iconfont iconsearch"></text> 少年抖音
						</view> -->
					</view>
				</block>
			</scroll-view>

		</view>
	</view>
</template>


<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '@/common/iconfont.css'
	import {
		searchHot,
		searchSuggest,
		searchWord
	} from '../../common/api.js'
	export default {
		data() {
			return {
				searchHot: [],
				searchWord: '',
				searchHistory: [],
				searchType:1,
				searchlist : [],
				searchSuggest : []
			}
		},
		comments: {
			musichead,
		},
		onLoad() {
			searchHot().then((res) => {
				if (res[1].data.code == '200') {
					this.searchHot = res[1].data.data;
				}
			});
			uni.getStorage({
				key:'searchHistory',
				success:(res)=>{
					this.searchHistory = res.data;
				}
			})
		},
		methods: {
			handleToWord(word) {
				this.searchWord = word;
			},
			handleToSearch(word) {
				this.searchHistory.unshift(word);
				this.searchHistory = [...new Set(this.searchHistory)];
				if(this.searchHistory.length>10){
					this.searchHistory.length = 10 ;
				}
				uni.setStorage({
					key:'searchHistory',
					data:this.searchHistory
				});
				this.getSearchList(word);
			},
			handleToclear(){
				uni.removeStorage({
					key:'searchHistory',
					success(res) {
						this.searchHistory = [];
					}
				})
			},
			getSearchList(word){
				searchWord(word).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchlist= res[1].data.result.songs;
						this.searchType = 2;
					}
				})
			},
			handleToclose(){
				this.searchWord = '';
				this.searchType = 1;
			},
			handleToDetail(songId){
			
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			handleToSuggest(ev){
				let value = ev;
				console.log(value)
				if(!value){
					this.searchType = 1;
					return;
				}
				searchSuggest(value).then((res)=>{
					if(res[1].data.code == '200'){
						debugger;
						this.searchSuggest = res[1].data.result.allMatch;
						this.searchType = 3;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.search-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpox 30rpx 50rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
	}

	.search-search text {
		margin: 0 26rpx;
	}

	.search-search input {
		flex: 1;
		font-size: 26rpx;
	}

	.search-history {
		margin: 0 30rpx 50rpx 30rpx;
		font-size: 26rpx;
	}

	.search-history-head {
		display: flex;
		justify-content: space-between;
		margin-bottom: 36rpx;
	}

	.search-history-list {
		display: flex;
		flex-wrap: wrap;
	}

	.search-history-list text {
		padding: 16rpx 28rpx;
		border-radius: 40rpx;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		background: #F7;
	}


	.search-hot {
		margin: 0 30rpx;
		font-size: 26rpx;
	}

	.search-hot-head {
		margin-bottom: 36rpx;
	}

	.search-hot-item {
		display: flex;
		align-items: center;
		margin-bottom: 58rpx;
	}

	.search-hot-top {
		color: #fb2222;
		width: 60rpx;
		margin-left: 8rpx;
	}

	.search-hot-word {
		flex: 1;
	}

	.search-hot-word view:nth-child(1) {
		font-size: 30rpx;
		color: #000000;
	}

	.search-hot-word view:nth-child(2) {
		font-size: 30rpx;
		color: #808080;
	}

	.search-hot-word image {
		width: 48rpx;
		height: 22rpx;
	}

	.search-hot-count {
		color: #808080;
	}
	
	.search-result{ border-top: 2rpx #e4e4e4 solid; padding: 30rpx;}
	.search-result-item{display: flex;justify-content: space-between; align-items: center;
	padding-bottom: 30rpx; margin-bottom: 30rpx; border-bottom:2px #e4e4e4 solid;}
	.search-result-word{ }
	.search-result-word view:nth-child(1){font-size:28rpx ;color: #235790; margin-bottom: 12rpx;}
	.search-result-word view:nth-child(2){font-size: 22rpx; color: #877764;}
	.search-result-item text {font-size: 50rpx;}
	
	
	.search-suggest{ border-top: 2rpx #e4e4e4 solid; padding: 30rpx; font-size: 26rpx; }
	.search-suggest-head{ color: #4574a5; margin-bottom: 74rpx;}
	.search-suggest-item{ color: #5d5d5d5d; margin-bottom: 74rpx;}
	.search-suggest-item text{ color: #bdbdbd; margin-right: 28rpx; position: relative; top: 2rpx;} 
</style>
