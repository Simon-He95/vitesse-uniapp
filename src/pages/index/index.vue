<template>
	<view v-if="!isLogin" class="w-full h-full flex flex-col items-center">
		<view class="mt-[180rpx] w-[180rpx] h-[180rpx]">
			<image class="rounded-full w-full h-full" src="/static/avatar.jpg" mode=""></image>
		</view>
		<view class="mt-[30rpx]">手机号：{{ phoneNumber }}</view>
		<view class="mt-[30rpx] text-[length:30rpx] text-center">申请获取以下权限</view>
		<view class="w-[80%] mt-[120rpx] h-[110rpx] ">
			<button @click="login"
				class="flex justify-center items-center !text-white !text-[length:36rpx] w-full h-full rounded-[50rpx] !bg-[#252525]"
				type="default" open-type="getPhoneNumber" @getphonenumber="handlePhoneNumber">获取手机号码</button>
		</view>
	</view>
	<view class="main h-full w-full px-[32rpx] box-border" v-else>
		<uni-search-bar class="mb-[36rpx]" radius="32rpx" bgColor="rgba(255, 255, 255, 0.40)" placeholder="快来搜一搜想要的写真风格吧～"
			clearButton="auto" cancelButton="none" @confirm="search">
			<template v-slot:suffix>
				<svg @click="micOn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
					<path fill="#f086c3"
						d="M80 128V64a48 48 0 0 1 96 0v64a48 48 0 0 1-96 0Zm128 0a8 8 0 0 0-16 0a64 64 0 0 1-128 0a8 8 0 0 0-16 0a80.11 80.11 0 0 0 72 79.6V232a8 8 0 0 0 16 0v-24.4a80.11 80.11 0 0 0 72-79.6Z" />
				</svg>
			</template>
		</uni-search-bar>
		<view>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[40rpx] h-[40rpx]" viewBox="0 0 24 24">
				<path fill="none" stroke="#f086c3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M14 4h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0M4 7a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
			</svg>
			<uni-swipe-action>
				<uni-swipe-action-item>
					<view class="box-content">
						<text class="content-text">禁止左右滚动</text>
					</view>
				</uni-swipe-action-item>
				<uni-swipe-action-item>
					<view class="box-content">
						<text class="content-text">禁止左右滚动</text>
					</view>
				</uni-swipe-action-item>
				<uni-swipe-action-item>
					<view class="box-content">
						<text class="content-text">禁止左右滚动</text>
					</view>
				</uni-swipe-action-item>
				<uni-swipe-action-item>
					<view class="box-content">
						<text class="content-text">禁止左右滚动</text>
					</view>
				</uni-swipe-action-item>
				<uni-swipe-action-item>
					<view class="box-content">
						<text class="content-text">禁止左右滚动</text>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script setup lang="ts">
import { getPhoneNumber } from '@/utils/api';
import { ref } from 'vue'
const phoneNumber = ref('')
const isLogin = ref(false)
const useInfo = ref('')
const login = () => isLogin.value = true
console.log(uni)
const micOn = () => {
	console.log('11111111111111111')
	
	const recorderManager = uni.getRecorderManager()
	recorderManager.
		console.log({ recorderManager })
}
const handlePhoneNumber = async e => {
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
