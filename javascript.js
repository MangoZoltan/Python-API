var url = "http://127.0.0.1:5000/view";
var id = "view";

async function generator(url, id) {
  var request = await new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    view(data, request, id);
  }

  request.send()
}

function view(data, request, id){
  if(id == "view"){
    if (request.status >= 200 && request.status < 400) {
      data.forEach((query) => {
        console.log(request.status);
        var div = document.createElement("tr");
        var mainContainer = document.getElementById(id);
        div.innerHTML = 
        "<td>"+query.id+"</td>"+
        "<td><input id='rendszam"+query.id+"' placeholder='"+query.rendszam+"' value='"+query.rendszam+"'/></td>"+
        "<td><input id='tulaj"+query.id+"'    placeholder='"+query.tulaj+"'    value='"+query.tulaj+"'/></td>"+
        "<td><input id='tipus"+query.id+"'    placeholder='"+query.tipus+"'    value='"+query.tipus+"'/></td>"+
        "<td><input id='modell"+query.id+"'   placeholder='"+query.modell+"'   value='"+query.modell+"'/></td>"+
        "<td><input id='evjarat"+query.id+"'  placeholder='"+query.evjarat+"'  value='"+query.evjarat+"'/></td>"+
        "<td><input id='muszaki"+query.id+"'  placeholder='"+query.muszaki+"'  value='"+query.muszaki+"'/></td>"+
        "<td><button class='btn btn-danger'   onclick = 'deleterecord("+query.id+")' type = 'submit' value='Submit'>Törlés</button>"+
        "<button class='btn btn-warning ml-2' onclick = 'update("+query.id+")'       >Módosít</button></td>";
        mainContainer.appendChild(div)
      })
    } else {
      console.log('Hiba!')
    }
  }
}

async function generate_html(){
  await generator(url, id);
}

//Törlés az adatbázisból
function deleterecord(id){
  const data = JSON.stringify({
    id: parseInt(id)
  });

  navigator.sendBeacon('http://127.0.0.1:5000/deleterecord/', data);
  console.log(data);
}

//Az adatbázis frissítése
function update(id){
  const data = JSON.stringify({
    id: id,
    rendszam : document.getElementById("rendszam"+id).value,
    tulaj    : document.getElementById("tulaj"+id).value,
    tipus    : document.getElementById("tipus"+id).value,
    modell   : document.getElementById("modell"+id).value,
    evjarat  : document.getElementById("evjarat"+id).value,
    muszaki  : document.getElementById("muszaki"+id).value
  });

  navigator.sendBeacon('http://127.0.0.1:5000/updatedetails/', data);
  console.log(data);
}

generate_html();