from flask import *
import json
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Adatok lekérése
@app.route("/view")
def view():
    con = sqlite3.connect("autok.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("select * from cars")
    rows = cur.fetchall()
    return json.dumps([dict(ix) for ix in rows])

#Adatok mentése
@app.route("/savedetails/", methods=["POST"])
def saveDetails():
    msg = "msg"
    try:
        data = request.get_json(force=True)
        print(data)
        
        rendszam = data["rendszam"]
        tulaj    = data["tulaj"]
        tipus    = data["tipus"]
        modell   = data["modell"]
        evjarat  = data["evjarat"]
        muszaki  = data["muszaki"]
        with sqlite3.connect("autok.db") as con:
            cur = con.cursor()
            cur.execute("INSERT into cars (rendszam, tulaj, tipus, modell, evjarat, muszaki) values (?,?,?,?,?,?)", (rendszam, tulaj, tipus, modell, evjarat, muszaki))
            con.commit()
            msg = "Autó hozzáadva!"
    except:
        con.rollback()
        msg = "Nem tudjuk ezt az autót hozzáadni a listához!"
    finally:
        return rendszam
        con.close()

#Adatok törlése
@app.route("/deleterecord/", methods=["POST"])
def deleterecord():
    data = request.get_json(force=True)
    id = str(data["id"])
    print(id)
    with sqlite3.connect("autok.db") as con:
        try:
            cur = con.cursor()
            cur.execute("delete from cars where id = ?", id)
            msg = "Feljegyzés kitörölve!"
        except:
            msg = "Feljegyzés nem törölhető!"
        finally:
            return""

#Adatbázis frissítése
@app.route("/updatedetails/", methods=["POST"])
def updaterecord():
    try:
        data = request.get_json(force=True)
        print(data)
        id       = data["id"]
        rendszam = data["rendszam"]
        tulaj    = data["tulaj"]
        tipus    = data["tipus"]
        modell   = data["modell"]
        evjarat  = data["evjarat"]
        muszaki  = data["muszaki"]

        with sqlite3.connect("autok.db") as con:
            cur = con.cursor()
            cur.execute("UPDATE cars SET rendszam=?, tulaj=?, tipus=?, modell=?, evjarat=?, muszaki=? WHERE id=?", (rendszam, tulaj, tipus, modell, evjarat, muszaki, id))
            con.commit()
            msg = "Az autó adatai frissültek!"
    except:
        con.rollback()
        msg = "Sikeretlen adat frissítés."
    finally:
        return msg
        con.close()

if __name__ == "__main__":
    app.run(debug=True)

