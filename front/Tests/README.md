## Como executar os testes?

### Requirementos

- [Node.js](https://nodejs.org/)
- NPM
- [Python](https://www.python.org/)
- [Java JDK8](http://www.oracle.com/technetwork/pt/java/javase/downloads/jdk8-downloads-2133151.html)
- [Android Studio](https://developer.android.com/studio?hl=pt-br)
- [Appium Server GUI](https://github.com/appium/appium-desktop/releases/tag/v1.22.3-4) (Appium-Server-GUI-windows-1.22.3-4.exe)

1. Instale o Robot Framework:

```bash
pip install robotframework
pip install robotframework-seleniumlibrary
pip install webdrivermanager
```

### Execução

1. Caso queira executar todos os casos de teste **de um caso de uso em específico**:

* Entre na pasta dos casos de uso que você deseja testar. Digamos que você queira testar o UC000 - ACESSAR APLICATIVO

* Entre na pasta `tests\` e nela, abra o powershell 

Execute o seguinte comando:
```bash
..\.\gerar_logs.ps1 -casoDeTeste "*"
```

2. Caso queira executar algum caso de teste em específico:

* Entre na pasta dos casos de uso que você deseja testar. Digamos que você queira testar o UC000 - ACESSAR APLICATIVO

* Entre na pasta `tests\` e nela, abra o powershell 

Execute o seguinte comando:
```bash
..\.\gerar_logs.ps1 -casoDeTeste "{Nome_do_Arquivo}"
```

Exemplo: 
```bash
..\.\gerar_logs.ps1 -casoDeTeste "CT01-create_account"
```