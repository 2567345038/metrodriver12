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
    function ud(c){
        displayBox.textContent = c;
    }

    function delN(s) {
        try {
            s = s.replace('&nbsp;', '');
        } catch {
            s = s;
        }
        try {
            s = s.replace('\xa0', '');
        } catch {
            s = s;
        }
        try {
            s = s.replace('\r', '');
        } catch {
            s = s;
        }
        try {
            s = s.replace('\n', '');
        } catch {
            s = s;
        }
        try {
            s = s.replace(' ', '');
        } catch {
            s = s;
        }
        return s;
    }

    function getOptionText(xpath) {
        try {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return delN(element.textContent);
        } catch {
            return "NoneS";
        }
    }

    async function Nobita() {
        setTimeout(function(){
            console.log("2")
        },2000)
        const totalPath = '//*[@id="end"]/span[1]';
        const pNum = document.evaluate(totalPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;

        for (const i of Array(parseInt(pNum)).keys()) {
            const pidPath = `/html/body/div[2]/div[2]/div/div[2]/div[${4 + i}]/div[1]/div[1]`;
            const pid = document.evaluate(pidPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('id').substring(0, 21);
            const {题型, ans, se} = da[pid];
            let a = 0, b = 0, c = 0, d = 0;
            if (题型 === "判断题") {
                a = ans === "1" ? 1 : 0;
                b = ans === "2" ? 1 : 0;
            } else {
                const {a: optionA, b: optionB, c: optionC, d: optionD} = se;
                const a0 = delN(optionA);
                const b0 = delN(optionB);
                const c0 = delN(optionC);
                const d0 = delN(optionD);
                let ansInt = parseInt(ans);
                let daList = "正确答案：";
                if (ansInt - 8 >= 0) {
                    daList += d0;
                    ansInt -= 8;
                }
                if (ansInt - 4 >= 0) {
                    daList += c0;
                    ansInt -= 4;
                }
                if (ansInt - 2 >= 0) {
                    daList += b0;
                    ansInt -= 2;
                }
                if (ansInt - 1 >= 0) {
                    daList += a0;
                    ansInt -= 1;
                    if (ansInt !== 0) {
                        continue;
                    }
                }
                ud(daList)
                const a1Path = `/html/body/div[2]/div[2]/div/div[2]/div[${4 + i}]/div[2]/div[1]/div[2]`;
                const a2Path = `/html/body/div[2]/div[2]/div/div[2]/div[${4 + i}]/div[2]/div[2]/div[2]`;
                const a3Path = `/html/body/div[2]/div[2]/div/div[2]/div[${4 + i}]/div[2]/div[3]/div[2]`;
                const a4Path = `/html/body/div[2]/div[2]/div/div[2]/div[${4 + i}]/div[2]/div[4]/div[2]`;

                const a1 = getOptionText(a1Path);
                const a2 = getOptionText(a2Path);
                const a3 = getOptionText(a3Path);
                const a4 = getOptionText(a4Path);

                a = daList.includes(a1) ? 1 : 0;
                b = daList.includes(a2) ? 1 : 0;
                c = daList.includes(a3) ? 1 : 0;
                d = daList.includes(a4) ? 1 : 0;
            }

            const aId = `${pid}_${i + 1}_option_0_btn`;
            const bId = `${pid}_${i + 1}_option_1_btn`;
            const cId = `${pid}_${i + 1}_option_2_btn`;
            const dId = `${pid}_${i + 1}_option_3_btn`;

            if (a === 1) {
                document.getElementById(aId).click();
            }
            if (b === 1) {
                document.getElementById(bId).click();
            }
            if (c === 1) {
                document.getElementById(cId).click();
            }
            if (d === 1) {
                document.getElementById(dId).click();
            }
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var da
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        da = JSON.parse(xhr.responseText);
    }
    });

    xhr.open("GET", "https://raw.githubusercontent.com/2567345038/metrodriver12/main/Nobita.json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
    xhr.setRequestHeader("Connection", "keep-alive");

    xhr.send();

    var button = document.createElement("button");
    button.textContent = "点击开始自动答题";
    button.style.backgroundColor = "blue";
    button.style.color = "white";
    button.style.position = "fixed"
    button.style.top = "10px"
    button.style.right = "10px"
    button.style.zIndex = "9999"
    button.addEventListener("click",Nobita);
    document.body.appendChild(button);

    var displayBox = document.createElement("div");
    displayBox.style.position = "fixed";
    displayBox.style.top = "20px";
    displayBox.style.right = "10px";
    displayBox.style.width = "200px";
    displayBox.style.height = "100px";
    displayBox.style.backgroundColor = "white";
    displayBox.style.border = "1px solid black";
    displayBox.style.padding = "10px";
    displayBox.style.zIndex = "9999";
    document.body.appendChild(displayBox);
})();