/*这里放置一些基本的配置*/
/*配置ip地址
测试地址*/
var ip_test='http://127.0.0.1/api/search.html';
/*开发环境地址*/
var ip_development="127.0.0.1";
/*生产环境地址*/
var ip_production = "127.0.0.1";
function request(){
	var options={
		url:ip_test,

	}
	//给添加数据请求设置参数
	addData(options);
}


