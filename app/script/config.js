'use strict';


define(function(require, exports, module) {
	var $ = require('$');
	var spaseedConfig = require('spm_modules/spaseed/1.1.17/config');
	//参数配置
	var config = $.extend(true,spaseedConfig,{
		//首页模块名
		'root': 'index',
		'basePath': 'app/script/module/',
		'debug': true,
		'defaultClass':'scroll-content',
		/**
		 * 页面底部容器选择器
		 * @property bottom
		 * @type String
		 * @default '#bottom'
		 */
		'bottom': '#bottom',
		/**
		 * 页面顶部容器选择器
		 * @property header
		 * @type String
		 * @default '#top'
		 */
		'top':'#top',

		'mask':'#mask',
		'dialog':'#dialog',
		'msgbox':'#msgbox',
		'loading':'#loading'
	});

	module.exports = config;
});
