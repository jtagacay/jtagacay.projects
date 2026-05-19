*** Settings ***
Resource        ../1_productObj/Home.robot

*** Keywords ***
Validate the home page
    Given Home page title
    Then Home page categories