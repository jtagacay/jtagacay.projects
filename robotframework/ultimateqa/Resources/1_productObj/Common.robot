*** Settings ***
Library        SeleniumLibrary
Library        ExcelLibrary
Library        DateTime
Library        OperatingSystem
Resource        ../3_variables/Variables.robot

*** Keywords ***
Open Browser
    ${chrome_options}                   Evaluate                    selenium.webdriver.ChromeOptions()
    ${prefs}                            Create Dictionary           credentials_enable_service=${false}
#    Call Method                         ${chrome_options}           add_argument                                        --window-position\=1920,0   #2nd monitor
    Call Method                         ${chrome_options}           add_argument                                        --window-size\=1366,768
    Call Method                         ${chrome_options}           add_experimental_option                             prefs   ${prefs}
    Call Method                         ${chrome_options}           add_argument                                        --disable-infobars
    Call Method                         ${chrome_options}           add_argument                                        --disable-notifications
    Create Webdriver                    Chrome                      options=${chrome_options}
    Maximize Browser Window

Open the url
    Go To                                ${URL}
    Sleep                                ${timer}

Create Folder
    ${curr_date}     Get Current Date        result_format=%d-%m-%Y_%H-%M
    Set Global Variable    ${RESULT_DIR}    ${EXECDIR}/Results/${curr_date}
    Create Directory        ${RESULT_DIR}
    Directory Should Exist    ${RESULT_DIR}


