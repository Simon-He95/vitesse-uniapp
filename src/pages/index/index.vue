<template>
	<view v-if="!isLogin" class="w-full h-full flex flex-col items-center">
		<view class="mt-[180rpx] w-[180rpx] h-[180rpx]">
			<image class="rounded-full w-full h-full" src="/static/avatar.jpg" mode=""></image>
		</view>
		<view class="mt-[30rpx]">手机号：{{ phoneNumber }}</view>
		<view class="mt-[30rpx] text-[length:30rpx] text-center">申请获取以下权限</view>
		<view class="w-[80%] mt-[120rpx] h-[110rpx] ">
			<button 
				class="flex justify-center items-center !text-white !text-[length:36rpx] w-full h-full rounded-[50rpx] !bg-[#252525]"
				open-type="getPhoneNumber" @getphonenumber="handlePhoneNumber">获取手机号码</button>
		</view>
	</view>
	
</template>

<script setup lang="ts">
const phoneNumber = ref('1111111')
const isLogin = ref(false)
const handlePhoneNumber = async (e:any) => {
	if (e.detail.code) {
		const res = await getPhoneNumber({
			code: e.detail.code
		})
		console.log('11111111111111111', res)
		if (res && res.code === 0) {
			this.setData({
				phoneNumber: res.data.phone_info.phoneNumber
			})
		}
	}
}
const getUserInfo = () => { }

</script>
<style scoped>.main {
	background: linear-gradient(180deg, #FDAFE1 0%, rgba(253, 175, 225, 0) 78%, rgba(255, 255, 255, 0) 100%);
}
</style>
