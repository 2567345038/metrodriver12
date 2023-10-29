import winreg
import os
import configparser
import random
from selenium import  webdriver 
from selenium.webdriver.common.by import By
import time
import json

def getChromeVersion():
    key = winreg.OpenKey(winreg.HKEY_CURRENT_USER,r'Software\Google\Chrome\BLBeacon')
    chrome_version = winreg.QueryValueEx(key,'version')[0]
    return chrome_version

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
'''
    try:
        s = s.replace('.','')
    except:
        s = s
'''
    
def get_chars_before_second_occurrence(string, target_char):
    first_index = string.find(target_char)  
    second_index = string.find(target_char, first_index + 1)  

    if first_index == -1 or second_index == -1:
        return None  

    return string[:second_index]  


def Nobita():
    print("开始答题")
    totalPath = "//*[@id=\"end\"]/span[1]"
    pNum = driver.find_element(By.XPATH,totalPath).text
    print("总题数:",pNum)
    for i in range(int(pNum)):
        pidPath = "/html/body/div[2]/div[2]/div/div[2]/div["+str(4+i)+"]/div[1]/div[1]"
        pall = driver.find_element(By.XPATH,pidPath).get_attribute('id')
        pid = get_chars_before_second_occurrence(pall,"_")
        with open("Nobita.json","r",encoding="utf-8") as file:
            da = json.load(file)
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


print("chrome浏览器版本要求:98.0.4758.102")
chromeVrsion = getChromeVersion()
print("当前chrome浏览器版本:",chromeVrsion)
chromeNeed = "98.0.4758.102"
if chromeVrsion == chromeNeed:
    print("版本正确")
    cv = 1
if chromeVrsion != chromeNeed:
    print("版本错误，请将chrome浏览器卸载并安装98.0.4758.102版本")
    cv = 0

if cv == 0:
    print("出错啦")
    os.system("pause")
if cv == 1:
    url = "https://www.examcoo.com/usercenter"
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches',['enable-logging'])
    driver = webdriver.Chrome(options=options)
    driver.get(url) 
    print("请手动登录，登录完成再继续下一步")
    os.system('pause')
    window = driver.current_window_handle
    windows = driver.window_handles
    driver.switch_to.window(windows[1])
    Nobita()
    try:
        
        os.system('pause')
    except:
        print("错误！")
        os.system('pause')