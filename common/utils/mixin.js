/**
 * @Description: 
 * @Author: duanju
 * @Date: 2023-12-02 14:40:57
 * @LastEditor: duanju
 * @LastEditTime: 2023-12-05 09:50:50
 * @Copyright: by duanju
 */

import { setTabBarItem, setTabBarStyle } from "@/common/utils/system.js"

const mixin = {
	data() {
		return {
			shareData: {
				spm: this.$store.state.user.userInfo?.id ? `${this.$store.state.user?.userInfo?.id}.1.0.3.1` : "",
				title: this.$store.state.app.config?.share?.title ? this.$store.state.app.config?.share?.title : "",
				imageUrl: this.$store.state.app.config?.share?.image ? this.$store.state.app.config?.share?.image : "",
				desc: this.$store.state.app.config?.share?.description ? this.$store.state.app.config?.share?.description : ""
			}
		}
	},
	computed: {
		$t() {
			return function(key, pla) {
				const { language } = this.$store.state.app
				const str = language[key] ? language[key] : ""
				return pla ? str.replace("%s", pla) : str
			}
		}
	},
	onLoad() {
		
	},
	onShow() {
		setTabBarItem(this.$store.state.app.theme)
	},
	methods: {
		// 跳转页面
		jumpView(url) {
			uni.navigateTo({ url })
		},
		// 视频详情
		openVideoDetail(id, title, image, desc) {
			// #ifdef H5
			const obj = { title, image, desc }
			// this.jumpView(`/pages/video/play?id=${id}&d=${JSON.stringify(obj)}`)
			this.jumpView(`/pages/video/play?id=${id}`)
			// #endif
			// #ifndef H5
			this.jumpView(`/pages/video/play?id=${id}`)
			// #endif
		},
	}
}

export default mixin