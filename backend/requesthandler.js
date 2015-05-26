var ccap = require('ccap');

var account = {
	//cgi-bin/account/login
	login:function(request, response, querystring, postData, config){
		response.writeHead('200');
		response.writeHead('Content-Type','application/json');
		var result = {
			code:0,
			data:{},
			msg:''
		};
		response.write(JSON.stringify(result),'utf-8');
		response.end();
	},

	//cgi-bin/account/verifycode
	verifycode:function(request, response, querystring, postData, config){
		var captcha = ccap(/*width, height, offset*/);
		var ary = captcha.get();
		
		//ary[0] is captcha's text,ary[1] is captcha picture buffer.
		var text = ary[0];
		var buffer = ary[1];
		response.writeHead('200');
		response.writeHead('Content-Type','image/jpeg');
		response.end(buffer);
	}
};

exports.account = account;