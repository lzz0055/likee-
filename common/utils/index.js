/**
  * @Description: 
  * @Author: duanju
  * @Date: 2023-08-16 09:15:35
  * @LastEditor: duanju
  * @LastEditTime: 2023-12-07 18:06:34
  * @Copyright: by duanju
  */

import store from '@/common/store/index.js'

const $t = key => {
	const { language } = store.state.app
	return language[key] ? language[key] : ""
}

/**
 * 数据重新分组 (固定每个分组数组的长度)
 * @param { Array }  data 原数组
 * @param { Number }  chunk 每个分组数组长度
 * @return { Array }  [[chunk], [chunk], ...]
 */
const regroupLength = (data, chunk) => {
	if(!data || !data.length || !chunk) {
		console.log("error => Parameters are missing");
		return
	}
	const len = data.length, result = []
	for (let i = 0; i < len; i += chunk) {
		result.push(data.slice(i, i + chunk))
	}
	return result
}

/**
 * 数组重新分组 (固定分组的数量, 分组数组的长度不固定)
 * @param { Array }  data 原数组
 * @param { Number }  chunk 生成分组的个数
 * @return { Array }  [[...], [...]]
 */
const regroupAmount = (data, chunk) => {
	let result = []
	for (let index = 0; index < data.length; index++) {
		if (result[index % chunk]) {
			result[index % chunk].push(data[index])
		} else {
			result[index % chunk] = [data[index]]
		}
	}
	return result
}

/**
 * 时间戳转换日期时间
 * @param { String }  timestamp 时间戳
 * @return { String }  Y-M-D h:m
 */
const timestampToTime = (timestamp) => {
	let date = new Date(timestamp * 1000), // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
		Y = date.getFullYear() + '-',
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
		D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ',
		h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
		m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		
		// m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
		// s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
	
	return Y + M + D + h + m
}

/**
 * 图片尺寸
 * @param { Boolean }  long 长边 = s / 短边 = s
 * @param { Number }  w 原图片宽度
 * @param { Number }  h 原图片高度
 * @param { Number }  s 短边的尺寸
 * @returns
 */
const sizePicture = (long = false, w, h, s = 450) => {
	const img = {
		w: 0,
		h: 0
	}
	if (!w || !h) {
		Promise.reject("The image size is abnormal => Intercepted")
		return img
	}
	if (long) {
		img.w = w == h ? s : w > h ? s : (s / h) * w
		img.h = w == h ? s : w > h ? (s / w) * h : s
	} else {
		img.w = w == h ? s : w > h ? (s / h) * w : s
		img.h = w == h ? s : w > h ? s : (s / w) * h
	}

	return img
}

/**
 * 判断平台
 */
const platforms = () => {
	// #ifdef H5
	return 'H5'
	// #endif
	
	// #ifdef APP-PLUS
	return 'App'
	// #endif
}

/**
 * 验证密码
 */
const checkPassword = (rule, value, callback) => {
	!value && callback()
	const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])[\w!@#$%^&*()-+=<>?/\[\]{}|~]{6,20}$/
	if (!reg.test(value)) {
		callback($t('text.format.password'))
	} else {
		callback()
	}
}

/**
 * 确认密码
 */
const checkAgainPassword = (rule, value, callback, params) => {
	!value && callback()
	if (params == value) {
		callback()
	} else {
		callback($t('text.format.password2'))
	}
}

/**
 * 返回上一页
 */
const navBack = () => {
	const canNavBack = getCurrentPages()
	if(canNavBack && canNavBack.length > 1) {
		uni.navigateBack()
	} else {
		try {
			history.back()
		} catch(e) {
			uni.switchTab({
				url: '/pages/home/index'
			})
		}
	}
}

/**
 * 秒转时分秒
 */
const formatTime = seconds => {
	const hours = Math.floor(seconds / 3600),
		  minutes = Math.floor((seconds % 3600) / 60),
		  remainingSeconds = seconds % 60,
		  h = (hours < 10 ? "0" + hours : hours) + ":",
		  m = (minutes < 10 ? "0" + minutes : minutes) + ":",
		  s = (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds),
		  time = hours > 0 ? h + m + s : m + s

	return time;
}

/**
 * 获取字符串字符数量，中文+2，英文+1
 */
const countCharacters = str => {
	const pattern = /[^\u4e00-\u9fa5]/;
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		// 检查每个字符是否为英文字符
		if (pattern.test(str.charAt(i))) {
			count++;
		} else {
			count+=2
		}
	}
	return count;
}

/**
 * 获取url参数
*/
const getUrlParams = () => {
	const url = window.location.href;
	const querys = url.substring(url.indexOf('?') + 1).split('&')
	const result = {}
	for (let i = 0; i < querys.length; i++) {
		const temp = querys[i].split('=')
		if (temp.length < 2) {
			result[temp[0]] = ''
		} else {
			result[temp[0]] = temp[1]
		}
	}
	return result
}

/**
 * 当前页面路由
*/
const currentPath = () => {
	const pages = getCurrentPages() // 获取栈实例
	const currentRoute = '/' + pages[pages.length - 1]?.route; // 获取当前页面路由
	return currentRoute
}


export default {
	regroupLength,
	timestampToTime,
	sizePicture,
	regroupAmount,
	platforms,
	checkPassword,
	checkAgainPassword,
	navBack,
	formatTime,
	countCharacters,
	getUrlParams,
	currentPath
}