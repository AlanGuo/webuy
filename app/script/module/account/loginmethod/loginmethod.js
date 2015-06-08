'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');

	var loginMethodPage = {
		title:env.defaultTitle,
		render:function(){
			pageManager.html({
				top:template('common/header',{title:'登录方式'}),
				container:template('account/loginmethod/loginmethod',{}),
				scroll:0
			});
		},
		events:{

		}
	};

	module.exports = loginMethodPage;
});