*** Settings ***
Library         ExcelLibrary
Library         SeleniumLibrary
Library         Collections
Library         DateTime
Resource        ../3_variables/Variables.robot

*** Keywords ***

#-------            OPEN AND CLOSE OF THE EXCEL DOCUMENT            -------
Open the excel document
    Open Excel Document        ${EXCEL_LOCATION}//UltimateQA_TestCases.xlsx        doc_id=1

Close the excel document
    Close Current Excel Document




#---------------        GET COUNT OF THE DATA        ------------------
#Get the ROW COUNT
#    [Arguments]    ${sheet_name}
#    Close Current Excel Document
#    Open the excel document
#    ${TEMP_ROW_DATA}    Create List
#    @{list}    ExcelLibrary.Read Excel Column    col_num=1    sheet_name=${sheet_name}
#    FOR    ${data}    IN    @{list}
#           Exit For Loop If    "${data}"=="${None}"
#           IF    'ID' in '${data}'
#                   Log    Doesn't count
#           ELSE
#                   Append To List        ${TEMP_ROW_DATA}        ${data}
#           END
#    END
#    ${count}    Get Length    ${TEMP_ROW_DATA}
#    RETURN    ${count}
#    Close Current Excel Document
#
#Get the COLUMN COUNT
#    [Arguments]    ${sheet_name}
#    Close Current Excel Document
#    Open the excel document
#    ${column_data}    Create List
#    @{list}    ExcelLibrary.Read Excel Row    row_num=1    sheet_name=${sheet_name}
#    FOR    ${data}    IN    @{list}
#           Exit For Loop If    "${data}"=="${None}"
#           Append To List        ${column_data}    ${data}
#    END
#    ${count}    Get Length    ${column_data}
#    RETURN    ${count}
#    Close Current Excel Document

Get the ROW NUMBER
    [Arguments]    ${sheet_name}    ${row_title}
    Set Local Variable    ${row_count}      1
    @{list}    ExcelLibrary.Read Excel Column    col_num=1    row_offset=0    max_num=100    sheet_name=${sheet_name}
    FOR    ${data}    IN    @{list}
        Log    ${data}
#        Exit For Loop If    "${data}"=="${None}"
        IF    "${data}"!="${row_title}"
            ${row_count}    Evaluate    int(${row_count}) + int(1)
        ELSE
            Exit For Loop
        END
    END
    RETURN    ${row_count}

#-------            READ THE ROW DATA            --------
Get the ROW DATA
    Close Current Excel Document
    Open the excel document
    ${row_num}    Get the ROW NUMBER    Test_Cases    TC05
    @{column}    ExcelLibrary.Read Excel Row    row_num=1    sheet_name=Test_Cases
    @{list}    ExcelLibrary.Read Excel Row    row_num=${row_num}    sheet_name=Test_Cases
    @{final_list}    Create List        ${column}    ${list}
    Log List    ${final_list}
    RETURN    ${final_list}
    Close Current Excel Document

#-------            CREATE RESULT            --------
Create Test Result
    Create Excel Document    doc_id=2
    Save Excel Document        filename=${RESULT_DIR}//results.xlsx
    Close Current Excel Document