/*TMODJS:{"version":4,"md5":"c016328acac42c6c9e933b8516675540"}*/
template('common/header',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,right=$data.right,$escape=$utils.$escape,title=$data.title,$out='';$out+=' <section class="top-bar"> <div class="shop-top-bar"> <div class="top-logo"> <a data-click-event="back" class="icon-left"></a> </div> ';
if(right){
$out+=' <div class="top-right"> <a data-event="';
$out+=$escape(right.event);
$out+='">';
$out+=$escape(right.title);
$out+='</a> </div> ';
}
$out+=' <div class="top-center"> ';
$out+=$escape(title);
$out+=' </div> </div> </section> ';
return new String($out);
});