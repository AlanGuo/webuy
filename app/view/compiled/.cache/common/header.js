/*TMODJS:{"version":3,"md5":"f316367375d71b43123601bd8a5e787a"}*/
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