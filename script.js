const surfaceLat = 34.1364166;
const surfaceLon = -118.3525901;

const targetLat = 34.1362667;
const targetLon = -118.3523846;


function activateBeacon() {

    const status = document.getElementById("status");
    const message = document.getElementById("message");

    status.innerHTML = "AWAKENING";

    message.innerHTML =
    "Restoring ancient signal...";

    navigator.geolocation.getCurrentPosition(

        startTracking,

        gpsError

    );

}


function startTracking(position) {

    const status = document.getElementById("status");
    const message = document.getElementById("message");

    status.innerHTML = "WATCHTOWER SEARCH ACTIVE";

    message.innerHTML =
    "Searching for Watchtower signal...";

    updateDistance(position);

    navigator.geolocation.watchPosition(

        updateDistance

    );

}


function updateDistance(position) {

    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;


    const surfaceDistance = calculateDistance(
        userLat,
        userLon,
        surfaceLat,
        surfaceLon
    );

const distance = calculateDistance(
        userLat,
        userLon,
        targetLat,
        targetLon
    );


    const distanceBox =
    document.getElementById("distance");


  let bars = "";

let activeDistance = surfaceDistance > 100 
    ? surfaceDistance 
    : distance;


if(activeDistance > 300){

    bars = "▮□□□□";

}

else if(activeDistance > 100){

    bars = "▮▮▮□□";

}

else if(activeDistance > 30){

        bars = "▮▮▮▮□";

    }

    else {

        bars = "▮▮▮▮▮";

    }


    distanceBox.innerHTML =
    "SIGNAL STRENGTH<br>" +
    bars +
    "<br><br>" +
    Math.round(distance) +
    " ft";


    if(distance < 30){

       if(distance < 75){

    document.getElementById("status").innerHTML =
    "WATCHTOWER SIGNAL FOUND";


    document.getElementById("message").innerHTML =
    "Surface location confirmed.<br><br>" +
    "Vertical signal detected.<br>" +
    "Activate ancient navigation.";

    
    document.getElementById("compass").innerHTML =
    "◈<br>⬆";


    if(navigator.vibrate){

        navigator.vibrate([200,100,300]);

    }

}

    }

}


function calculateDistance(lat1, lon1, lat2, lon2){

    const R = 20902231;

    const dLat =
    (lat2-lat1) *
    Math.PI / 180;

    const dLon =
    (lon2-lon1) *
    Math.PI / 180;


    const a =
    Math.sin(dLat/2) *
    Math.sin(dLat/2) +

    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *

    Math.sin(dLon/2) *
    Math.sin(dLon/2);


    const c =
    2 *
    Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1-a)
    );


    return R*c;

}


function gpsError(){

    document.getElementById("message").innerHTML =
    "Signal unavailable.<br>" +
    "Location access required.";

}
function confirmWatchtower(){

    const status =
    document.getElementById("status");

    const message =
    document.getElementById("message");


    status.innerHTML =
    "WATCHTOWER LOCATED";


    message.innerHTML =
    "Transmission complete.<br><br>" +
    "The Watchtower has awakened.";


    document.getElementById("compass").innerHTML =
    "◈";


    if(navigator.vibrate){

        navigator.vibrate([300,100,300,100,500]);

    }

}
