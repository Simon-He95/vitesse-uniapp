import config from './config';
const tokenKey = 'ai-photo-token'
export default {
	/**
	 * 微信请求get方法
	 * url
	 * data 以对象的格式传入
	 */
	getRequest: async (url, data) => {
		const userinfo = uni.getStorageSync('userinfo');
		const getHeader = {
			'content-type': 'application/json'
		}
		if (userinfo && userinfo.token) {
			getHeader[tokenKey] = userinfo.token
		}
		const getRequest = wxPromisify(uni.request)
		const getData = await getRequest({
			url: config.BASE_API + url,
			method: 'GET',
			data: data,
			header: getHeader,
			timeout: 10000
		}) as any
		if (getData.data.code !== 0) {
			uni.showToast({
				title: getData.data.msg,
				image: '/static/error.png'
			})
		}
		return getData.data
	},
	/**
	 * 微信请求post方法封装
	 * url
	 * data 以对象的格式传入
	 */
	postRequest: async (url, data) => {
		const userinfo = uni.getStorageSync('userinfo');
		// const postHeader = { "content-type": "application/x-www-form-urlencoded" }
		const postHeader = {
			'content-type': 'application/json'
		}
		if (userinfo && userinfo.token) postHeader[tokenKey] = userinfo.token
		const postRequest = wxPromisify(uni.request)
		try {
			const postData = await postRequest({
				url: config.BASE_API + url,
				method: 'POST',
				data: data,
				header: postHeader,
			}) as any
			if (postData.data.code !== 0) {
				uni.showToast({
					title: postData.data.msg,
					image: '/static/error.png'
				})
			}
			return postData.data
		} catch (error) {
			console.log('request error:', error)
			return {
				code: -1,
				msg: 'API服务器未响应'
			}
		}
	},
	/**
	 * 微信formdata上传图片方法封装
	 * url 地址
	 * img 图片
	 * data 以对象的格式传入
	 */
	formdataRequest: (url, img, data) => {
		const formdataHeader = {
			"content-type": "multipart/form-data;application/json; charset=UTF-8"
		}
		const userinfo = uni.getStorageSync('userinfo');
		if (userinfo && userinfo.token) formdataHeader[tokenKey] = userinfo.token
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: config.BASE_API + url, //仅为示例，非真实的接口地址
				filePath: img,
				name: 'file',
				header: formdataHeader,
				formData: data,
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				},
				complete: info => {}
			})
		})
	}

}

function wxPromisify(fn) {
	return function(obj = {} as any) {
		return new Promise((resolve, reject) => {
			obj.success = function(res) {
				//成功
				resolve(res)
			}
			obj.fail = function(res) {
				//失败
				reject(res)
			}
			fn(obj)
		})
	}
}
// //无论promise对象最后状态如何都会执行
// Promise.prototype.finally = function(callback) {
// 	let P = this.constructor;
// 	return this.then(
// 		value => P.resolve(callback()).then(() => value),
// 		reason => P.resolve(callback()).then(() => {
// 			throw reason
// 		})
// 	);
// };
