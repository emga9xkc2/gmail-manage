from playwright.sync_api import sync_playwright, TimeoutError
from playwright.sync_api._generated import Page
import time
import sys

sys.path.append("..")

from hstr import *
from hrand import *
from hplaywrightExtended import ExtendedLocator, ExtendedPage

def f1(self):

    p: ExtendedPage = self.p
    for i in range(2):
        time.sleep(1)
        return
        url = p.url
        if "https://accounts.google.com/signin/v2/disabled/appeal/additionalinformation" in url:
            textarea = p.locatorSelector("textarea")
            if textarea.is_visible():
                content = hrand.randomItemInList(self.restoredisablecontent)
                textarea.type(content, press="Enter")
                textarea.waitHidden(10)
        elif "https://accounts.google.com/signin/v2/disabled/appeal/confirmation" in url:
            return
        elif "https://accounts.google.com/signin/v2/disabled/appeal/contactaddress" in url:
            input = p.locatorSelector('input[type="email"]')
            if input.is_visible():
                newmail = self.user.split("@")[0] + "@hotmail.com"
                input.type(newmail, press="Enter")
                input.waitHidden(10)
        else:
            batdaukhieunai = p.locatorSelector(".VfPpkd-vQzf8d").first
            if batdaukhieunai.is_visible():
                batdaukhieunai.click()
        time.sleep(2)




