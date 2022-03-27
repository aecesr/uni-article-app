<template>
	<view>
		<!-- 头部区域 -->
		<view class='flex align-center p-2'>
			<view class="flex flex-column flex-1 pr-3 pl-3">
				<text class='font-sm text-muted mt-3'>{{time}}</text>
				<text class='h3  text-white' >最新动态</text>
			</view>
			<view class="flex flex-column  pr-3 pl-3" >
				<image src="/static/img/head-0.jpg" class="size-100 rounded-circle " @tap="my(my)"></image>

			</view>
		</view>
		<!-- 展示区 -->
		<!-- <view class="flex justify-center " >
				<image :src="banner[0].src" mode="widthFix" class="p-2 .img-re">
				</image>
					<view class="text-white  title-p rounded-circle bg-bule text-ab" style="
					left: 12%;
					top: 14%;">
						<text >{{title[0]}}</text>
					</view>
					<text class="text-white font-sm text-ab" style="
					left: 38%;
					top: 14.5%;">{{banner[0].log}}</text>
					<view class="text-ab font-md h3 p-5" style="
						left: 7%;
						bottom: 31%;">
						<text class="text-white " 
						>{{banner[0].text}}
						</text>
					</view>
		</view>
			<view class="flex justify-center ">
				<image :src="banner[1].src" mode="widthFix" class="p-2 .img-re">
				</image>
				<view class="text-white  title-p rounded-circle bg-pick text-ab" style="
				left: 12%;
				bottom: 25%">
					<text >{{title[1]}}</text>
				</view>
				<text class="text-white font-sm text-ab" style="
				left: 38%;
				bottom: 25.5%;">{{banner[1].log}}</text>
			</view> -->
			
			<view class="flex align-center justify-center" v-for="(item,index) in banner" :key="index">
				<image :src="item.src" mode="widthFix" class="m-2" @tap="details(index)"></image>
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
						src:"../../static/img/new2-1.png",
						text:"告别洛杉矶，来一场说走就走的旅行",
						log:"James Author",
					},
					{
						src:"../../static/img/new2-2.png",
						text:"",
						log:"James Author",
					}
					
				],
				title:['旅行旅游','时尚购物']//
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
				
			},
			my(path){
				uni.showToast({
					title:"进入个人页面",
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
