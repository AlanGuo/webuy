var ccap = require('ccap');
var md5 = require('MD5');
var mysql = require('mysql');

var mysqlConnection = {
  host     : '58.96.185.53',
  user     : 'root',
  password : 'Siemenlon123'
};
var connection = mysql.createConnection(mysqlConnection);

var jsonRespond = function(response, json){
	response.writeHead('200');
	response.writeHead('Content-Type','application/json');
	response.write(JSON.stringify(json),'utf-8');
	response.end();
}

var account = {
	///cgi-bin/account/login
	login:function(pathname, request, response, querystring, postData, config){
		jsonRespond(response,{
			code:0,
			data:{},
			msg:''
		});
	},

	///cgi-bin/account/register
	register:function(pathname, request, response, querystring, postData, config){
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
				"'+postData.userpassword+'",\
				"'+1+'",\
				"'+postData.usermobile+'",\
				"'+new Date()+'",\
				"'+new Date()+'",\
				"'+postData.useremail+'",\
				"'+0+'")', 
			function(err, rows) {
		});
		connection.end();

		jsonRespond(response,{
			code:0,
			data:{},
			msg:''
		});
	},

	///cgi-bin/account/verifycode
	verifycode:function(pathname, request, response, querystring, postData, config){
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