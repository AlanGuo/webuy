'use strict';

define(function(require, exports, module) {
	var $ = require('$');
	var net = require('net');
	var dialog = require('dialog');
	var pageManager = require('pagemanager');
	//var util = require('util');
	var env = require('env');

	var config = {};
	config.get = function (option) {
		var cgi = option.url;
		var params = [];
		//var atk = util.gettk('skey');

		// if(window.userinfo.userId){
		// 	params.push('uin='+window.userinfo.userId);
		// }
		// if(atk){
		// 	params.push('atk='+atk);
		// }
		
		if(params.length){
			cgi += /\?/.test(cgi) ? '&' : '?';
			cgi += params.join('&');
		}

		return {
			url:cgi,
			method:option.method
		};
	};
	//数据管理
	var manager = {
		isBusy:false,
		//所有正常cgi调用都通过这个门面方法进行调用
		cgiFacade:function(cgi,data, cb, fail, option){
			var eventName = '';
			//var startTime = new Date();
			var _cb = function (ret) {
				var	_code = ret.code;
				manager.isBusy = false;
				//util.tj('cgi',cgi.url.split('?')[0],ret.code,new Date()-startTime);
				//恢复按钮
				if(option.button){
					$(option.button).removeClass('disabled').data('event',eventName);
				}

				if (_code === 0) {
					if(cb){
						cb(ret.data);
					}
				} else if(_code === 403){
					dialog.hide();
					if(env.isWX){
						pageManager.redirect('account','bind',null,{pathname:encodeURIComponent(location.pathname)});
					}
					else{
						pageManager.redirect('account','login',null,{pathname:encodeURIComponent(location.pathname)});
					}
					
				} else {
					if(fail){
						fail(ret.msg,_code,ret.data);
					}
					else{
						if(pageManager.isEmpty()){
							pageManager.renderError(ret.msg || '系统繁忙');
						}
						else{
							dialog.msgbox(ret.msg||'系统繁忙');
						}
					}
				}
			};

			this.isBusy = true;
			//获取服务端数据
			net.send(cgi,{
				data: data,
				cb: _cb,
				url: cgi
			});

			option = option||{};
			//禁用按钮
			if(option.button){
				eventName = $(option.button).addClass('disabled').data('event');
				$(option.button).removeAttr('data-click-event');
			}
		},

		signup:function (data, cb, fail, option) {
			this.cgiFacade(config.get({url:'/cgi-bin/account/signup', method:'post'}),data, cb, fail, option);
		}
	};

	module.exports = manager;
});
