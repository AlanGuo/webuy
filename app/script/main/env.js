'use strict';

define(function(require, exports,module) {
	var util = require('util');
	var env = {},ua = navigator.userAgent;

	env.defaultTitle = 'WeBuy';
	env.cdn = window.cdn;
	env.isIOS = util.isIOS();
	env.isAndroid = util.isAndroid();
	env.isWX = /micromessenger/i.test(ua);
	env.isMQQB = /mqqbrowser/i.test(ua);
	//env.appid = 'wx285d4c7c74388c21';

	var doc = document.documentElement;
	var bod = document.body;
	env.resolution = {};
	env.resolution.x = Math.max(doc.clientWidth,bod.clientWidth);
	env.resolution.y = Math.max(doc.clientHeight,bod.clientHeight);

    module.exports = env;
});