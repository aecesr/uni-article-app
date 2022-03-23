<template>
	<view>

		<!-- #ifdef MP-WEIXIN -->
		<uni-status-bar></uni-status-bar>
		<view @tap="back" class="iconfont icon-guanbi flex align-center justify-center font-lg size-100 ">

		</view>
		<!-- #endif -->

		<template v-if="choice">
			<view>
				<view class="text-center" style="padding-top: 240rpx; padding-bottom: 120rpx;">
					<text class="h3 text-body font-weight-bold">账号密码登陆</text>
				</view>
				<view class="flex  md-2  p-2 ">
					<input type="text" v-model="phone" placeholder="账号" class="border-bottom p-2  flex-1 " />
				</view>
				<view class="flex  md-2 p-2 ">
					<input type="password" v-model="password" placeholder="请输入密码" class="border-bottom  p-2 flex-1 " />
					<view class=" h4 text-muted px-2 flex align-center">
						忘记密码？
					</view>
				</view>
				<view class="p-2">
					<button @tap="login()" class="rounded-circle  text-white shadow"
						:class="inValue=='' ? 'bg-pick-disabled':'bg-pick'">登录</button>
				</view>
				<view class="text-center mt-5 text-primary ">
					<text @tap="resetinvaule">验证码登陆</text>
					<text class="p-2"> | </text>
					<text>登陆遇到问题</text>
				</view>
				<view class="text-center text-muted mt-3 ">
					<label class="flex justify-center">
						<checkbox checked="true" />
						<view>
							<text>注册代表同意</text>
							<text class="text-primary">《xxx协议》</text>
						</view>
					</label>
				</view>
			</view>
			<view class="text-center">
				<text class="iconfont icon-QQ h2 m-2 " @tap="callToast"></text>
				<text class="iconfont icon-zhifubao h2 m-2" @tap="callToast"></text>
				<text class="iconfont icon-weixin h2 m-2" @tap="callToast"></text>
			</view>

		</template>



		<!-- 验证码登陆 -->
		<template v-else>

			<view>
				<view class="text-center" style="padding-top: 240rpx; padding-bottom: 120rpx;">
					<text class="h3 text-body font-weight-bold">手机验证登陆</text>
				</view>
				<view class="flex  md-2  p-2 ">
					<view class="border-bottom pt-0 font flex align-center">+86 |
					</view>

					<input type="text" v-model="phone" placeholder="手机号" class="border-bottom p-2  flex-1 " />

				</view>
				<view class="flex  md-2 p-2  ">
					<!-- 验证码输入框 -->
					<input type="text" v-model="verifyCode" placeholder="请输入验证码" class="border-bottom p-2 flex-1" />

					<!-- 验证码 -->
					<button @tap="getCode" :class=" limitTime>0 ? 'bg-pick-disabled':'bg-pick' "
						class="font-md px-3 flex align-center" v-model.number="limitTime"
						v-if="limitTime>0">{{limitTime}}秒后可发送</button>
					<button @tap="getCode" :class=" limitTime>0 ? 'bg-pick-disabled':'bg-pick' "
						class="font-md px-3 flex align-center" v-else>发送验证码</button>

				</view>


				<view class="p-2">
					<button @tap="login()" class="rounded-circle  text-white"
						:class="inValue=='' ? 'bg-pick-disabled':'bg-pick'">登录</button>
				</view>
				<view class="text-center mt-5 text-primary">
					<text @tap="resetinvaule">账号密码登陆</text>
					<text class="p-2"> | </text>
					<text>登陆遇到问题</text>
				</view>
				<view class="text-center text-muted mt-3 ">
					<label class="flex justify-center">
						<checkbox checked="true" />
						<view>
							<text>注册代表同意</text>
							<text class="text-primary">《xxx协议》</text>
						</view>
					</label>
				</view>
			</view>
		</template>

	</view>
</template>

<script>
	import unoStatusBar from '@/components/uni/uni-status-bar/uni-status-bar.vue'
	// import $C from "@/common/config.js"
	export default {
		components: {
			unoStatusBar
		},
		data() {
			return {
				choice: true,
				phone: '15505121008',
				password: '',
				verifyCode: '',
				limitTime: 0,
				inValue: '',

			}
		},

		methods: {
			callToast() {
				uni.showToast({
					title: "点击了",
					duration: 1000
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			open(path) {
				uni.switchTab({
					url: `../${path}/${path}`,
				})
			},
			validate() {
				// 手机号正则
				var mPattern = /^1[34578]\d{9}$/;
				if (!mPattern.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return false;
				}
				// ...更多验证
				return true;
			},
			login() {
				//账号密码登陆
				let data = {
					phone: this.phone,
					password: this.password
				}
				// console.log(this.password)
				const url = 'http://localhost:8081/api/v1/users/login';
				uni.request({
					url: url,
					method: "POST",
					data: data
				}).then((res) => {
					
					if (res[1].data.code === 1) {

						uni.showToast({
							title: "登录成功",
							duration: 1000
						});
						uni.setStorage({
							key: 'user',
							data: res[1].data.data,
							success: function() {
								uni.switchTab({
									url: '../my/my'
								})
							}
						});
					} else {
						uni.showToast({
							title: res[1].data.msg,
							duration: 1000,
						})

					}
				});
			},
			resetinvaule() {
				this.choice = !this.choice;
				this.inValue = this.verifyCode = this.password = this.phone = '';
			},

			getCode() {

				if (this.limitTime > 0) {
					return;
				}
				// 验证手机号-没通过
				if (!this.validate()) {
					return;
				}
				this.limitTime = 3;
				let timer = setInterval(() => {
					if (this.limitTime > 1) {
						this.limitTime--;
					} else {
						this.limitTime = 0;
						clearInterval(timer);
					}
				}, 1000);
			}
		},
		watch: {
			//    侦听器的标准语法格式
			//    侦听相应的属性
			verifyCode: {
				handler(newValue, oldValue) {
					this.inValue = this.verifyCode
				},
			},
			password: {
				handler(newValue, oldValue) {
					this.inValue = this.password
				},

			},

		},


	}
</script>

<style>

</style>
