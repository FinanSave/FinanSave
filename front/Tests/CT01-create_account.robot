*** Settings ***
Library    SeleniumLibrary
Library    String   

*** Variables ***
${URL}         http://localhost:3000
${BROWSER}     Chrome
${FIRST_NAME}  John
${LAST_NAME}   Doe
${PASSWORD}    123456
# Variáveis aleatórias serão geradas no teste

*** Test Cases ***
Create A New Account
    [Documentation]    Teste para criar uma nova conta no sistema Finansave.
    
    # Gera username e email aleatórios
    ${RANDOM_STRING}=    Generate Random String    10    [LETTERS]
    ${USERNAME}=    Set Variable    user_${RANDOM_STRING}
    ${EMAIL}=    Set Variable    ${RANDOM_STRING}@email.com
    
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    
    # Espera para garantir que o botão "Criar Conta" esteja visível e clica nele
    Wait Until Element Is Visible    xpath=/html/body/div/header/div/div[2]/div/button[1]
    Scroll Element Into View    xpath=/html/body/div/header/div/div[2]/div/button[1]
    Click Button    xpath=/html/body/div/header/div/div[2]/div/button[1]
    
    # Aguarda o carregamento do formulário
    Sleep    3s
    
    # Preenche os campos do formulário de criação de conta
    Wait Until Element Is Visible    xpath=//*[@id="firstName"]
    Input Text    xpath=//*[@id="firstName"]    ${FIRST_NAME}
    
    Input Text    xpath=//*[@id="lastName"]     ${LAST_NAME}
    Input Text    xpath=//*[@id="username"]     ${USERNAME}
    Input Text    xpath=//*[@id="password"]     ${PASSWORD}
    Input Text    xpath=//*[@id="email"]        ${EMAIL}
    
    # Marca a checkbox de maioridade
    Wait Until Element Is Visible    xpath=//*[@id="isAdult"]
    Click Element    xpath=//*[@id="isAdult"]
    
    # Clica no botão "Cadastrar"
    Wait Until Element Is Visible    xpath=//button[text()='Cadastrar']
    Scroll Element Into View    xpath=//button[text()='Cadastrar']
    Click Button    xpath=//button[text()='Cadastrar']
    
    # Verifica se foi redirecionado para a página de login
    Wait Until Page Contains Element    xpath=//h1[text()='Fazer login']

    # Fecha o navegador
    [Teardown]    Close Browser
