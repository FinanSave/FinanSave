param(
    [string]$casoDeTeste = "*.robot"
)

# Obtendo o diretório base para os logs
$logsDir = "..\tests\logs"
$arq_e2e = $PWD.Path

# Criando um dicionário para armazenar os casos de teste processados
$casosProcessados = @{}

# Obtendo a lista de arquivos .robot no diretório atual
$listaArquivos = Get-ChildItem -Path $arq_e2e -Filter "*.robot" -File

foreach ($arquivo in $listaArquivos) {
    $pastaUC = $arquivo.Directory.Parent.Name
    $pastaSpecificUC = $arquivo.Directory.Name
    $nomeArquivo = $arquivo.BaseName  # Obtendo o nome do arquivo sem a extensão

    # Verificando se o caso de teste já foi processado
    if ($casosProcessados.ContainsKey($nomeArquivo)) {
        Write-Host "O caso de teste '$nomeArquivo' já foi processado. Ignorando..."
        continue  # Ignorando o caso de teste
    }

    # Verificando se o nome do arquivo corresponde ao padrão especificado
    if (-not ($nomeArquivo -like $casoDeTeste)) {
        Write-Host "O caso de teste '$nomeArquivo' não corresponde ao caso especificado '$casoDeTeste'. Ignorando..."
        continue  # Ignorando o caso de teste
    }

    # Adicionando o caso de teste ao dicionário de casos processados
    $casosProcessados[$nomeArquivo] = $true

    # Construindo o caminho para a pasta de logs do caso de uso e caso de teste
    $outputPath = Join-Path -Path $logsDir -ChildPath "$pastaUC\$pastaSpecificUC\$nomeArquivo"

    # Criando a pasta se não existir
    if (-not (Test-Path $outputPath)) {
        New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
    }

    # Executando os testes com o Robot Framework usando o valor definido anteriormente
    python -m robot -d $outputPath --listener RetryFailed $arquivo.FullName
}

