'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');
	var binder = require('binder');
	var dialog = require('dialog');
	var manager = require('manager');
	var formatchecker = require('formatcheck');

	var loginPage = {
		title:env.defaultTitle,
		data:{
			useremail:'',
			userpassword:''
		},
		render:function(){
			pageManager.html({
				top:template('common/header',{title:'登录',right:{title:'忘记密码','event':'forgetPassword'}}),
				container:template('account/login/login',{}),
				scroll:0
			});

			binder.bind(pageManager.container[0],this.data);
		},
		events:{
			'click':{
				'signin':function(){
					var postedData = this.data;
					for(var p in postedData){
						postedData[p] = postedData[p].trim();
					}

					if(!formatchecker.isEmail(postedData.useremail)){
						dialog.showError('请填写正确的邮箱地址');
						return;
					}
					if(!formatchecker.notEmpty(postedData.userpassword)){
						dialog.showError('请填写密码');
						return;
					}

					manager.signin(this.data,function(){
						location.href = '/';
					},function(msg){
						dialog.showError(msg);
					});
				}
			}
		}
	};

	module.exports = loginPage;
});