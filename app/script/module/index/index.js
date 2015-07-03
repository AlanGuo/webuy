'use strict';

define(function (require, exports, module) {
	var template = require('template'),
		TopBottomView = require('TopBottomView');

	var indexView = TopBottomView.extend({
		render:function(){
			this.renderContent({
				top:template('index/top'),
				container:template('index/index',{}),
			});
		},
		events:{
			'click':{
				'fuck':function(){
					this.$router.loadUrl('/account/login');
				}
			}
		}
	});

	module.exports = indexView;
});