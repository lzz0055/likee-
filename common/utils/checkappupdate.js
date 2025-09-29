/**
  * @Description: 
  * @Author: duanju
  * @Date: 2023-08-16 09:15:22
  * @LastEditor: duanju
  * @LastEditTime: 2023-09-02 10:37:09
  * @Copyright: by duanju
  */


import store from '@/common/store/index.js'

const $t = key => {
	const { language } = store.state.app
	return language[key] ? language[key] : ""
}

class IsMaxVserson {
	constructor(versonOld, versonNew) {
		this.versonOld = '';
		this.versonNew = '';
	}
	VsersonFlag(verson) {
		if (this.versonOld != '' && this.versonNew != '') {
			return Number(verson.split('').map(res => {
				return Number(res)
			}).filter(res => {
				return isNaN(res) != true
			}).join(''));
		}
	}
	isVserson(versonOld, versonNew) {
		this.versonOld = versonOld;
		this.versonNew = versonNew;
		if (this.VsersonFlag(versonOld) == this.VsersonFlag(versonNew)) {
			return {
				type: false,
				title: $t('update.version.latest')
			}
		} else {
			return this.VsersonFlag(versonOld) < this.VsersonFlag(versonNew) ? {
				type: true,
				title: $t('update.version.new')
			} : {
				type: false,
				title: $t('update.version.low')
			}
		}
	}
}

function check(param = {}) {
	if (!param.api) return false
	plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
		const platform = plus.os.name.toLocaleLowerCase()
		uni.request({
			url: param['api'],
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'GET',
			dataType: 'json',
			success: res => {
				if(!res?.data?.data?.newversion) return
				const app = new IsMaxVserson().isVserson(widgetInfo.version, res.data.data.newversion)
				if(!app.type) return
				const data = res?.data?.data || null
				if (data && data.downloadurl) {
					store.commit('app/setUpdateInfo', data)
					const timer = setTimeout(() => {
						uni.navigateTo({
							url: '/pages/home/update'
						})
						clearTimeout(timer)
					}, 200)
				}
			},
			fail: err => {
				console.log('fail', err)
			}
		})
	});
}

export default {
	check
}
