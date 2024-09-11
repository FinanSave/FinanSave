*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}         http://localhost:3000
${BROWSER}     Chrome
${USERNAME}    123@gmail.com
${PASSWORD}    123123

*** Test Cases ***
Fazer Login Com Nova Conta
    [Documentation]    Teste para fazer login no sistema Finansave.
    
    # Abre o navegador e navega para a URL
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    
    # Clica no botão "Fazer login"
    Wait Until Element Is Visible    xpath=/html/body/div/header/div/div[2]/div/button[2]
    Click Element    xpath=/html/body/div/header/div/div[2]/div/button[2]
    
    # Preenche os campos de login
    Wait Until Element Is Visible    xpath=//*[@id="login"]
    Input Text    xpath=//*[@id="login"]     ${USERNAME}
    Input Text    xpath=//*[@id="senha"]     ${PASSWORD}
    
    # Clica no botão "Entrar"
    Wait Until Element Is Visible    xpath=/html/body/div/div/div/form/button
    Click Element    xpath=/html/body/div/div/div/form/button
    
    # Verifica se o login foi bem-sucedido
    Wait Until Page Contains Element    xpath=/html/body/div/section[3]/button[6]
    Sleep    1s

    # Fecha o navegador
    [Teardown]    Close Browser
