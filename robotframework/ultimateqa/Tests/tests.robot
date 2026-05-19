*** Settings ***
Resource    ../Resources/2_testSteps/commonApp.robot
Resource    ../Resources/2_testSteps/homeApp.robot
Resource    ../Resources/5_excel/Excel.robot
Suite Setup    Create Folder

*** Test Cases ***
#Opening the browser and go to the ultimateqa
#    Given Open the Browser and Go To URL
#
#Validate the Home Page
#    Given Validate the home page

Test Excel Only
    Get the ROW DATA
    Create Test Result