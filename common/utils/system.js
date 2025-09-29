/**
 * @Description: 
 * @Author: duanju
 * @Date: 2023-12-02 14:42:01
 * @LastEditor: duanju
 * @LastEditTime: 2023-12-02 17:15:30
 * @Copyright: by duanju
 */

/**
 * 切换系统样式
 * @param type - 类型 [0 default (默认) / 1 simple (简约) / 2 overseas (海外) ]
 */
import store from '@/common/store/index.js'

const $t = key => {
	const { language } = store.state.app
	return language[key] ? language[key] : ""
}

const setTabBarStyle = () => {
	const pages = getCurrentPages() // 获取栈实例
	const currentRoute = pages[pages.length - 1]?.route; // 获取当前页面路由
	const darkPages = [
		"pages/home/index",
		"pages/home/video"
	]
	if(currentRoute && darkPages.includes(currentRoute)) {
		uni.setTabBarStyle({
			color: "#677BA5",
			selectedColor: "#EE7F33",
			backgroundColor: "#252734",
			borderStyle: "black",
		})
	}
	const lightPages = [
		"pages/home/user",
		"pages/home/watch"
	]
	if(currentRoute && lightPages.includes(currentRoute)) {
		uni.setTabBarStyle({
			color: '#677BA5',
			selectedColor: '#EE7F33',
			backgroundColor: '#fff',
			borderStyle: 'black',
		})
	}
}

const setTabBarItem = type => {
	const pages = getCurrentPages() // 获取栈实例
	const currentRoute = pages[pages.length - 1]?.route; // 获取当前页面路由
	const tabbarPages = [ 
			"pages/home/index",
			"pages/home/video",
			"pages/home/user",
			"pages/home/watch"
		]
	const isTabbarPage = tabbarPages.includes(currentRoute)
	if(!isTabbarPage) return
	const tabbarList = [
		{	
			"pagePath": "pages/home/index",
			"text": $t('tabbar.home'),
			"iconPath": `static/tabbar/home_${type}_d.png`,
			"selectedIconPath": `static/tabbar/home_${type}_s.png`
		},
		{
			"pagePath": "pages/home/watch",
			"text": $t('tabbar.watch'),
			"iconPath": `static/tabbar/watch_${type}_d.png`,
			"selectedIconPath": `static/tabbar/watch_${type}_s.png`
		},
		{
			"pagePath": "pages/home/video",
			"text": $t('tabbar.recommend'),
			"iconPath": `static/tabbar/recommend_${type}_d.png`,
			"selectedIconPath": `static/tabbar/recommend_${type}_s.png`
		},
		{
			"pagePath": "pages/home/user",
			"text": $t('tabbar.user'),
			"iconPath": `static/tabbar/user_${type}_d.png`,
			"selectedIconPath": `static/tabbar/user_${type}_s.png`
		}
	]

	tabbarList.forEach((item, index) => {
		const { text, iconPath, selectedIconPath } = item
		uni.setTabBarItem({
			index,
			text,
			iconPath,
			selectedIconPath,
		})
	})
	
	if (type == 0) {
		uni.setTabBarStyle({
			color: "#999",
			selectedColor: "#ee7f33",
			backgroundColor: "#ffffff",
			borderStyle: "black",
		})
	} else if(type == 1) {
		uni.setTabBarStyle({
			color: "#999",
			selectedColor: "#5e73c3",
			backgroundColor: "#ffffff",
			borderStyle: "black",
		})
	} else {
		setTabBarStyle()
	}
}

export {
	setTabBarItem,
	setTabBarStyle
}