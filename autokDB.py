import sqlite3

con = sqlite3.connect("autok.db")
print("Adatbázis elindult")

con.execute("create table cars (id INTEGER PRIMARY KEY AUTOINCREMENT, rendszam TEXT NOT NULL, tulaj TEXT NOT NULL, tipus TEXT NOT NULL, modell TEXT NOT NULL, evjarat TEXT NOT NULL, muszaki TEXT NOT NULL)")
print("Tábla létrehozva")

con.close()