<template>
	<view class="p-2">
		<view class="mb-2 flex align-stretch">
			<view class="border-bottom flex align-center justify-center font px-2">+86</view>
			<input type="text" v-model="phone" placeholder="手机号" class="border-bottom p-2 flex-1" />
		</view>
		<view class="mb-2 flex align-stretch">
			<input type="text" v-model="code" placeholder="请输入验证码" class="border-bottom p-2 flex-1" />
			<view class="border-bottom rounded-circle flex align-center justify-center font-sm text-white px-2"
				:class="codeTime > 0 ? 'bg-pick-disabled':'bg-pick'" @tap="getCode">
				{{ codeTime > 0 ? codeTime + '秒后可发送' : '获取验证码' }}
			</view>
		</view>
		<view class="p-2">
			<button class=" text-white rounded-circle" 
				:class="disabled ? 'bg-pick-disabled':'bg-pick'" @tap="submit">
				绑定
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				codeTime: 0,
				user: {},
			};
		},
		onShow() {
			this.user = uni.getStorageSync('user')
		},
		computed: {
			disabled() {
				return this.phone === '' || this.code === '';
			}
		},
		methods: {
			check() {
				var rule = /^1[34578]\d{9}$/;
				if (!rule.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			// 获取验证码
			getCode() {
				// 防止重复获取
				if (this.codeTime > 0) {
					return;
				}
				// 验证手机号
				if (!this.check()) return;
				// 请求数据
				this.$http.post('/users/sms?phone=' + this.phone)
					.then(res => {
						// 倒计时
						this.codeTime = 60;
						let timer = setInterval(() => {
							if (this.codeTime >= 1) {
								this.codeTime--;
							} else {
								this.codeTime = 0;
								clearInterval(timer);
							}
						}, 1000);
					});
			},
			submit() {
				if (!this.check()) {
					return;
				}
				this.$http.post('/users/bind', {
						phone: this.phone,
						code: this.code,
						wxOpenId: this.user.wxOpenid
					}, 'json')
					.then(res => {
						this.$msg.toast('绑定成功')
						console.log(res)
						uni.setStorageSync('user', res.data)
						uni.switchTab({
							url: '../my/my'
						})
					});
			}
		}
	};
</script>

<style></style>
