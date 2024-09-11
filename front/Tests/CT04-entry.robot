*** Settings ***
Library    SeleniumLibrary
Library    String   

*** Variables ***
${URL}         http://localhost:3000
${BROWSER}     Chrome
${FIRST_NAME}  John
${LAST_NAME}   Doe
${PASSWORD}    123456
${NAME}    Teste 1
${VALUE}    2500
${DATA}    25/08/2024
${MESSAGE}    Mensagem de teste 1
${CATEGORY}    Outros
${BALANCE}    600000
${SPENDING_LIMIT}    320000
${SAVING_GOAL}    480000
${SALDO_ATUAL}  R$ 6000.00
# Variáveis aleatórias serão geradas no teste

*** Test Cases ***
Add entry
    [Documentation]    Test para registrar e rmeover entrada no sistema Finansave.
    
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

    # Preenche os campos de login
    Input Text    xpath=//*[@id="login"]     ${USERNAME}
    Input Text    xpath=//*[@id="senha"]     ${PASSWORD}
    
    # Clica no botão "Entrar"
    Wait Until Element Is Visible    xpath=/html/body/div/div/div/form/button
    Click Element    xpath=/html/body/div/div/div/form/button
    
    # Verifica se o login foi bem-sucedido
    Wait Until Page Contains Element    xpath=/html/body/div/section[3]/button[6]
    Sleep    1s

    # Criar orçamento

    Click Button    xpath=/html/body/div/section[3]/button[1]

    Sleep    2s

    Wait Until Element Is Visible    xpath=/html/body/div/div/div/h1

    Input Text    xpath=//*[@id="saldo"]    ${BALANCE}
    Input Text    xpath=//*[@id="limite"]    ${SPENDING_LIMIT}  
    Input Text    xpath=//*[@id="metaEconomia"]    ${SAVING_GOAL}

    Click Button    xpath=/html/body/div/div/div/form/button

    Sleep    1s

    Wait Until Element Is Visible    xpath=/html/body/div/div[2]/div/div/button[1]
    Click Button    xpath=/html/body/div/div[2]/div/div/button[1]

    Sleep    2s

    Click Button    xpath=/html/body/div/section[3]/button[1]

    # CHECAR SE ATUALIZOU NA TELA PRINCIPAL

    Sleep    2s

    Wait Until Page Contains    ${SALDO_ATUAL}    timeout=5s

    Click Button    xpath=/html/body/div/section[3]/button[3]

    Sleep    2s

    Wait Until Element Is Visible    xpath=/html/body/div/section/button[1]
    Click Button    xpath=/html/body/div/section/button[1]

    # Preenche os campos do formulário
    Input Text    xpath=//*[@id="name"]     ${NAME}
    Input Text    xpath=//*[@id="entryAmount"]    ${VALUE}
    
    # Marcar checkbox "Recorrente" e "Quer ser lembrado" se desejado
    Click Element    xpath=//*[@id="recorrente"]

    # Preenche a Data da Entrada
    Input Text    xpath=//*[@id="entryDate"]     ${DATA}
    
    # Seleciona a Categoria no dropdown
    Select From List By Label    xpath=//*[@id="category"]    ${CATEGORY}
    
    # Preenche a mensagem (se houver)
    Input Text    xpath=//*[@id="mensagem"]    ${MESSAGE}

    # Clica no botão "Confirmar Entrada"
    Click Element    xpath=/html/body/div/div[1]/div/form/div[7]/button[2]

    Sleep    2s

    # Fecha o navegador
    [Teardown]    Close Browser
