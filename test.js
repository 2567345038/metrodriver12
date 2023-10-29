// ==UserScript==
// @name         Nobita Auto Answer
// @namespace    nobita-auto-answer
// @version      1.0
// @description  自动答题脚本，适用于examcoo网站的在线考试平台
// @author       Your Name
// @match        https://www.examcoo.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/2567345038/metrodriver12/main/Nobita.js', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = xhr.responseText;
    // 处理响应数据
    var res = response;
  }
};
xhr.send();

  // 删除字符串中的空格、换行符和特殊字符
  function delN(s) {
    try {
      s = s.replace(/&nbsp;/g, '');
    } catch (e) {}
    try {
      s = s.replace(/\xa0/g, '');
    } catch (e) {}
    try {
      s = s.replace(/\r/g, '');
    } catch (e) {}
    try {
      s = s.replace(/\n/g, '');
    } catch (e) {}
    try {
      s = s.replace(/ /g, '');
    } catch (e) {}
    return s;
  }

  // 获取指定字符的第二个出现位置之前的所有字符
  function get_chars_before_second_occurrence(string, target_char) {
    var first_index = string.indexOf(target_char);
    var second_index = string.indexOf(target_char, first_index + 1);

    if (first_index == -1 || second_index == -1) {
      return null;
    }

    return string.substring(0, second_index);
  }

  // 自动答题函数
  function autoAnswer() {
    console.log("开始答题");
    var totalPath = "//*[@id=\"end\"]/span[1]";
    var pNum = document.evaluate(totalPath, document, null, XPathResult.STRING_TYPE, null).stringValue;
    console.log("总题数:", pNum);
    for (var i = 0; i < parseInt(pNum); i++) {
      var pidPath = "/html/body/div[2]/div[2]/div/div[2]/div[" + (4 + i) + "]/div[1]/div[1]";
      var pall = document.evaluate(pidPath, document, null, XPathResult.STRING_TYPE, null).stringValue;
      var pid = get_chars_before_second_occurrence(pall, "_");
      var data = JSON.parse(res)[pid];
      var tx = data['题型'];
      var ans = data['ans'];
      var a = 0, b = 0, c = 0, d = 0;
      if (tx == "判断题") {
        if (ans == "1") {
          a = 1;
        }
        if (ans == "2") {
          b = 1;
        }
      } else {
        var se = data['se'];
        var a0 = delN(se['a']);
        var b0 = delN(se['b']);
        var c0 = delN(se['c']);
        var d0 = delN(se['d']);
        var ansInt = parseInt(ans);
        var daList = "正确答案：";
        if (ansInt - 8 >= 0) {
          daList = daList + d0;
          ansInt = ansInt - 8;
        }
        if (ansInt - 4 >= 0) {
          daList = daList + c0;
          ansInt = ansInt - 4;
        }
        if (ansInt - 2 >= 0) {
          daList = daList + b0;
          ansInt = ansInt - 2;
        }
        if (ansInt - 1 >= 0) {
          daList = daList + a0;
          ansInt = ansInt - 1;
        }
        console.log(daList);
        var a1Path = "/html/body/div[2]/div[2]/div/div[2]/div[" + (4 + i) + "]/div[2]/div[1]/div[2]";
        var a2Path = "/html/body/div[2]/div[2]/div/div[2]/div[" + (4 + i) + "]/div[2]/div[2]/div[2]";
        var a3Path = "/html/body/div[2]/div[2]/div/div[2]/div[" + (4 + i) + "]/div[2]/div[3]/div[2]";
        var a4Path = "/html/body/div[2]/div[2]/div/div[2]/div[" + (4 + i) + "]/div[2]/div[4]/div[2]";
        var a1 = delN(document.evaluate(a1Path, document, null, XPathResult.STRING_TYPE, null).stringValue);
        var a2 = delN(document.evaluate(a2Path, document, null, XPathResult.STRING_TYPE, null).stringValue);
        var a3 = delN(document.evaluate(a3Path, document, null, XPathResult.STRING_TYPE, null).stringValue);
        var a4 = delN(document.evaluate(a4Path, document, null, XPathResult.STRING_TYPE, null).stringValue);
        if (a1.includes(daList)) {
          a = 1;
        }
        if (a2.includes(daList)) {
          b = 1;
        }
        if (a3.includes(daList)) {
          c = 1;
        }
        if (a4.includes(daList)) {
          d = 1;
        }
      }
      var aId = pid + "_" + (i + 1) + "_option_0_btn";
      var bId = pid + "_" + (i + 1) + "_option_1_btn";
      var cId = pid + "_" + (i + 1) + "_option_2_btn";
      var dId = pid + "_" + (i + 1) + "_option_3_btn";
      if (a == 1) {
        document.getElementById(aId).click();
      }
      if (b == 1) {
        document.getElementById(bId).click();
      }
      if (c == 1) {
        document.getElementById(cId).click();
      }
      if (d == 1) {
        document.getElementById(dId).click();
      }
    }
  }
  var button = document.createElement('button');
  button.innerHTML = '自动答题';
  button.style.position = 'fixed';
  button.style.top = '10px';
  button.style.right = '10px';
  button.style.zIndex = '9999';
  button.onclick = function() {
    autoAnswer();
  };

  // 将按钮添加到页面中
  document.body.appendChild(button);
})();