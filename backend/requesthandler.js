var ccap = require('ccap');
var md5 = require('MD5');
var mysql = require('mysql');
var url = require('url');

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
	
	response.writeHead(options.statusCode || '200',defaultResponseHeader);
	response.end(JSON.stringify(json),'utf-8');
}

var account = {
	///cgi-bin/account/login
	login:function(pathname, request, response, config){
		jsonRespond(response,{
			code:0,
			data:{a:1},
			msg:''
		});
	},

	///cgi-bin/account/register
	register:function(pathname, request, response, config){
		connection.connect();
		connection.query(
		'insert into user(\
			user_name,\
			user_avatar,\
			user_password,\
			user_type,\
			user_mobile,\
			user_createtime,\
			user_logintime,\
			user_email,\
			user_authority) values(\
			"'+postData.username+'",\
			"'+postData.useravatar+'",\
			"'+md5(postData.userpassword)+'",\
			'+1+',\
			"'+postData.usermobile+'",\
			'+new Date()+',\
			'+null+',\
			"'+postData.useremail+'",\
			'+0+')', 
		function(err, rows) {
			if(!err){
				jsonRespond(response,{
					code:0,
					data:{},
					msg:''
				});
			}
			else{
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
		var text = ary[0];
		var buffer = ary[1];
		response.writeHead('200');
		response.writeHead('Content-Type','image/jpeg');
		response.end(buffer);
	}
};

exports.account = account;