/*-- nrrrrtv
====================================================== --*/

/*--Common 公共类函数
====================================================== */

// var aaa = function(selector) {
// 	if (selector.indexOf("#") > -1)
// 		return document.getElementById(selector.replace("#", ""));
// 	else
// 		return document.getElementsByTagName(selector);
// };
var nrrrrtv = nrrrrtv || {};

nrrrrtv.aaa = function() {};
/*
 * Ajax请求
 * @param o.url (String)        : 发送请求的地址。
 * @param o.type (String)       : 请求方式 ("POST" 或 "GET")，默认为"GET"。
 * @param o.async (Boolean)     : 此参数实际无效，默认为true。
 * @param o.data (Object,String): 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
 * @param o.success (Function)  : 请求成功后回调函数。参数：服务器返回数据，数据格式。
 * @param o.error (Function)    : (默认: 自动判断 (xml 或 html)) 请求失败时调用时间。参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
 */
var $3 = function(selector) {
	if (selector.indexOf("#") > -1)
		return document.getElementById(selector.replace("#", ""));
	else
		return document.getElementsByTagName(selector);
};
var $2 = function(selector) {

	return document.getElementsByClassName(selector);
};
var $Id = function(selector) {

	return document.getElementById(selector);
};

nrrrrtv.aaa.GetQueryString = function(param) { //param为要获取的参数名 注:获取不到是为null
	var currentUrl = window.location.href; //获取当前链接
	var arr = currentUrl.split("?"); //分割域名和参数界限
	if (arr.length > 1) {
		arr = arr[1].split("&"); //分割参数
		for (var i = 0; i < arr.length; i++) {
			var tem = arr[i].split("="); //分割参数名和参数内容
			//  console.log('tem[0]'+tem[0])
			if (tem[0] == param) {
				return tem[1];
			}
		}
		return null;
	} else {
		return null;
	}
}
nrrrrtv.aaa.ajax = function(o) {

	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//console.log("3ponse");
	if (xhr) {
		//console.log("4ponse");
		if (o.url) {
			//	console.log("5ponse");
			// 参数处理
			o.type = o.type ? o.type : "GET";
			o.async = o.async ? o.async : true;
			//	console.log("6ponse");

			if (o.type == "GET" && o.data) // 如果为"GET"方式，并且使用data方式传参
			{
				//console.log("7ponse");
				if (typeof o.data == "object") {
					//	console.log("8ponse");
					var tmp = [];
					for (var i in o.data)
						tmp.push(i + "=" + o.data[i]);

					o.data = tmp.join("&");
				}

				o.url = o.url + (/\?/.test(o.url) ? '&' : '?') + o.data;
			}
			//console.log("9ponse"); 
			// 发送AJAX请求
			xhr.open(o.type, o.url, o.async);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			if (o.type == "POST") {
				xhr.send(o.data);
			} else {
				xhr.send();
				xhr.onreadystatechange = function() {
					//console.log("10ponse");
					/**
					 * AJAX运行步骤与状态值(xhr.readyState)说明
					 * 在AJAX实际运行当中，对于访问XMLHttpRequest（XHR）时并不是一次完成的，而是分别经历了多种状态后取得的结果，对于这种状态在AJAX中共有5种，分别是。
					 * 0 - (未初始化)还没有调用send()方法
					 * 1 - (载入)已调用send()方法，正在发送请求
					 * 2 - (载入完成)send()方法执行完成，
					 * 3 - (交互)正在解析响应内容
					 * 4 - (完成)响应内容解析完成，可以在客户端调用了
					 * 对于上面的状态，其中“0”状态是在定义后自动具有的状态值，而对于成功访问的状态（得到信息）我们大多数采用“4”进行判断。
					 */
					if (xhr.readyState == 4) {
						// AJAX状态码(xhr.status)参考网络资料
						if (xhr.status == 200 || xhr.status == 304) {
							if (o.success) {
								//	console.log("2ccponse" + xhr.responseText);
								if (xhr.responseText.indexOf("Page Not Found") != -1) {
									//	console.log("73ponse" + xhr.responseText);
									o.error(400,
										xhr.responseText
									);
								} else {

									if (o.dataType == "JSON") {


										//o.success(xhr, [xhr.responseText]);

										o.success(xhr, xhr.responseText);

									} else {
										o.success(xhr, xhr.responseText);
									}
								}

							}
						} else {
							// if (o.error)
							// 	o.error(xhr);
							o.error(400,
								"xhr.status" + xhr.status
							);
						}
					}
				};
			}



			// 如果为"POST"方式，发送数据
			// if (o.type == "POST"){
			// 	xhr.send(o.data);
			// 	}

		} else {
			o.error(400,
				"The request url is empty!"
			);
		}


	} else
		o.error(400,
			"The current browser does support ajax or request url is empty!"
		);

};

