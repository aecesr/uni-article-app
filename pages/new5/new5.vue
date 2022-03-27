<template>
	<view class="top">
		<view class="flex flex-column flex-1 pr-3 pl-3">
			<text class='h3  text-white mb-1' >热门阅读</text>
			<text class='font-sm text-muted mb-2'>{{time}}</text>
			
		</view>
		<view class="" v-for="( item,index) in banner" :key="index">
			<view class="banner" >
				<image :src="item.src" mode="widthFix" class="mr-5 ml-5" @tap="details(index)"></image>
			</view>
			<view class="flex flex-column">
				<a class="h3 text-white  text-center align-center mr-5 ml-5"  >{{item.text}}</a>
				<text class="text-muted text-center">{{item.log}}</text>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				loginStatus:true,
				time:"2017年8月3日",
				banner:[
					{
						src:"../../static/img/喝茶的男人.png",
						text:"国庆长假怎么过？推荐绿色生活的5个方案",
						log:"James Author",
					},
					{
						src:"../../static/img/bulewoman.png",
						text:"海边拍摄大片，这个季节的流行趋势分析",
						log:"James Author",
					},
					{
						src:"../../static/img/底部男人.png",
						text:"国庆长假怎么过？推荐绿色生活的5个方案",
						log:"James Author",
					}
					
				]
				
			}
		},
		methods: {
			
			details(path){
				uni.showToast({
					title:"进入详情页",
					duration:1000
				})
				uni.navigateTo({
					url: `../${path}/${path}`,
				})
			}
		}
	}
</script>

<style>
page{
		background-color: #0B1026;
	}
</style>
