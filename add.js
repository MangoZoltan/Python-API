function sendPost(){
  const data = JSON.stringify({
    rendszam : document.getElementById("rendszam").value,
    tulaj    : document.getElementById("tulaj").value,
    tipus    : document.getElementById("tipus").value,
    modell   : document.getElementById("modell").value,
    evjarat  : document.getElementById("evjarat").value,
    muszaki  : document.getElementById("muszaki").value
  });

  navigator.sendBeacon('http://127.0.0.1:5000/savedetails/', data);
  console.log(data);
}