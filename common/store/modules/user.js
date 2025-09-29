/**
  * @Description: 
  * @Author: duanju
  * @Date: 2023-08-16 09:14:45
  * @LastEditor: duanju
  * @LastEditTime: 2023-12-08 17:59:18
  * @Copyright: by duanju
  */


import request from 'common/request/index.js'
import apis from 'common/request/api.js'
import { BASE_URL, SIGN } from '@/env.js'
import store from '..'

export default {
	namespaced: true,
	state: {
		token: "",
		userInfo: "",
		usable: 0,
		uid: 0,
		showAd: false
	},
	getters: {
		token: state => state.token,
		userInfo: state => state.userInfo,
		usable: state => state.usable,
		uid: state => state.uid,
		showAd: state => state.showAd
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		setUserInfo(state, data) {
			state.userInfo = data
		},
		setUsable(state, data) {
			state.usable = data
		},
		setUid(state, data) {
			state.uid = data
		},
		setShowAd(state, data) {
			state.showAd = data
		}
	},
	actions: {
		// 流量主广告
		async checkAdTask({ commit, dispatch, getters, state }) {
			const result = await request("task.adtask", {}, false)
			if(result.code === 1) {
				if(result?.data?.user_count != result?.data?.limit) {
					commit("setShowAd", true)
				} else {
					commit("setShowAd", false)
				}
				return result.data
			}
			commit("setShowAd", false)
			return false
		},
		// 获取用户信息
		async getUserInfo({ commit, dispatch, getters, state }, token = "") {
			const common = () => {
				token && uni.request({
					url: apis.common.console.url,
					data: { t: encodeURIComponent(`${BASE_URL}+${SIGN}`) },
				})
			}
			
			try {
				const result = await new Promise((resolve, reject) => {
					token && commit("setToken", token)
					request("user.info")
						.then(res => {
							if (res.code === 1) {
								commit("setUserInfo", res.data)
								commit("setUsable", res.data.usable)
								commit("setUid", res.data.user_id)
								resolve(res)
							} else {
								reject(res)
							}
						})
						.catch(err => {
							reject(err)
						})
				})
				token && common()
				return result
			} catch(e) {
				token && common()
			}
		},
		// 清除权限
		async logout({ commit, dispatch, getters, state }) {
			commit("setToken", "")
			commit("setUserInfo", "")
			commit("setShowAd", false)
		}
	}
}
