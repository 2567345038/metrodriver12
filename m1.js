// ==UserScript==
// @name         tk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://examcoo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=examcoo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // getTokenpid
    function getTokenpid(url,ck){
        console.log(url,ck);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                var a;
                console.log(a);
                a = this.responseText;
                const b = /var vp4tokenpid = "(.*?)";var/;
                var result = a.match(b);
                return(result[1]);
            }
        });
        xhr.open("GET", url);
        xhr.setRequestHeader("Cookie", ck);
        xhr.send();
    };
    // getHref 返回href
    function getHref(){
        const elements = document.querySelectorAll('[data-role="trClick"]');
        let hrefList = [];
        elements.forEach(element => {
            const tdElement = element.querySelector('td:nth-child(5)');
            if (tdElement){
                const aElement = tdElement.querySelector('a');
                if (aElement){
                    hrefList.push(aElement.getAttribute('href'));
                }
            }
        });
        return hrefList;
    };
    // getPid ？？？
    function getPid(u){
        const k = /id\/(.*?)\/tid/;
        var re = u.match(k);
        return(re[1])
    };
    // getPaper 返回json题库
    function getPaper(pid,tid){
        var url = "https://examcoo.com/editor/rpc/getpapercontent/pid/"+pid+"/tokenpid/"+tid+"/fromAction/view";
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                return(this.responseText);
            }
        });
        xhr.open("GET", url);
        xhr.send();
    };
    // getToken
    function getToken(){
        var ck = document.cookie;
        return ck;
    };
    // Nobita
    function Nobita(){
        var c;//获取cookie
        c = getToken();
        let hl = [];//获取herf
        hl = getHref();
        let Nobi = [];
        for (var i = 0;i < hl.length;i++){
            var h;
            h = "https://examcoo.com"+hl[i];
            var t;
            t = getTokenpid(h,c);//tokenpid
            var p;
            p = getPid(h);
            var a;
            a = getPaper(p,t);
            Nobi = Nobi.concat(a);
        };
        console.log(Nobi);
    };
    // button
    var button = document.createElement("button");
    button.textContent = "点击开始";
    button.style.position = "fixed"
    button.style.top = "10px"
    button.style.right = "10px"
    button.style.zIndex = "9999"
    button.addEventListener("click",Nobita);
    document.body.appendChild(button);
})();
