/**
  * @Description: 
  * @Author: duanju
  * @Date: 2023-08-16 09:12:13
  * @LastEditor: duanju
  * @LastEditTime: 2023-12-08 17:40:17
  * @Copyright: by duanju��
  */
 

// #ifdef H5
let BASE_URL = '', SIGN = ''
if (process.env.NODE_ENV === 'development') {
	BASE_URL = 'https://likee.vip/'
	SIGN = ''
} else {
	BASE_URL = window.location.origin
	SIGN = window.location.search.replace(/\?/g, "")
}
// #endif

// #ifdef APP-PLUS
let BASE_URL = 'https://likee.vip/',
	SIGN = ''
// #endif


export {
	BASE_URL,
	SIGN
}