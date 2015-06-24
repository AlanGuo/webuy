'use strict';

define(function(require, exports, module) {
	var requestmanager = require('requestmanager');

	requestmanager.add('signup','/cgi-bin/account/signup','post');
	requestmanager.add('signin','/cgi-bin/account/signin','post');

	module.exports = requestmanager;
});
