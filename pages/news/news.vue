<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<uni-status-bar></uni-status-bar>
		<view class="banner"
		:style="{'--bgurl':('url('+user.banner+')')}">
		<view class="flex" style="z-index: 20; position: absolute;left: 30rpx;">
			<image :src="user.avatar" class="size-100 rounded-circle" mode=""></image>
			<view class="flex-1 flex justify-center"   >
				<text class="pr-2">{{user.nickname}}</text>
				<text>{{user.address}}</text>
			</view>
			
		</view>
		
		</view>
		<!-- <view class="h-100 bg-pick mt-5" style="z-index: 50; height:200rpx;">
			
		</view> -->
		<!-- #endif -->
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni/uni-status-bar/uni-status-bar.vue'
	export default {
		components:{
			uniStatusBar
		},
		data() {
			return {
				user:{},
				
			}
		},
		onShow(){
			this.user=uni.getStorageSync('user');
			console.log(this.user)
		},
		methods: {
			
		}
	}
</script>

<style scoped>




</style>
