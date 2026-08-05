const targetLat = 34.136598;
const targetLon = -118.352926;


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


    const distance = calculateDistance(
        userLat,
        userLon,
        targetLat,
        targetLon
    );


    const distanceBox =
    document.getElementById("distance");


    let bars = "";


    if(distance > 300){

        bars = "▮□□□□";

    }

    else if(distance > 100){

        bars = "▮▮▮□□";

    }

    else if(distance > 30){

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

        document.getElementById("status").innerHTML =
        "WATCHTOWER SIGNAL FOUND";

        document.getElementById("message").innerHTML =
        "Vertical signal detected.<br>" +
        "Begin final ascent.";

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
