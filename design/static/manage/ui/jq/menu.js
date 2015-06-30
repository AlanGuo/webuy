$(function(){


				$(".sub-item a").bind("click",function(){

					var subHeight = $(".submenu li").height();
					var submenuHt; 

					if(!$(this).parent().find("ul").length){ //当menu里没有ul的情况下

						$(".list-group li").removeClass("cur").removeClass("open");
						$(this).parent().addClass("cur");

						if(!$(this).parent().parent().hasClass("submenu")){ //关闭所有的二级菜单
							$(".submenu").css("height", 0);	

						}
						else{
							$(this).parent().parent().parent().addClass("open");
						}

					}
					else{
						//用来判断是否展开
						if($(this).hasClass("mn")){
							
							$(".sub-item").removeClass("open");
							var ulHeight = $(this).parent().find("ul").height(); //当前选中menu的二级菜单的高度
							submenuHt = $(this).parent().find("li").length*subHeight;
							$(".submenu").css("height", 0); //收起所有二级菜单
							//展开和收起二级菜单
							$(this).parent().find(".submenu").css("height", ulHeight ? 0 : submenuHt);
							//移除非当前菜单open
							ulHeight ? $(this).parent().removeClass("open") : $(this).parent().addClass("open");
						}

					}
				});



// table滑动
				$('.tablelist-menu a').each(function(i){
					$(this).click(function(){
						$(this).addClass('cur').siblings().removeClass('cur');
						$('.table-infor:eq('+ i + ')').show().siblings().hide();
					});
				});
				
	


})
