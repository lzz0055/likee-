/**
  * @Description: 
  * @Author: duanju
  * @Date: 2023-08-16 09:14:37
  * @LastEditor: duanju
  * @LastEditTime: 2023-12-07 17:44:18
  * @Copyright: by duanju
  */


import request from 'common/request/index.js'
import utils from 'common/utils/index.js'
import { setTabBarItem } from 'common/utils/system.js'

import en from '@/common/locale/en.json'
import zhHans from '@/common/locale/zh-Hans.json'
import zhHant from '@/common/locale/zh-Hant.json'

const languagePackages = {
	en,
	'zh-cn': zhHans,
	'zh-tw': zhHant,
}

import store from '..'
import { BASE_URL, SIGN } from '@/env.js';

export default {
	namespaced: true,
	state: {
		config: "",
		appid: "",
		title: "",
		copyright: [],
		richtext: "",
		options: "",
		share: "",
		jwx: false,
		iosIsPay: false,
		updateInfo: {},
		videoAutoplay: 0,
		playletShare: {
			id: "",
			title: "",
			image: "",
			desc: ""
		},
		adCountdown: 120,
		theme: 2, // 0 default (默认) / 1 simple (简约) / 2 overseas (海外)
		lang: "",
		language: {}, // 语言包
		payment: [], // 支付类型
		currency: "" // 货币
	},
	getters: {
		config: state => state.config,
		appid: state => state.appid,
		title: state => state.title,
		copyright: state => state.copyright,
		richtext: state => state.richtext,
		options: state => state.options,
		share: state => state.share,
		jwx: state => state.jwx,
		iosIsPay: state => state.iosIsPay,
		updateInfo: state => state.updateInfo,
		videoAutoplay: state => state.videoAutoplay,
		adCountdown: state => state.adCountdown,
		theme: state => state.theme,
		lang: state => state.lang,
		language: state => state.language,
		payment: state => state.payment,
		currency: state => state.currency
	},
	mutations: {
		setConfig(state, data) {
			state.config = data
		},
		setAppid(state, data) {
			state.appid = data
		},
		setTitle(state, data) {
			state.title = data
		},
		setCopyright(state, data) {
			state.copyright = data
		},
		setRichtext(state, data) {
			state.richtext = data
		},
		setOptions(state, data) {
			state.options = data
		},
		setShare(state, data) {
			state.share = data
		},
		setJwx(state, data) {
			state.jwx = data
		},
		setIosIsPay(state, data) {
			state.iosIsPay = data
		},
		setUpdateInfo(state, data) {
			state.updateInfo = data
		},
		setVideoAutoplay(state, data) {
			state.videoAutoplay = data
		},
		changeAdCountdown(state) {
			state.adCountdown = uni.getStorageSync("adCountdown")
			let timer = setInterval(() => {
				if(state.adCountdown == 0) {
					state.adCountdown = 120
					clearInterval(timer)
				} else {
					state.adCountdown --
				}
				uni.setStorageSync("adCountdown", state.adCountdown)
			}, 1000)
		},
		setTheme(state, data) {
			state.theme = data
			if(data == 0) {
				getApp().globalData.isColor = '#ee7f33'
				getApp().globalData.isBgColor = '-webkit-linear-gradient(90deg, #F28B45 0%, #FEB787 100%)'
			} else if (data == 1) {
				getApp().globalData.isColor = '#878dff'
				getApp().globalData.isBgColor = '-webkit-linear-gradient(90deg, #7c7cff 0%, #b5d1ff 100%)'
			} else {
				getApp().globalData.isColor = '#ee7f33'
				getApp().globalData.isBgColor = '-webkit-linear-gradient(90deg, #F28B45 0%, #FEB787 100%)'
			}
		},
		setLang(state, data) {
			state.lang = data
			store.dispatch("app/getLanguageInfo")
		},
		setLanguage(state, data) {
			state.language = data
		},
		setPayment(state, data) {
			state.payment = data
		},
		setCurrency(state, data) {
			state.currency = data
		}
	},
	actions: {
		// 获取配置信息
		async getConfigInfo({ commit, dispatch, getters, state }, options) {
			const result = await request("common.init", {
				platform: utils.platforms() || 'H5'
			})
			if(result.code === 1) {
				commit("setConfig", result.data)
				if(utils.platforms() === 'wxOfficialAccount' || utils.platforms() === 'wxMiniProgram') {
					commit("setAppid", result.data.wechat.appid)
				}
				const isIos = uni.getSystemInfoSync().osName == 'ios' ? true : false
				const apay = result.data.apple_pay == 0 ? false : true
				commit("setIosIsPay", !apay && isIos ? false : true)
				commit("setTitle", result.data.system.name)
				commit("setCopyright", result.data.system.copyright)
				commit("setRichtext", result.data.system)
				commit("setPayment", result.data?.payment || [])
				commit("setLang", state.lang ? state.lang : result.data?.system?.lang)
				
				// commit("setLang", state.lang ? state.lang : 'en')

				const text = result.data.system?.h5_theme
				const theme = text == 'default' ? '0' : text == 'simple' ? '1' : text == 'overseas' ? '2' : '0'
				commit("setTheme", 2) // 当前固定为海外版
				
				// #ifdef H5
				document.title = result.data.system.name
				
				if(utils.platforms() === 'wxOfficialAccount') {
					commit("setVideoAutoplay", result.data.system.android_autoplay)
				}
				// #endif
				
				return result.data
			}
			return false
		},
		// 获取语言包信息
		async getLanguageInfo({ commit, dispatch, getters, state }) {
			console.log("language type => ", state.lang, "theme type => ", state.theme);
			store.dispatch("app/updateConfigInfo")
			uni.showLoading({
				// title: "加载中..."
				mask: true
			})
			const result = await request("language.data", {
				lang: state.lang
			})
			if(result.code === 1) {
				commit("setLanguage", result.data)
			}
			// commit("setLanguage", languagePackages[state.lang])
			setTabBarItem(state.theme)
			uni.hideLoading()
		},
		// 更新配置信息
		async updateConfigInfo({ commit, dispatch, getters, state }, options) {
			const result = await request("common.init", {
				platform: utils.platforms() || 'H5'
			})
			if(result.code === 1) {
				commit("setConfig", result.data)
				commit("setTitle", result.data.system.name)
				return result.data
			}
			return false
		}
	}
}