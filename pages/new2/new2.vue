<template>
	<view>
		<!-- 头部区域 -->
		<view class='flex align-center p-2'>
			<view class="flex flex-column flex-1 pr-3 pl-3">
				<text class='font-sm text-muted mt-3'>{{time}}</text>
				<text class='h3  text-white' >最新动态</text>
			</view>
			<view class="flex flex-column  pr-3 pl-3" >
				<image src="/static/img/me.jpg" class="size-100 rounded-circle "></image>

			</view>
		</view>
		<!-- 展示区 -->
		<view class="flex align-center justify-center">
			
			
				<image src="../../static/img/imgtop.png" mode="widthFix" class="pr-3 pl-3 ">
					
				</image>
				
		</view>
		<view class="flex align-center justify-center">
			<image src="../../static/img/imgbutton.png" mode="widthFix" class="p-3 ">
				
			</image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginStatus:true,
				time:"2017年8月3日",
			}
		},
		methods: {
			avatar(){
				return '';
			}
		}
	}
</script>

<style>
	page{
		background-color: #0B1026;
	}
</style>
