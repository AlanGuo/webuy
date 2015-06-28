var mysql = require('mysql');
var crypto = require('crypto');
var qs = require('querystring');
var security = require('./security');
var util = require('./util');

var mysqlConnection = {
  host     : '58.96.185.53',
  user     : 'root',
  password : 'Siemenlon123'
};
var pool = mysql.createPool(mysqlConnection);

var connectCallback = function(err){
	if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }
	  console.log('connected as id ' + connection.threadId);
};

var account = {
	///cgi-bin/account/signin
	signin:function(pathname, request, response, config){
		if(/post/i.test(request.method)){
			var postData = qs.parse(request.body);
			pool.getConnection(function(err,connection){
				if(err){console.log(err);}
				else{
					var columns = ['user_email', 'user_password'];
					var sql = mysql.format('select ?? from webuy.user where user_type=1 and user_email=?',[columns,postData.useremail]);
					connection.query(sql,function(err, rows){
						connection.release();
						if(!err){
							if(rows.length){
								if(rows[0].user_password === crypto.createHash('md5').update(postData.userpassword).digest('hex')){
									util.jsonRespond(response,{
										code:0,
										data:{},
										msg:''
									});
								}
								else{
									util.jsonRespond(response,{
										code:111,
										data:{},
										msg:'邮箱或密码错误'
									});
								}
							}
							else{
								util.jsonRespond(response,{
									code:112,
									data:{},
									msg:'邮箱或密码错误'
								});
							}
						}
						else{
							util.jsonRespond(response,{
								code:500,
								data:{},
								msg:'query user failed'
							},{
								status:500
							});
						}
					});
				}
			});
		}else{
			util.jsonRespond(response,{
				code:405,
				data:{},
				msg:'method not allowed'
			},{
				status:405
			});
		}
	},

	///cgi-bin/account/signup
	signup:function(pathname, request, response, config){
		if(/post/i.test(request.method)){
			var postData = qs.parse(request.body);
			if(security.vercode() === postData.vercode){
				pool.getConnection(function(err,connection){
					if(err){console.log(err);}
					else{
						var columns = ['user_email', 'user_password'];
						var sql = mysql.format('select ?? from webuy.user where user_name=? or user_email=?',
							[columns,postData.username,postData.useremail]);

						connection.query(sql,function(err, rows){
							if(!err){
								if(rows.length){
									connection.release();
									if(rows.filter(function(item){
										if(item.user_email === postData.useremail){
											return item;
										}
									}).length){
										util.jsonRespond(response,{
											code:101,
											data:{},
											msg:'邮箱已存在'
										});
									}
									else if(rows.filter(function(item){
										if(item.user_name === postData.username){
											return item;
										}
									}).length){
										util.jsonRespond(response,{
											code:102,
											data:{},
											msg:'用户名已存在'
										});
									}
								}
								else{
									var columns = [
										'user_name', 
										'user_avatar', 
										'user_password', 
										'user_type', 
										'user_mobile', 
										'user_createtime', 
										'user_logintime', 
										'user_email', 
										'user_authority'
									];
									var values = [
										postData.username,
										null,
										crypto.createHash('md5').update(postData.userpassword).digest('hex'),
										1,
										null,
										+new Date(),
										null,
										postData.useremail,
										0
									];

									var sql = mysql.format('insert into webuy.user (??) values (?)',[columns,values]);
									connection.query(sql, function(err, rows) {
										connection.release();
										if(!err){
											util.jsonRespond(response,{
												code:0,
												data:{},
												msg:''
											});
										}
										else{
											console.log(err);
											util.jsonRespond(response,{
												code:500,
												data:{},
												msg:'insert into user failed'
											},{
												status:500
											});
										}
									});
								}
							}else{
								console.log(err);
								util.jsonRespond(response,{
									code:500,
									data:{},
									msg:'query user_name,user_email failed'
								},{
									status:500
								});
							}
						});
					}
				});
			}else{
				util.jsonRespond(response,{
					code:401,
					data:{},
					msg:'验证码错误'
				},{
					status:401
				});
			}
		}else{
			util.jsonRespond(response,{
				code:405,
				data:{},
				msg:'method not allowed'
			},{
				status:405
			});
		}
	}
};

module.exports = account;