nrrrrtv.aaa.ajax2 = function(o, success, error) {
	//不能跨域不能写绝对路径和绝对地址
	//只能get//open必须为true;异步;json
	var xhr;
	xhr = null;
	if (window.XMLHttpRequest) { // code for IE7, Firefox, Opera, etc.
		xhr = new XMLHttpRequest();
		//nrrrrtv.log.console("huoquindex4541");
	} else if (window.ActiveXObject) { // code for IE6, IE5
		xhr = new ActiveXObject("Microsoft.XMLHTTP");

		//nrrrrtv.log.console("huoquindex4542");
	} else {
		//nrrrrtv.log.console("huoquindex4543");
		window.XMLHttpRequest = function() {
			try {
				return new ActiveXObject("MSXML2.XMLHttp.6.0");
			} catch (e1) {
				try {
					return new ActiveXObject("MSXML2.XMLHttp.3.0");
				} catch (e2) {
					throw new Error("XMLHttpRequest is not supported");
				}
			}
		}
	}
	//console.log("3ponse");
	if (xhr) {
		//console.log("4ponse");
		if (o.url) {
			//	console.log("5ponse");
			// 参数处理

			//	o.async = o.async ? o.async : true;
			//	console.log("6ponse");

			// if (o.type == "GET" && o.data) // 如果为"GET"方式，并且使用data方式传参
			// {
			// 	//console.log("7ponse");
			// 	if (typeof o.data == "object") {
			// 		//	console.log("8ponse");
			// 		var tmp = [];
			// 		for (var i in o.data)
			// 			tmp.push(i + "=" + o.data[i]);

			// 		o.data = tmp.join("&");
			// 	}

			// 	o.url = o.url + (/\?/.test(o.url) ? '&' : '?') + o.data;
			// }
			//console.log("9ponse"); 
			// 发送AJAX请求
			//xhr.overrideMimeType("application/json");
			xhr.open("GET", o.url, true);
			//nrrrrtv.log.console("huoquindex455" + o.url);
			//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			xhr.send();
			xhr.onreadystatechange = function() {
				//console.log("10ponse");
				/**
				 * AJAX运行步骤与状态值(xhr.readyState)说明
				 * 在AJAX实际运行当中，对于访问XMLHttpRequest（XHR）时并不是一次完成的，而是分别经历了多种状态后取得的结果，对于这种状态在AJAX中共有5种，分别是。
				 * 0 - (未初始化)还没有调用send()方法
				 * 1 - (载入)已调用send()方法，正在发送请求
				 * 2 - (载入完成)send()方法执行完成，
				 * 3 - (交互)正在解析响应内容
				 * 4 - (完成)响应内容解析完成，可以在客户端调用了
				 * 对于上面的状态，其中“0”状态是在定义后自动具有的状态值，而对于成功访问的状态（得到信息）我们大多数采用“4”进行判断。
				 */
				if (xhr.readyState == 4) {
					// AJAX状态码(xhr.status)参考网络资料
					if (xhr.status == 200 || xhr.status == 304) {
						//nrrrrtv.log.console("huoquindex4547");
						//if (o.success) {
						//	console.log("2ccponse" + xhr.responseText);


						if (xhr.responseText.indexOf("Page Not Found") != -1) {
							//	nrrrrtv.log.console("huoquindex4548"); //	console.log("73ponse" + xhr.responseText);
							o.error(400,
								xhr.responseText
							);
						} else {

							if (o.dataType == "JSON") {

								//	nrrrrtv.log.console("huoquindex4549" + xhr.responseText);
								//o.success(xhr, [xhr.responseText]);
								try {

									//nrrrrtv.log.console("huoquindex45473");
									o.success(xhr, eval('(' + xhr.responseText + ')'));
									//nrrrrtv.log.console("huoquindex4546");

								} catch (e) {
									o.error(400,
										xhr.responseText
									); //nrrrrtv.log.console("nrrrrtv.navigation.move_ok() , eval error!");
								};


							} else {
								o.success(xhr, xhr.responseText);
							}
						}

						//}
					} else {
						// if (o.error)
						// 	o.error(xhr);
						o.error(400,
							"xhr.status" + xhr.status
						);
					}
				}
			};




			// 如果为"POST"方式，发送数据
			// if (o.type == "POST"){
			// 	xhr.send(o.data);
			// 	}

		} else {
			o.error(400,
				"The request url is empty!"
			);
		}


	} else
		o.error(400,
			"The current browser does support ajax or request url is empty!"
		);

};

