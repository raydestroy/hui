/*-- nrrrrtv
====================================================== --*/

var nrrrrtv = nrrrrtv || {};

/*--Log 页面调试输出
====================================================== */
nrrrrtv.log = function() {


};
nrrrrtv.log.debug = true;
nrrrrtv.log.debug = false;
//var bbb;
//var ccc = "";

var ddd = new Array();

//nrrrrtv.log.debug = false;
function huoquindex4(str) {
	//	window.document.body.innerHTML += html;
	//ccc=$("#console").innerHTML;
	//var bbeeb='<p>: ' + str + '</p>';
	ddd.push('<p>: ' + str + '</p>');
	//console.log("1啊所"+ddd.length)
	if (ddd.length >= 10) {
		ddd.shift(); //	ddd[0]='';
	}
	//console.log("2啊所"+ddd)
	var eee = "";
	for (var i = 0; i < ddd.length; i++) {
		eee += ddd[i];
	} //console.log("3啊所"+eee)
	//bbb = eee + '<p>: ' + str + '</p>';
	$3("#console").innerHTML = eee;

	//	ccc = $("#console").innerHTML;
}

nrrrrtv.log.console = function(str) {
	if (nrrrrtv.log.debug) //&& this.filter(str)
	{

		// var html = '<div style="display: block; background-color: #336699;'
		// 		 + ' opacity: 0.7; position: absolute; top: 20px; left: 20px;'
		// 		 + ' text-align: left; font-size: 18px; color:#fff;"'
		// 		 + ' id="console"><!-- #$#: --></div>';

		if (window.document.body) {
			if ($3("#console") == null) {
				console.log("啊所")
				//	window.setTimeout(huoquindex4(html), 5000);
				//	window.document.body.innerHTML += html;
				// if ($("#asdz") != null) {
				// 	var html = '<div class="console" id="console" ><p>: ' + str + '</p></div>';
				// 	$("#asdz").innerHTML += html;

				// }

			} else {
				//window.setTimeout(huoquindex4(str), 15000);
				huoquindex4(str)

			}
			console.log("控制台:" + str)
		}


	} else {
		console.log("控制台:" + str)
	}
};
nrrrrtv.log.filter = function(str) {
	var print = true;

	if (str.indexOf("$PAGE") > -1)
		print = false;
	else if (str.indexOf("nrrrrtv.key") > -1)
		print = false;
	else if (str.indexOf("nrrrrtv.navigation") > -1)
		print = false;
	else if (str.indexOf("nrrrrtv.page") > -1)
		print = false;
	else if (str.indexOf("nrrrrtv.stb") > -1)
		print = false;
	else if (str.indexOf("nrrrrtv.effect") > -1)
		print = false;

	return print;
};

/*--Profile
====================================================== */
nrrrrtv.profile = function() {};

nrrrrtv.profile.platform = "PC or STB";
nrrrrtv.profile.browser = "NGB-H or iPanel or SHDV"; // 国标NGB-H or iPanel or SHDV

nrrrrtv.profile.info = function() {






	// h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	// 		}	this.attr.height = this.attr.content.scrollHeight; // 内容元素的实际高度
	// 	this.attr.view_height = this.attr.content.clientHeight;

	nrrrrtv.log.console("platform: " + navigator.platform +
		", appName: " + navigator.appName +
		", appVersion: " + navigator.appVersion);
	nrrrrtv.log.console("当前网页运行平台为(PC or STB): " +
		this.platform);
	nrrrrtv.log.console("当前网页运行浏览器为(NGB-H or iPanel or SHDV): " +
		this.browser);
	nrrrrtv.log.console("内容clientWidth: " +
		document.body.clientWidth + "clientHeight: " +
		document.body.clientHeight + ";显示innerWidth: " +
		window.innerWidth + "innerHeight: " +
		window.innerHeight);
	nrrrrtv.log.console("本机IP: " + window.location.host);
	nrrrrtv.log.console("本机IP: " + window.location.href);
	nrrrrtv.log.console("本机IP: " + window.location.protocol);
	nrrrrtv.log.console("本机IP: " + window.location.port);
	nrrrrtv.log.console("本机IP: " + window.location.pathname);
	nrrrrtv.log.console("本机IP: " + window.location.search);
	nrrrrtv.log.console("本机IP: " + window.location.hash);
};
//nrrrrtv.profile.wangzhi1="http://127.0.0.1:8848/";
// nrrrrtv.profile.wangzhi1 = "http://10.148.245.4:8848/";
//nrrrrtv.profile.wangzhi1 = "http://192.168.1.19:8848/";
nrrrrtv.profile.fuwuqi = "192.168.1.2:8080";

nrrrrtv.profile.wangzhi33333 = "http://" + nrrrrtv.profile.fuwuqi + "/yonghu/";
nrrrrtv.profile.jiudianchanglianjie = "ws://" + nrrrrtv.profile.fuwuqi + "/yonghu/jiudianchanglianjie";
nrrrrtv.profile.jiudianshangchuanchanglianjie = "ws://" + nrrrrtv.profile.fuwuqi +
	"/yonghu/jiudianshangchuanchanglianjie";
nrrrrtv.profile.init = function() {
	this.platform = this._get_platform();
	this.browser = this._get_browser();
	nrrrrtv.profile.bendidizhi = "http://" + window.location.host + "/";
	//nrrrrtv.log.console(nrrrrtv.profile.wangzhi4);
	//nrrrrtv.profile.wangzhi="http://127.0.0.1:8848/web/images/";
	//nrrrrtv.profile.tupiandizhi = nrrrrtv.profile.bendidizhi + "web/images/";
	nrrrrtv.profile.tupiandizhi = nrrrrtv.profile.wangzhi33333 + "jiudianxianshi?wenjianming=";
	nrrrrtv.profile.wangzhi2222 = nrrrrtv.profile.bendidizhi + "web/";
	nrrrrtv.profile.shijian = new Date();

};

nrrrrtv.profile._get_platform = function() {
	var platform = navigator.platform;

	if (platform.indexOf("Win32") == -1 &&
		platform.indexOf("Linux x86") == -1)
		platform = "STB";
	else
		platform = "PC";

	return platform;
};

nrrrrtv.profile._get_browser = function() {
	var browser = "PCBrowser";

	// 茁壮中间件
	if (typeof(iPanel) != "undefined")
		browser = "iPanel";
	// 全景中间件
	else if (typeof(jShow) != "undefined")
		browser = "SHDV";
	// NGB-H国标(iPanel也有MediaPlayer对象,但NGB-H绝对没有iPanel对象)
	else if (typeof(MediaPlayer) != "undefined")
		browser = "NGB-H";

	return browser;
};

/*--nrrrrtv对象初始化
====================================================== */
(function() {
	nrrrrtv.profile.init();
	nrrrrtv.profile.info();
})();
