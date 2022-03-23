//弹窗
const config = require("./config.js")

var message = {
	toast(title,type="text"){
		if(title.length>15){
			console.log('toast长度超过15个字符，当前长度为'+title.length)
			return
		}
	}
}