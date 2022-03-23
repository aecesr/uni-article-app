<template>
	<view>
		<uni-list-item title="账号与安全" class="bg-white mt-1"></uni-list-item>
		<uni-list-item title="资料编辑"  class="bg-white mt-1"></uni-list-item>
		<uni-list-item title="清除缓存" showBadge=""  class="bg-white mt-1"  @tap="clear">
			<text slot="right" class="text-muted">{{currentSize | format}}</text>
		</uni-list-item>
		<uni-list-item title="意见反馈"  class="bg-white mt-1"></uni-list-item>
		<uni-list-item title="关于社区"  class="bg-white mt-1"></uni-list-item>
		<view class="p-2">
			<button class="rounded-circle bg-pick text-white shadow" @tap="loginOut">退出登录</button>
		</view>
	</view>

</template>

<script>
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				currentSize: 10010 //缓存大小
			}
		},
		filters: {
			format(value) {
				return value > 1024 ? (value / 1024).toFixed(2) + "MB" : value.toFixed(2) + "KB"
			}
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`,
				})
			},
			clear(){
				uni.showModal({
					content:"是否清除缓存?",
					success: (res) => {
						if(res.confirm){
							this.currentSize=0;
							uni.showToast({
								title:"清除缓存成功",
								icon:"none"
							})
						}
					}
				})
			},
			loginOut(){
				uni.showModal({
					content:"是否退出登录?",
					success: (res) => {
						if(res.confirm){
							uni.clearStorageSync();
							uni.navigateBack({
								delta:1
							});
							uni.showToast({
								title:"退出登录成功",
								icon:"none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
