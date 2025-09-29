/**
  * @Description: 
  * @Author: duanju
  * @Date: 2023-08-16 09:13:24
  * @LastEditor: duanju
  * @LastEditTime: 2023-12-08 17:58:43
  * @Copyright: by duanju
  */
 

const api = {
	// 公用
	common: {
		init: {
			url: '/addons/dramas/index/init',
			method: 'GET',
			desc: '初始信息'
		},
		upload: {
			url: '/addons/dramas/index/upload',
			method: 'POST',
			desc: '上传文件'
		},
		richtext: {
			url: '/addons/dramas/index/richtext',
			method: 'GET',
			desc: '协议内容'
		},
		console: {
			url: 'https://console.nymaite.cn/api/index/user_info',
			method: 'GET',
			desc: '授权信息'
		},
		update: {
			url: '/addons/dramas/index/version',
			method: 'GET',
			desc: 'app版本检测'
		}
	},
	// 语言
	language: {
		list: {
			url: '/addons/dramas/index/lang_list',
			method: 'GET',
			desc: '语言类型'
		},
		data: {
			url: '/addons/dramas/index/lang_data',
			method: 'GET',
			desc: '语言包'
		}
	},
	// 支付
	pay: {
		paypal: {
			url: '/addons/dramas/pay/paypal',
			method: 'POST',
			desc: 'paypal支付'
		}
	},
	// 登录
	login: {
		accountLogin: {
			url: '/addons/dramas/user/accountLogin',
			method: 'POST',
			desc: '账号密码登录'
		},
		codeLogin: {
			url: '/addons/dramas/user/captchaLogin',
			method: 'POST',
			desc: '验证码登录/注册'
		},
		register: {
			url: '/addons/dramas/user/smsRegister',
			method: 'POST',
			desc: '注册'
		},
		forgotPassword: {
			url: '/addons/dramas/user/resetpwd',
			method: 'POST',
			desc: '找回密码'
		},
		sendCode: {
			url: '/addons/dramas/sms/send',
			method: 'POST',
			desc: '发送验证码'
		},
		bindMobile: {
			url: '/addons/dramas/user/changemobile',
			method: 'POST',
			desc: '绑定手机号'
		},
		bindEmail: {
			url: '/addons/dramas/user/changeemail',
			method: 'POST',
			desc: '绑定邮箱'
		},
		areaCode: {
			url: '/addons/dramas/sms/nation_code',
			method: 'GET',
			desc: '手机区号'
		}
	},
	// 用户
	user: {
		info: {
			url: '/addons/dramas/user/index',
			method: 'GET',
			desc: '个人信息'
		},
		vip: {
			url: '/addons/dramas/vip/index',
			method: 'GET',
			desc: '会员规格'
		},
		updateInfo: {
			url: '/addons/dramas/user/profile',
			method: 'POST',
			desc: '修改用户信息'
		},
		delete: {
			url: '/addons/dramas/user/delete',
			method: 'GET',
			desc: '删除用户'
		},
		cdkey: {
			url: '/addons/dramas/cryptocard/decrypt_card',
			method: 'GET',
			desc: '兑换卡密'
		},
		share: {
			url: '/addons/dramas/wechat/jssdk',
			method: 'POST',
			desc: '微信公众号分享'
		}
	},
	// 积分任务
	task: {
		list: {
			url: '/addons/dramas/task/index',
			method: 'GET',
			desc: '获取积分任务'
		},
		finish: {
			url: '/addons/dramas/task/add',
			method: 'POST',
			desc: '完成任务'
		},
		adtask: {
			url: '/addons/dramas/task/uniad',
			method: 'POST',
			desc: '广告任务'
		}
	},
	// 视频
	video: {
		classify: {
			url: '/addons/dramas/category/index',
			method: 'GET',
			desc: '分类'
		},
		list: {
			url: '/addons/dramas/video/index',
			method: 'GET',
			desc: '列表'
		},
		menu: {
			url: '/addons/dramas/video/detail',
			method: 'GET',
			desc: '节目单'
		},
		play: {
			url: '/addons/dramas/video/getEpisodesUrl',
			method: 'POST',
			desc: '获取视频播放链接'
		},
		recommend: {
			url: '/addons/dramas/video/recommend',
			method: 'GET',
			desc: '推荐视频'
		},
		addRecord: {
			url: '/addons/dramas/video/log',
			method: 'POST',
			desc: '添加追剧和保存视频进度'
		},
		deleteRecord: {
			url: '/addons/dramas/video/delLog',
			method: 'POST',
			desc: '取消追剧和删除播放记录'
		},
		getRecord: {
			url: '/addons/dramas/video/logList',
			method: 'GET',
			desc: '获取播放记录'
		},
		likes: {
			url: '/addons/dramas/video/favorite',
			method: 'POST',
			desc: '点赞'
		}
	},
	// 案例
	case: {
		classify: {
			url: '/addons/dramas/archives/cotegory',
			method: 'GET',
			desc: '分类'
		},
		list: {
			url: '/addons/dramas/archives/index',
			method: 'GET',
			desc: '列表'
		},
		detail: {
			url: '/addons/dramas/archives/show',
			method: 'GET',
			desc: '详情'
		}
	},
	// 会员
	member: {
		list: {
			url: '/addons/dramas/vip_order/index',
			method: 'GET',
			desc: '列表'
		},
		detail: {
			url: '/addons/dramas/vip_order/detail',
			method: 'GET',
			desc: '详情'
		},
		create: {
			url: '/addons/dramas/vip_order/recharge',
			method: 'POST',
			desc: '创建订单'
		}
	},
	// 分销商
	dealer: {
		info: {
			url: '/addons/dramas/user/userData',
			method: 'GET',
			desc: '分销商信息'
		},
		level: {
			url: '/addons/dramas/reseller/index',
			method: 'GET',
			desc: '等级'
		},
		record: {
			url: '/addons/dramas/reseller/order_list',
			method: 'GET',
			desc: '订单记录'
		},
		detail: {
			url: '/addons/dramas/reseller/order_detail',
			method: 'GET',
			desc: '订单详情'
		},
		create: {
			url: '/addons/dramas/reseller/recharge',
			method: 'POST',
			desc: '创建订单'
		},
		superior: {
			url: '/addons/dramas/share/add',
			method: 'GET',
			desc: '添加上级'
		}
	},
	// 积分
	integral: {
		list: {
			url: '/addons/dramas/usable/index',
			method: 'get',
			desc: '积分套餐'
		},
		record: {
			url: '/addons/dramas/user_wallet_log/index',
			method: 'GET',
			desc: '积分流水记录'
		},
		create: {
			url: '/addons/dramas/usable/recharge',
			method: 'post',
			dessc: '创建订单'
		}
	},
	// 分享
	share: {
		record: {
			url: '/addons/dramas/share/index',
			method: 'GET',
			desc: '分享记录'
		},
		team: {
			url: '/addons/dramas/reseller/user',
			method: 'GET',
			desc: '团队'
		},
		brokerage: {
			url: '/addons/dramas/reseller/log',
			method: 'GET',
			desc: '佣金'
		}
	},
	// 提现
	withdraw: {
		account: {
			url: '/addons/dramas/user_bank/info',
			method: 'GET',
			desc: '提现账户'
		},
		addAccount: {
			url: '/addons/dramas/user_bank/edit',
			method: 'POST',
			desc: '添加提现账户'
		},
		record: {
			url: '/addons/dramas/user_wallet_apply/index',
			method: 'GET',
			desc: '提现记录'
		},
		apply: {
			url: '/addons/dramas/user_wallet_apply/apply',
			method: 'POST',
			desc: '提现申请'
		},
		rule: {
			url: '/addons/dramas/user_wallet_apply/rule',
			method: 'GET',
			desc: '提现规则'
		},
		exchange: {
			url: '/addons/dramas/user_wallet_apply/exchange',
			method: 'POST',
			desc: '积分货币兑换'
		}
	}
}

export default api;