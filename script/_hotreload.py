from playwright.sync_api import sync_playwright, TimeoutError
from playwright.sync_api._generated import Page
import time
import sys

sys.path.append("..")

from hstr import *
from hplaywrightExtended import ExtendedLocator, ExtendedPage

def function1(self):
    p: ExtendedPage = self.p
    phoneNumberId = p.locatorId("phoneNumberId")
    if phoneNumberId.displayed():
        print("phone")
    time.sleep(2)




