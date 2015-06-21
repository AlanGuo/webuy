'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');

	var indexPage = {
		title:env.defaultTitle,
		render:function(){
			pageManager.html({
				top:template('index/indexlogin',{title:''}),
				container:template('index/index',{}),
				scroll:0
			});
		},
		events:{
			'click':{
				'fuck':function(){
					pageManager.redirect('account','login');
				}
			}
		}
	};

	module.exports = indexPage;
});