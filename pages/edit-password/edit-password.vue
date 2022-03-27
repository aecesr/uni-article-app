<template>
	<view class="px-2">
		<input class="uni-input p-2 bg-white border-bottom my-2" type="text" placeholder="输入新密码"
			v-model="newpassword" />
		<input class="uni-input p-2 bg-white border-bottom" type="text" placeholder="输入确认密码" v-model="renewpassword" />

		<view class="py-2">
			<button class="text-white rounded-circle" :class="disabled ? 'bg-pick-disabled':'bg-pick'" @tap="submit">
				设置
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newpassword: '',
				renewpassword: '',
				user: {},
			};
		},
		onShow() {

			this.user = uni.getStorageSync('user');

		},
		computed: {
			disabled() {
				if (this.newpassword == '' || this.renewpassword == '') {
					return true
				}
			}
		},
		methods: {
			// 验证密码
			check() {
				if (this.newpassword !== this.renewpassword) {
					this.$msg.toast('两次密码不一致', 'err')
					return false;
				}
				return true;
			},
			submit() {
				if (!this.check()) {
					return;
				}
				let data = {
					phone: this.user.phone,
					password: this.newpassword,
					nickname: this.user.nickname,
					avatar: this.user.avatar,
					gender: this.user.gender,
					birthday: this.user.birthday,
					address: this.user.address,
					banner: this.user.banner
				};
				this.$http.post('/users/update', data, 'json').then(res => {
					console.log(res)
					if (res != null) {
						// this.$msg.toast('修改成功', 'suc',1000)
						uni.showToast({
							title: "修改成功",
							duration: 200,
						});
						console.log(this.user);
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 200)


					}
				});
			}
		}
	};
</script>

<style></style>
