'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');
	var binder = require('binder');
	var dialog = require('dialog');
	var manager = require('manager');
	var formatchecker = require('formatcheck');
	var vercode	= '/cgi-bin/security/verifycode';

	var signupPage = {
		title:env.defaultTitle,
		data:{
			postedData:{
				username:'',
				useremail:'',
				userpassword:'',
				vercode:''
			},
			seepassclass:'icon-eye close-eye',
			passinputtype:'password',
			src:vercode
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
					var self = this;
					var postedData = this.data.postedData;
					for(var p in postedData){
						postedData[p] = postedData[p].trim();
					}

					if(!formatchecker.notEmpty(postedData.username)){
						dialog.showError('请填写昵称');
						return;
					}
					if(!formatchecker.notEmpty(postedData.vercode)){
						dialog.showError('请填写验证码');
						return;
					}
					if(!formatchecker.isEmail(postedData.useremail)){
						dialog.showError('请填写正确的email');
						return;
					}
					if(!formatchecker.isPassword(postedData.userpassword)){
						dialog.showError('请填写正确的密码');
						return;
					}

					//注册账户
					manager.signup(this.data.postedData,function(){
						location.href = '/';
					},function(msg){
						self.data.src = vercode + '?random=' + Math.random();
						dialog.showError(msg);
					});
				},
				'changevercode':function(){
					this.data.src = vercode + '?random=' + Math.random();
				}
			},
			'touchstart':{
				'seepassword':function(){
					this.data.seepassclass = 'icon-eye open-eye';
					this.data.passinputtype = 'text';
				}
			},
			'touchend':{
				'seepassword':function(){
					this.data.seepassclass = 'icon-eye close-eye';
					this.data.passinputtype = 'password';
				}
			}
		}
	};

	module.exports = signupPage;
});