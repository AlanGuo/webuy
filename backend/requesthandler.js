var ccap = require('ccap');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var mysql = require('mysql');
var qs = require('querystring');

var mysqlConnection = {
  host     : '58.96.185.53',
  user     : 'root',
  password : 'Siemenlon123'
};
var connection = mysql.createConnection(mysqlConnection);

var jsonRespond = function(response, json, options){
	options = options || {};

	var defaultResponseHeader = {
		'Content-Type':'application/json;charset=UTF-8'
	};
	for(var p in options){
		defaultResponseHeader[p] = options[p]
	}
	
	response.writeHead(options.status || '200',defaultResponseHeader);
	response.end(json?JSON.stringify(json):'','utf-8');
}


var vercode = '';

var account = {
	///cgi-bin/account/login
	login:function(pathname, request, response, config){
		jsonRespond(response,{
			code:0,
			data:{a:1},
			msg:''
		});
	},

	///cgi-bin/account/signup
	signup:function(pathname, request, response, config){
		if(/post/i.test(request.method)){
			var postData = qs.parse(request.body);
			if(vercode === postData.vercode){
				connection.connect();
				var sql = 'insert into webuy.user (user_name, user_avatar, user_password, user_type, user_mobile, user_createtime, user_logintime, user_email, user_authority)'
						+ ' values ("'
						+postData.username+'",'
						+null+',"'
						+md5.update(postData.userpassword).digest('hex')+'",'
						+1+','
						+null+',"'
						+new Date()+'",'
						+null+',"'
						+postData.useremail+'",'+
						0+')';

				connection.query(sql, 
				function(err, rows) {
					if(!err){
						jsonRespond(response,{
							code:0,
							data:{},
							msg:''
						});
					}
					else{
						console.log(err);
						jsonRespond(response,{
							code:500,
							data:{},
							msg:''
						},{
							statusCode:500
						});
					}
				});
				connection.end();
			}
			else{
				jsonRespond(response,{
					code:401,
					data:{},
					msg:'verifycode not match'
				},{
					status:401,
					statusText:'verifycode not match'
				});
			}
		}
		else{
			jsonRespond(response,{
				code:405,
				data:{},
				msg:'method not allowed'
			},{
				statusCode:405,
				statusText:'method not allowed'
			});
		}
	},

	///cgi-bin/account/verifycode
	verifycode:function(pathname, request, response, config){
		var captcha = ccap({
			width:100,
			height:35,
			offset:22,
			fontsize:32,
			generate:function(){//Custom the function to generate captcha text
		        //generate captcha text here
		        //return the captcha text
		        var text = (Math.random()*10000).toPrecision(4).replace(/\./,'');
		        return text;
		    }
		});
		var ary = captcha.get();
		
		//ary[0] is captcha's text,ary[1] is captcha picture buffer.
		vercode = ary[0];
		var buffer = ary[1];
		response.writeHead('200',{
			'Content-Type':'image/jpeg'
		});
		response.end(buffer);
	}
};

exports.account = account;