nrrrrtv.aaa.ajax3 = function(o, success, error) {
	//不能跨域不能写绝对路径和绝对地址
	//只能get//open必须为true;异步;json
	var xhr;
	xhr = null;
	if (window.XMLHttpRequest) { // code for IE7, Firefox, Opera, etc.
		xhr = new XMLHttpRequest();
		//nrrrrtv.log.console("huoquindex4541");
	} else if (window.ActiveXObject) { // code for IE6, IE5
		xhr = new ActiveXObject("Microsoft.XMLHTTP");

		//nrrrrtv.log.console("huoquindex4542");
	} else {
		//nrrrrtv.log.console("huoquindex4543");
		window.XMLHttpRequest = function() {
			try {
				return new ActiveXObject("MSXML2.XMLHttp.6.0");
			} catch (e1) {
				try {
					return new ActiveXObject("MSXML2.XMLHttp.3.0");
				} catch (e2) {
					throw new Error("XMLHttpRequest is not supported");
				}
			}
		}
	}
	//console.log("3ponse");
	if (xhr) {
		//console.log("4ponse");
		if (o.url) {
			//	console.log("5ponse");
			// 参数处理

			//	o.async = o.async ? o.async : true;
			//	console.log("6ponse");

			// if (o.type == "GET" && o.data) // 如果为"GET"方式，并且使用data方式传参
			// {
			// 	//console.log("7ponse");
			// 	if (typeof o.data == "object") {
			// 		//	console.log("8ponse");
			// 		var tmp = [];
			// 		for (var i in o.data)
			// 			tmp.push(i + "=" + o.data[i]);

			// 		o.data = tmp.join("&");
			// 	}

			// 	o.url = o.url + (/\?/.test(o.url) ? '&' : '?') + o.data;
			// }
			//console.log("9ponse"); 
			// 发送AJAX请求
			//xhr.overrideMimeType("application/json");
			xhr.open("GET", o.url, false);
			//nrrrrtv.log.console("huoquindex455" + o.url);
			//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			xhr.send(null);
			if (xhr.readyState == 4) {
				// AJAX状态码(xhr.status)参考网络资料
				if (xhr.status == 200 || xhr.status == 304) {
					//nrrrrtv.log.console("huoquindex4547");
					//if (o.success) {
					//	console.log("2ccponse" + xhr.responseText);


					if (xhr.responseText.indexOf("Page Not Found") != -1) {
						//	nrrrrtv.log.console("huoquindex4548"); //	console.log("73ponse" + xhr.responseText);
						o.error(400,
							xhr.responseText
						);
					} else {

						if (o.dataType == "JSON") {

							//	nrrrrtv.log.console("huoquindex4549" + xhr.responseText);
							//o.success(xhr, [xhr.responseText]);
							try {

								//nrrrrtv.log.console("huoquindex45473");
								o.success(xhr, eval('(' + xhr.responseText + ')'));
								//nrrrrtv.log.console("huoquindex4546");

							} catch (e) {
								o.error(400,
									xhr.responseText
								); //nrrrrtv.log.console("nrrrrtv.navigation.move_ok() , eval error!");
							};


						} else {
							o.success(xhr, xhr.responseText);
						}
					}

					//}
				} else {
					// if (o.error)
					// 	o.error(xhr);
					o.error(400,
						"xhr.status" + xhr.status
					);
				}
			}




			// 如果为"POST"方式，发送数据
			// if (o.type == "POST"){
			// 	xhr.send(o.data);
			// 	}

		} else {
			o.error(400,
				"The request url is empty!"
			);
		}


	} else
		o.error(400,
			"The current browser does support ajax or request url is empty!"
		);

};
nrrrrtv.aaa.changlianjie = function(aaa, success, error) {
	if ("WebSocket" in window) {
	
	
		// 打开一个 web socket
		var ws = new WebSocket(nrrrrtv.profile.jiudianchanglianjie);
	
		ws.onopen = function() {
			// Web Socket 已连接上，使用 send() 方法发送数据
	// 		var aaa = {
	// 			"ret": 30002,
	// 			"data": {
	
	// 				"uid": "7fdaa1c2-19a0-4348-abf4-c6d1afda2469"
	// 			}
	
	// 		};
			//nrrrrtv.log.console("send" + JSON.stringify(aaa));
	
			ws.send(JSON.stringify(aaa));
		 
	
		};
	
		ws.onmessage = function(evt) {
	

			var received_msg = eval('(' + evt.data + ')')
	nrrrrtv.log.console("onmessage" + received_msg);	
		success(received_msg,ws);
			 
	ws.close();
			 
	
	
		};
		ws.onerror = function(ev) {
	
			nrrrrtv.log.console("onerror" + ev);
	error(ev);
		};
		ws.onclose = function() {
	
			nrrrrtv.log.console("onclose");
	
		};
	} else {
	
		alert("您的浏览器不支持 WebSocket!");
		return;
	}
};
nrrrrtv.aaa.shangchuanchanglianjie = function(aaa, success, error) {
	if ("WebSocket" in window) {
	
	
		// 打开一个 web socket
		var ws = new WebSocket(nrrrrtv.profile.jiudianshangchuanchanglianjie);
	
		ws.onopen = function() {
			// Web Socket 已连接上，使用 send() 方法发送数据
	// 		var aaa = {
	// 			"ret": 30002,
	// 			"data": {
	
	// 				"uid": "7fdaa1c2-19a0-4348-abf4-c6d1afda2469"
	// 			}
	
	// 		};
			//nrrrrtv.log.console("send" + JSON.stringify(aaa));
	
			ws.send(JSON.stringify(aaa));
		 
	
		};
	
		ws.onmessage = function(evt) {
	

			var received_msg = eval('(' + evt.data + ')')
	nrrrrtv.log.console("onmessage" + received_msg);	
		success(received_msg,ws);
			 
	
			 
	
	
		};
		ws.onerror = function(ev) {
	
			nrrrrtv.log.console("onerror" + ev);
	error(ev);
		};
		ws.onclose = function() {
	
			nrrrrtv.log.console("onclose");
	
		};
	} else {
	
		alert("您的浏览器不支持 WebSocket!");
		return;
	}
	
};
nrrrrtv.aaa.ajax4 = function(o, success, error) {
	//不能跨域不能写绝对路径和绝对地址
	//只能get//open必须为true;异步;json

	//长连接websocket
	var xhr;
	xhr = null;
	if (window.XMLHttpRequest) { // code for IE7, Firefox, Opera, etc.
		xhr = new XMLHttpRequest();
		//nrrrrtv.log.console("huoquindex4541");
	} else if (window.ActiveXObject) { // code for IE6, IE5
		xhr = new ActiveXObject("Microsoft.XMLHTTP");

		//nrrrrtv.log.console("huoquindex4542");
	} else {
		//nrrrrtv.log.console("huoquindex4543");
		window.XMLHttpRequest = function() {
			try {
				return new ActiveXObject("MSXML2.XMLHttp.6.0");
			} catch (e1) {
				try {
					return new ActiveXObject("MSXML2.XMLHttp.3.0");
				} catch (e2) {
					throw new Error("XMLHttpRequest is not supported");
				}
			}
		}
	}
	//console.log("3ponse");
	if (xhr) {
		//console.log("4ponse");
		if (o.url) {
			 
			xhr.open("GET", o.url, false);
			 

			xhr.send(null);
			if (xhr.readyState == 4) {
				// AJAX状态码(xhr.status)参考网络资料
				if (xhr.status == 200 || xhr.status == 304) {
					//nrrrrtv.log.console("huoquindex4547");
					//if (o.success) {
					//	console.log("2ccponse" + xhr.responseText);


					if (xhr.responseText.indexOf("Page Not Found") != -1) {
						//	nrrrrtv.log.console("huoquindex4548"); //	console.log("73ponse" + xhr.responseText);
						o.error(400,
							xhr.responseText
						);
					} else {

						if (o.dataType == "JSON") {

							//	nrrrrtv.log.console("huoquindex4549" + xhr.responseText);
							//o.success(xhr, [xhr.responseText]);
							try {

								//nrrrrtv.log.console("huoquindex45473");
								o.success(xhr, eval('(' + xhr.responseText + ')'));
								//nrrrrtv.log.console("huoquindex4546");

							} catch (e) {
								o.error(400,
									xhr.responseText
								); //nrrrrtv.log.console("nrrrrtv.navigation.move_ok() , eval error!");
							};


						} else {
							o.success(xhr, xhr.responseText);
						}
					}

					//}
				} else {
					// if (o.error)
					// 	o.error(xhr);
					o.error(400,
						"xhr.status" + xhr.status
					);
				}
			}




			// 如果为"POST"方式，发送数据
			// if (o.type == "POST"){
			// 	xhr.send(o.data);
			// 	}

		} else {
			o.error(400,
				"The request url is empty!"
			);
		}


	} else
		o.error(400,
			"The current browser does support ajax or request url is empty!"
		);

};
// var page0;var page1;var page2;

nrrrrtv.aaa.huoquindex4 = function(aa) {

	if (nrrrrtv.aaa.zz == null) {
		nrrrrtv.log.console("zz==null");
		nrrrrtv.aaa.ajax3({
			"url": "wenjian/a123.json",
			// "url": "wenjian/a123.json?asd=0&vvv=1",
			"type": "GET",
			"dataType": 'JSON',

			"async": "true",
			"error": function(xhr, dd) {
				console.log("status:" + xhr + ",xmlhttp:" + dd);

			},

			"success": function(xhr, dd) {


				nrrrrtv.aaa.zz = dd.data;
				aa(nrrrrtv.aaa.zz);
				// if (zz == "") {

				// } else {
				// 	page0 = zz.page0;
				// 		page1 = zz.page1;
				// 			page2 = zz.page2;


				// 	if (page0 == "") {

				// 	} else {
				// 	//	$("#aaad").innerHTML = zz1.fubiaoti;


				// 	}

				// } 
			}

		});

	} else {
		aa(nrrrrtv.aaa.zz);
	}



}
