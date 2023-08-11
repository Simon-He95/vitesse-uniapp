import fetch from './fetch'
// export default {
// 	getPhoneNumber: (data) => {
// 		console.log('来了')
// 		return fetch.postRequest('/ext/wxapplet/wx/getPhoneNumber', data)
// 	},
// }

export const getPhoneNumber = (data) => {
	fetch.postRequest('/ext/wxapplet/wx/getPhoneNumber', data)
}
