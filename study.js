// ==UserScript==
// @name         ExamCoo Auto Answer
// @namespace    examcoo-auto-answer
// @version      1.0
// @description  自动答题脚本 for ExamCoo
// @match        https://www.examcoo.com/editor/do/exam/id/2715400/tid/4166824/sa/0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    async function Nobi() {
        // 获取题目总数
        var totalQuestionCount = parseInt(document.evaluate("p1", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText);
        //解码
        function jm(num) {
              const binaryStr = num.toString(2).padStart(4, '0');
              const correctAnswers = [];

        if (binaryStr.charAt(0) === '1') {
    correctAnswers.push("A");
  }
  if (binaryStr.charAt(1) === '1') {
    correctAnswers.push("B");
  }
  if (binaryStr.charAt(2) === '1') {
    correctAnswers.push("C");
  }
  if (binaryStr.charAt(3) === '1') {
    correctAnswers.push("D");
  }

  return correctAnswers;
}

// 开始答题
for (var questionNumber = 0; questionNumber < totalQuestionCount; questionNumber++) {
  // 获取题目ID
  var questionId = document.evaluate("/html/body/div[2]/div[2]/div/div[2]/div[" + (questionNumber + 3) + "]/div[1]/div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute("id").split("_")[1];

  // 获取题目数据
  var questionData = Nobita[questionId];

  // 判断题
  if (questionData.tx === "t") {
    // 选择按钮 A 或 B
    if (questionData.ans === "1") {
      var aId = questionId + "_" + (questionNumber + 1) + "_option_0_btn";
      document.getElementById(aId).click();
    } else if (questionData.ans === "2") {
      var bId = questionId + "_" + (questionNumber + 1) + "_option_1_btn";
      document.getElementById(bId).click();
    }
  } else {
    // 非判断题
    var correctAnswers = jm(questionData.ans); // 获取正确答案
    var optionTexts = {
      "A": document.evaluate("/html/body/div[2]/div[2]/div/div[2]/div[" + (questionNumber + 3) + "]/div[2]/div[1]/div[1]/label", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText.trim(),
      "B": document.evaluate("/html/body/div[2]/div[2]/div/div[2]/div[" + (questionNumber + 3) + "]/div[2]/div[2]/div[1]/label", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText.trim(),
      "C": document.evaluate("/html/body/div[2]/div[2]/div/div[2]/div[" + (questionNumber + 3) + "]/div[2]/div[3]/div[1]/label", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText.trim(),
      "D": document.evaluate("/html/body/div[2]/div[2]/div/div[2]/div[" + (questionNumber + 3) + "]/div[2]/div[4]/div[1]/label", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText.trim()
    };
    for (var i = 0; i < correctAnswers.length; i++) {
      for (var option in optionTexts) {
        if (optionTexts[option] === correctAnswers[i]) {
          var optionId = questionId + "_" + (questionNumber + 1) + "_option_" + (parseInt(option) - 1) + "_btn";
          document.getElementById(optionId).click();
          break;
        }
      }
    }
  }
}

    }


    var button = document.createElement("button");
    button.textContent = "点击开始自动答题";
    button.style.backgroundColor = "blue";
    button.style.color = "white";
    button.style.position = "fixed"
    button.style.top = "10px"
    button.style.right = "10px"
    button.style.zIndex = "9999"
    button.addEventListener("click",Nobi);
    document.body.appendChild(button);

})();