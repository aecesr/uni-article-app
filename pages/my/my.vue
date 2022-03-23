<template>
	<div>
		<view>
			<!-- 未登录 -->
			<template v-if="!loginStatus">
				<view class='flex align-center p-2'>
					<image src="../../static/img/nologin.jpeg" class="size-100 rounded-circle"></image>
					<view class="flex flex-column flex-1 px-3">
					<view>登陆，体验更多功能</view>
					</view>
						<text class='iconfont icon-jinru' @tap="open('login')"></text>
				</view>
				<view class="p-2">
					<image src="../../static/img/banner.jpg" mode="aspectFill" class="w-100 rounded"></image>
				</view>
			</template>

			<!-- 登录 -->
			<template v-else>

				<!-- 头像区域 -->
				<view class='flex align-center p-2'>
					<image :src="user.avatar" class="size-100 rounded-circle"></image>
					<view class="flex flex-column flex-1 px-3">
						<text class='font-md font-weight-bold text-muted'>{{user.nickname}}</text>
						<view class="">
							<text class='mr-1'>总贴数</text>
							<text class='text-warning mr-1'>{{data[0].num}}</text>
							<text class='mx-1'>今日发帖</text>
							<text class='text-warning'>{{data[1].num}}</text>
						</view>
					</view>
					<text class='iconfont icon-jinru' @tap="open('settings')"></text>
				</view>

				<!-- 数据区域 -->

				<view class="flex align-cneter p-2">
					
					<view v-for="( item,index) in data" :key="index"
					class="flex flex-column flex-1 align-center justify-ceter">
						<text class=' mb-1'>{{item.title}}</text>
						<text class="font-sm  text-pick text-muted">{{item.num}}</text>
					</view>
				</view>

				<!-- banner区域 -->
				<view class="p-2">
					<image src="../../static/img/banner.jpg" mode="aspectFill" class="w-100 rounded"></image>
				</view>


				<!-- 列表区域 -->

				<view class="m-2">
					<uni-list-item showExtraIcon title="浏览历史">
						<text slot="icon" class="iconfont icon-liulan text-body font-md"></text>

					</uni-list-item>
				</view>
				<view class="m-2">
					<uni-list-item showExtraIcon title="会员VIP">
						<text slot="icon" class="iconfont icon-huiyuanvip "></text>
					</uni-list-item>
				</view>
				<view class="m-2 ">
					<uni-list-item showExtraIcon title="帖子审核">
						<text slot="icon" class="iconfont icon-keyboard "></text>

					</uni-list-item>
				</view>


			</template>
		</view>
	</div>
</template>

<script>
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				loginStatus: false,
				user:{},
				data:[
					{
						title:"帖子",
						num:99,
					},
					{
						title:"动态",
						num:3,
					},{
						title:"评论",
						num:919,
					},{
						title:"粉丝",
						num:2155,
					}
				]
			}
		},
		onShow(){
			this.user=uni.getStorageSync("user")
			if(Object.keys(this.user).length===0){
				this.loginStatus=false
			}else{
				this.loginStatus=true
			}
			// uni.getStorageInfoSync("user")
			console.log(this.user)
			// console.log(this.loginStatus)
		},
		computed: {
			avatar() {
				return this.user.avatar;
			}
		},
		onNavigationBarButtonTap() {
			uni.showToast({
				title: '点击',
				duration: 2000
			})
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`,
				})
			}
		}
	}
</script>

<style>

</style>
