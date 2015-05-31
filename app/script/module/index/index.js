'use strict';

define(function (require, exports, module) {
	var env = require('env');
	var template = require('template');
	var pageManager = require('pagemanager');

	var indexPage = {
		title:env.defaultTitle,
		render:function(){
			pageManager.html({
				top:'',
				container:template('index/index',{}),
				scroll:0
			});
		},
		events:{

		}
	};

	module.exports = indexPage;
});