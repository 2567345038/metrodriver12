import winreg
import os
from selenium import  webdriver 
from selenium.webdriver.common.by import By
import json
import requests

def tk():
    url = "u"
    payload={}
    headers = {
    'Cache-Control': 'no-cache',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return(response.text)


def delN(s):
    try:
        s = s.replace('&nbsp;','')
    except:
        s = s
    try:
        s = s.replace(u'\xa0','')
    except:
        s = s
    try:        
        s = s.replace('\r','')
    except:
        s = s
    try:
        s = s.replace('\n','')
    except:
        s = s
    try:
        s = s.replace(' ','')
    except:
        s = s
    return(s)


def get_chars_before_second_occurrence(string, target_char):
    first_index = string.find(target_char)  # 找到第一个指定字符的索引
    second_index = string.find(target_char, first_index + 1)  # 找到第二个指定字符的索引

    if first_index == -1 or second_index == -1:
        return None  # 如果没有找到指定字符或只找到一个字符，则返回 None

    return string[:second_index]  # 返回第二个指定字符之前的字符


def Nobita():
    print("开始答题")
    totalPath = "//*[@id=\"end\"]/span[1]"
    pNum = driver.find_element(By.XPATH,totalPath).text
    print("总题数:",pNum)


    for i in range(int(pNum)):
        pidPath = "/html/body/div[2]/div[2]/div/div[2]/div["+str(4+i)+"]/div[1]/div[1]"
        pidall = driver.find_element(By.XPATH,pidPath).get_attribute('id')
        pid = get_chars_before_second_occurrence(pidall,"_")
        da = json.load(nbt)
        dat = da[pid]
        tx = dat['题型']
        ans = dat['ans']
        if tx == "判断题":
            if ans == "1":
                a = 1
                b = 0
                c = 0
                d = 0
            if ans == "2":
                b = 1
                a = 0
                c = 0
                d = 0
        if tx != "判断题":
            se = dat['se']
            a0 = delN(se['a'])
            b0 = delN(se['b'])
            c0 = delN(se['c'])
            d0 = delN(se['d'])
            ansInt = int(ans)
            daList = "正确答案："
            if ansInt - 8 >=0:
                daList = daList + d0
                ansInt = ansInt -8
            if ansInt - 4 >=0:
                daList = daList + c0
                ansInt = ansInt -4
            if ansInt - 2 >=0:
                daList = daList + b0
                ansInt = ansInt -2
            if ansInt - 1 >=0:
                daList = daList + a0
                ansInt = ansInt - 1
                if ansInt != 0:
                    continue
            print(daList)
            a1Path = "/html/body/div[2]/div[2]/div/div[2]/div["+str(4+i)+"]/div[2]/div[1]/div[2]"
            a2Path = "/html/body/div[2]/div[2]/div/div[2]/div["+str(4+i)+"]/div[2]/div[2]/div[2]"
            a3Path = "/html/body/div[2]/div[2]/div/div[2]/div["+str(4+i)+"]/div[2]/div[3]/div[2]"
            a4Path = "/html/body/div[2]/div[2]/div/div[2]/div["+str(4+i)+"]/div[2]/div[4]/div[2]"
            try:
                a1 = delN(driver.find_element(By.XPATH,a1Path).text)
            except:
                a1 = "NoneS"
            try:
                a2 = delN(driver.find_element(By.XPATH,a2Path).text)
            except:
                a2 = "NoneS"
            try:
                a3 = delN(driver.find_element(By.XPATH,a3Path).text)
            except:
                a3 = "NoneS"
            try:
                a4 = delN(driver.find_element(By.XPATH,a4Path).text)
            except:
                a4 = "NoneS"

            if a1 in str(daList):
                a = 1
            else:
                a = 0
            if a2 in str(daList):
                b = 1
            else:
                b = 0
            if a3 in str(daList):
                c = 1
            else:
                c = 0
            if a4 in str(daList):
                d = 1
            else:
                d = 0
        aId = str(pid)+"_"+str(i+1)+"_option_0_btn"
        bId = str(pid)+"_"+str(i+1)+"_option_1_btn"
        cId = str(pid)+"_"+str(i+1)+"_option_2_btn"
        dId = str(pid)+"_"+str(i+1)+"_option_3_btn"
        if a == 1:
            driver.find_element(By.ID,aId).click()
        if b == 1:
            driver.find_element(By.ID,bId).click()
        if c == 1:
            driver.find_element(By.ID,cId).click()
        if d == 1:
            driver.find_element(By.ID,dId).click()


url = "https://www.examcoo.com/usercenter"
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches',['enable-logging'])
driver = webdriver.Chrome(options=options)
driver.get(url) 
nbt = tk()
Nobita()
