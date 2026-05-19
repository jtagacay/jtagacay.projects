*** Settings ***
Library        SeleniumLibrary
Resource        ../../Resources/3_variables/Variables.robot

*** Keywords ***
Home page title
    Wait Until Page Contains            Automation Practice
    Wait Until Page Contains            Use your skills to learn how to automate different scenarios

Home page categories
    Page Should Contain        ${HOME_CATEGORIES}[0]
    ${id}            Evaluate        0
    FOR    ${cur_id}    IN    ${HOME_CATEGORIES}
                 Page Should Contain        ${HOME_CATEGORIES}[${id}]
                 ${id}        Evaluate        ${id}+1
    END

#    FOR    ${cat}    IN      ${HOME_CATEGORIES}
#                Page Should Contain        ${cat}
#    END
