'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');

	var indexPage = {
		title:env.defaultTitle,
		render:function(){
			pageManager.html({
				top:template('common/header',{title:'登录',right:{title:'忘记密码','event':'forgetPassword'}}),
				container:template('account/login/login',{}),
				scroll:0
			});
		},
		events:{

		}
	};

	module.exports = indexPage;
});