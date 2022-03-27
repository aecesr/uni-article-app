<template>
	<view>
		<uni-list-item title="账号与安全" class="bg-white mt-1" @tap="open('userSfe')"></uni-list-item>
		<uni-list-item title="资料编辑"  class="bg-white mt-1" @tap="open('userEdit')" ></uni-list-item>
		<uni-list-item title="清除缓存" showBadge=""  class="bg-white mt-1"  @tap="clear">
			<text slot="right" class="text-muted">{{currentSize | format}}</text>
		</uni-list-item>
		<uni-list-item title="意见反馈"  class="bg-white mt-1" @tap="open('user-feedback')" ></uni-list-item>
		<uni-list-item title="关于社区"  class="bg-white mt-1" @tap="open('about')" ></uni-list-item>
		<uni-list-item title="注销账号"  class="bg-white mt-1" @tap="destroy"></uni-list-item>
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
				currentSize: 10010 ,//缓存大小
				user:'',
			}
		},
		
		onShow(){
			this.user=uni.getStorageSync("user")
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
				});
				
			},
			userEdit(){
				uni.navigateTo({
					url: `../userEdit/userEdit`,
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
			// 注销用户
			destroy(){
				uni.showModal({
					content:"是否注销账户?",
					success: (res) => {
						if(res.confirm){
							
							//调用销毁接口
							this.$http.post('/destroy/sms?phone='+this.user.phone)
							
							//清除缓存记录
							uni.clearStorageSync();
							//返回登录页
							uni.navigateBack({
								delta:1
							});
							uni.showToast({
								title:"用户注销成功",
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
