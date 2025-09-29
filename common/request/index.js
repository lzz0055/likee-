/**
  * @Description: 
  * @Author: duanju
  * @Date: 2023-08-16 09:14:09
  * @LastEditor: duanju
  * @LastEditTime: 2023-12-02 11:34:34
  * @Copyright: by duanju
  */
 

import apiList from './api.js';
import { BASE_URL, SIGN } from '@/env.js';
import store from '@/common/store/index.js'

// 组装接口路径
const getApiPath = path => {
	let apiArray = path.split("."),
		api = apiList
	apiArray.forEach(v => {
		api = api[v]
	});
	return api
}

const $t = key => {
	const { language } = store.state.app
	return language[key] ? language[key] : ""
}

// 发起请求的函数
const request = (path, data, error = true) => {
	if(!BASE_URL) throw ($t('request.domain'))
	const api = getApiPath(path)
	if(!api) throw ($t('request.api'))
	const url = BASE_URL + api.url,
		  method = api.method
	// 通过Promise封装请求, 返回异步请求结果
	return new Promise(async (resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header: {
				'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
				'Token': store.state.user.token || '',
				'Sign': SIGN || '',
				'Lang': store.state.app.lang || ''
			},
			success: res => {
				if(res.statusCode === 200) {
					if(res.data.code != 1 && res.data.code != 1314) {
						error && uni.showToast({
							title: res.data.msg || `error => ${BASE_URL || 'NULL'} => ${SIGN || 'NULL'}`,
							icon: 'none',
							mask: true,
							duration: 3000
						})
					}
				} else if (res.statusCode === 401){
					if(res.data.code === 401) {
						store.dispatch('user/logout')
						error && uni.showModal({
							title: $t('modal.system'),
							content: $t('modal.content.login'),
							cancelText: $t('text.cancel'),
							confirmText: $t('text.confirm'),
							success: res => {
								if(res.confirm) {
									uni.navigateTo({
										url: '/pages/login/login'
									})
								}
							}
						})
					}
				} else {
					error && uni.showToast({
						title: res.statusCode.toString(),
						icon: 'none'
					})
				}
				resolve(res.data)
			},
			fail: err => {
				uni.showToast({
					title: err.errMsg,
					icon: 'none',
					duration: 3000
				})
				reject(err)
			}
		})
	})
}

export default request