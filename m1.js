// ==UserScript==
// @name         tk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  诺比桑出品，不是精品就是禁品
// @author       Nobita
// @match        https://examcoo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=examcoo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // getToken
    function getToken(){
        var ck = document.cookie;
        return ck;
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
    // getTokenpid&pid
    function getTokenpid(url,ck,callback){
        const k = /id\/(.*?)\/tid/;
        var pi = url.match(k);//pi[1] pid
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                var a;
                a = this.responseText;
                const b = /var vp4tokenpid = "(.*?)";var/;
                var result = a.match(b);
                var ti = result ? result[1] : null
                console.log(pi[1],ti);
                callback(pi[1],ti,Nobi);
            }
        });
        xhr.open("GET", url);
        xhr.setRequestHeader("Cookie", ck);
        xhr.send();
    };
    // getPaper 返回json题库
    function getPaper(pid,tid,callback){
        var url = "https://examcoo.com/editor/rpc/getpapercontent/pid/"+pid+"/tokenpid/"+tid+"/fromAction/view";
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                callback(this.responseText);
            }
        });
        xhr.open("GET", url);
        xhr.send();
    }// ==UserScript==
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

    // getToken
    function getToken(){
        var ck = document.cookie;
        return ck;
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
    // getTokenpid&pid
    function getTokenpid(url,ck,callback){
        const k = /id\/(.*?)\/tid/;
        var pi = url.match(k);//pi[1] pid
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                var a;
                a = this.responseText;
                const b = /var vp4tokenpid = "(.*?)";var/;
                var result = a.match(b);
                var ti = result ? result[1] : null
                console.log(pi[1],ti);
                callback(pi[1],ti,Nobi);
            }
        });
        xhr.open("GET", url);
        xhr.setRequestHeader("Cookie", ck);
        xhr.send();
    };
    // getPaper 返回json题库
    function getPaper(pid,tid,callback){
        var url = "https://examcoo.com/editor/rpc/getpapercontent/pid/"+pid+"/tokenpid/"+tid+"/fromAction/view";
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                callback(this.responseText);
            }
        });
        xhr.open("GET", url);
        xhr.send();
    }
    //Nobi
    let tk = [];
    function Nobi(re){
        tk = tk.concat(re);
        console.log(tk);
    };

    // Nobita
    function Nobita(){
        var c = getToken();
        let hl = getHref();
        for (var i = 0; i < hl.length; i++){
            var h = "https://examcoo.com" + hl[i];
            getTokenpid(h,c,getPaper);
        };

        console.log("结果：",tk);
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
    //Nobi
    let tk = [];
    function Nobi(re){
        tk = tk.concat(re);
        console.log(tk);
    };

    // Nobita
    function Nobita(){
        var c = getToken();
        let hl = getHref();
        for (var i = 0; i < hl.length; i++){
            var h = "https://examcoo.com" + hl[i];
            getTokenpid(h,c,getPaper);
        };

        console.log("结果：",tk);
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
    // div
    var debugDiv = document.createElement('div');
    debugDiv.style.cssText = 'position: fixed; top: 0; left: 0; background-color： #fff; color: #000; font-size: 16px; z-index: 9999; padding: 10px;';
    document.body.appendChild(debugDiv);
    function debug(msg){
        if (debugDiv){
            debugDiv.innerHTML += msg + '<br>';
        }
    };
})();
