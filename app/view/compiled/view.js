/*TMODJS:{"version":"1.0.0"}*/
!function(require, exports, module) {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = window.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    if (template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define) define(function() {
        return template;
    }); else if ("undefined" != typeof exports) module.exports = template; else {
        for (var namespaceArray = "webuytmpl".split("."), global = window, i = 0; i < namespaceArray.length; i++) {
            var item = namespaceArray[i];
            global[item] = global[item] || {}, global = global[item];
        }
        global.template = template;
    }
    /*v:1*/
    template("account/login/login", '<div class="layout-cont">  <div class="layer-login"> <div class="hd-login"> <a class="icon-camera" href="#nolink"></a> <img class="avatar hide" src="www/ui/img/global/test_pro2.jpg" alt=""> </div> <div class="box-inpt"> <span class="icon-email"></span> <input class="login-inpt" type="text" placeholder="请输入邮箱"> </div> <div class="box-inpt"> <span class="icon-keyword"></span> <input class="login-inpt" type="password" placeholder="请输入密码"> </div> <div class="button"> <a href="index.html" class="btn-buy">登 录</a> </div> </div>  </div>'), 
    /*v:1*/
    template("common/header", function($data) {
        "use strict";
        var $utils = this, right = ($utils.$helpers, $data.right), $escape = $utils.$escape, title = $data.title, $out = "";
        return $out += ' <section class="top-bar"> <div class="shop-top-bar"> <div class="top-logo"> <a data-event="back" class="icon-left"></a> </div> ', 
        right && ($out += ' <div class="top-right"> <a data-event="', $out += $escape(right.event), 
        $out += '">', $out += $escape(right.title), $out += "</a> </div> "), $out += ' <div class="top-center"> ', 
        $out += $escape(title), $out += " </div> </div> </section> ", new String($out);
    }), /*v:3*/
    template("index/index", '<div class="prd-list"> <div class="prd-item"> <div class="prd-wrap"> <a class="item" href="detail.html"> <div class="pic"> <img src="www/ui/img/global/test.jpg" alt=""> </div> <div class="ft-h2"> 科尔沁原味羊原原尔沁沁 </div> <div class="wrap-price"> <span class="ft-price left">¥189</span> <span class="ft-tips right">还剩99件</span> </div> </a> </div> <div class="prd-wrap"> <a class="item" href="#nolink"> <div class="pic"> <img src="www/ui/img/global/test.jpg" alt=""> </div> <div class="ft-h2"> 科尔沁原味羊原原尔沁沁 </div> <div class="wrap-price"> <span class="ft-price left">¥189</span> <span class="ft-tips right">还剩99件</span> </div> </a> </div> <div class="prd-wrap"> <a class="item" href="#nolink"> <div class="pic"> <img src="www/ui/img/global/test.jpg" alt=""> </div> <div class="ft-h2"> 科尔沁原味羊原原尔沁沁 </div> <div class="wrap-price"> <span class="ft-price left">¥189</span> <span class="ft-tips right">还剩99件</span> </div> </a> </div> </div>  </div>'), 
    module && (module.exports = template);
}();