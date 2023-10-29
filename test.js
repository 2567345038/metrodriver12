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

  // 创建一个用于显示调试输出的div
  var debugDiv = document.createElement('div');
  debugDiv.style.cssText = 'position: fixed; top: 0; left: 0; background-color: #fff; color: #000; font-size: 16px; z-index: 9999; padding: 10px;';
  document.body.appendChild(debugDiv);

  // 定义一个函数，用于将调试信息输出到debugDiv
  function debug(msg) {
    if (debugDiv) {
      debugDiv.innerHTML += msg + '<br>';
    }
  }

  // 添加一个全局的错误处理函数，用于捕获和报告运行时错误
  window.onerror = function (message, url, line, column, error) {
    debug(`出错啦：${message}<br>文件：${url}<br>行号：${line}<br>列号：${column}<br>错误详情：${error}`);
    return true; // 返回true表示阻止浏览器默认的错误处理行为
  };

  // 获取题目数据
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://raw.githubusercontent.com/2567345038/metrodriver12/main/Nobita.js', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      autoAnswer(data);
    }
  };
  xhr.send();

  // 删除字符串中的空格、换行符和特殊字符
  function delN(s) {
    return s.replace(/[\s\xa0]/g, '');
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
  function autoAnswer(data) {
    debug(`开始答题，共 ${data.length} 题`);
    for (var i = 0; i < data.length; i++) {
      var question = data[i];
      var tx = question['题型'];
      var ans = question['ans'];
      var a = 0, b = 0, c = 0, d = 0;

      if (tx == "判断题") {
        if (ans == "1") {
          a = 1;
        }
        if (ans == "2") {
          b = 1;
        }
      } else {
        var se = question['se'];
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
        debug(daList);
        var options = [
          delN(document.getElementById(`${question.id}_option_0`).textContent),
          delN(document.getElementById(`${question.id}_option_1`).textContent),
          delN(document.getElementById(`${question.id}_option_2`).textContent),
          delN(document.getElementById(`${question.id}_option_3`).textContent)
        ];
        if (options[0].includes(daList)) {
          a = 1;
        }
        if (options[1].includes(daList)) {
          b = 1;
        }
        if (options[2].includes(daList)) {
          c = 1;
        }
        if (options[3].includes(daList)) {
          d = 1;
        }
      }

      if (a == 1) {
        document.getElementById(`${question.id}_option_0_btn`).click();
      }
      if (b == 1) {
        document.getElementById(`${question.id}_option_1_btn`).click();
      }
      if (c == 1) {
        document.getElementById(`${question.id}_option_2_btn`).click();
      }
      if (d == 1) {
        document.getElementById(`${question.id}_option_3_btn`).click();
      }
    }
  }

  // 创建一个按钮，用于触发自动答题
  var button = document.createElement('button');
  button.innerHTML = '自动答题';
  button.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999;';
  button.onclick = function() {
    autoAnswer();
  };

  // 将按钮添加到页面中
  document.body.appendChild(button);
})();
