'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');
	//var manager = require('manager');

	var signupPage = {
		title:env.defaultTitle,
		render:function(){
			pageManager.html({
				top:template('common/header',{title:'注册'}),
				container:template('account/signup/signup',{}),
				scroll:0
			});
		},
		events:{
			'click':{
				'signup':function(){
					//manager.signup({username:});
				}
			}
		}
	};

	module.exports = signupPage;
});