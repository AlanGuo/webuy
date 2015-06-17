'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');
	var binder = require('binder');
	var dialog = require('dialog');
	var manager = require('manager');

	var signupPage = {
		title:env.defaultTitle,
		data:{
			username:'',
			useremail:'',
			userpassword:'',
			vercode:''
		},
		render:function(){
			pageManager.html({
				top:template('common/header',{title:'注册'}),
				container:template('account/signup/signup',{}),
				scroll:0
			});

			binder.bind(pageManager.container[0],this.data);
		},
		events:{
			'click':{
				'signup':function(){
					manager.signup(this.data,function(data){
						window.alert('success'+JSON.stringify(data));
					},function(msg){
						dialog.showError(msg);
					});
				}
			}
		}
	};

	module.exports = signupPage;
});