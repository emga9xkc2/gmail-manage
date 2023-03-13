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
    url = p.url
    if not "https://policies.google.com/terms" in url:
        p.goto("https://policies.google.com/terms?hl=en")
    timestart = time.time()
    while time.time() - timestart < 2:
        try:
            source = p.content()
            country = hstr.regex(source, "Country version:</a>(.*?)</p>").strip()
            if country:
                return  country
        except Exception as e:
            print(e)
        time.sleep(1)
    return "Timeout"




