import sqlite3
from pathlib import Path

# links sqlite
# https://sqlite.org/doclist.html
# https://tableplus.com/blog/2018/07/sqlite-how-to-use-datetime-value.html

ROOT_DIR = Path(__file__).parent
DB_NAME = 'DB.FinanSave'
DB_FILE = ROOT_DIR / DB_NAME

connection = sqlite3.connect(DB_FILE)
connection.execute('PRAGMA foreign_keys = ON;')
cursor = connection.cursor() # atraves do cursor sao feitas operacoes de CRUD no DB

cursor.execute(
    'CREATE TABLE IF NOT EXISTS ORCAMENTO('
    'ID_usuario INTEGER,'
    'ID_orcamento INTEGER PRIMARY KEY AUTOINCREMENT,'
    'saldo REAL,'
    'limite_gasto REAL,'
    'meta_economia REAL'
    ')'
)

cursor.execute(
    'CREATE TABLE IF NOT EXISTS MOVIMENTACAO (' # cria tabela movimentacao caso ela nao exista
    'ID_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,'
    'ID_orcamento INTEGER,'
    # 'FOREIGN KEY(ID_orcamento) REFERENCES ORCAMENTO(ID_orcamento),'
    'categoria TEXT,'
    'tipo TEXT,'
    'descricao TEXT,'
    'valor REAL,'
    'data TEXT,' # SQLite nao possui tipo date, necessario usar formato YYYY-MM-DD HH:MM:SS.SSS
    'quer_ser_lembrado INTEGER,' # nao possui boolean, 1 = true e 0 = false
    'recorrente INTEGER'
    ')'
)

connection.commit()

cursor.close()
connection.close()