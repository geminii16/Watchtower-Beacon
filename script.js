const targetLatitude = 34.1603303;
const targetLongitude = -118.4494499;


function activateBeacon() {

    document.getElementById("status").innerHTML =
    "SIGNAL AWAKENED";


    document.getElementById("message").innerHTML =
    "SEARCHING...";


    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showLocation);

    } else {

        document.getElementById("message").innerHTML =
        "LOCATION UNAVAILABLE";

    }

}



function showLocation(position) {


    let playerLatitude = position.coords.latitude;

    let playerLongitude = position.coords.longitude;


    let distance = calculateDistance(
        playerLatitude,
        playerLongitude,
        targetLatitude,
        targetLongitude
    );


    let bearing = calculateBearing(
        playerLatitude,
        playerLongitude,
        targetLatitude,
        targetLongitude
    );


    let direction = getDirection(bearing);



    document.getElementById("status").innerHTML =
    "TARGET LOCKED";


    document.getElementById("message").innerHTML =
    "RANGE<br>" +
    distance.toFixed(0) +
    " m<br><br>" +
    "BEARING<br>" +
    direction;


    document.getElementById("arrow").innerHTML =
    "↑";

}




function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const p1 = lat1 * Math.PI / 180;

    const p2 = lat2 * Math.PI / 180;

    const dLat =
    (lat2-lat1) * Math.PI / 180;

    const dLon =
    (lon2-lon1) * Math.PI / 180;


    let a =
    Math.sin(dLat/2) *
    Math.sin(dLat/2) +
    Math.cos(p1) *
    Math.cos(p2) *
    Math.sin(dLon/2) *
    Math.sin(dLon/2);


    let c =
    2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1-a)
    );


    return R*c;

}





function calculateBearing(lat1, lon1, lat2, lon2) {


    let y =
    Math.sin(
        (lon2-lon1) *
        Math.PI/180
    )
    *
    Math.cos(
        lat2 *
        Math.PI/180
    );


    let x =
    Math.cos(
        lat1 *
        Math.PI/180
    )
    *
    Math.sin(
        lat2 *
        Math.PI/180
    )
    -
    Math.sin(
        lat1 *
        Math.PI/180
    )
    *
    Math.cos(
        lat2 *
        Math.PI/180
    )
    *
    Math.cos(
        (lon2-lon1) *
        Math.PI/180
    );


    let bearing =
    Math.atan2(y,x)
    *
    180/Math.PI;


    return (bearing+360)%360;

}





function getDirection(degrees) {


    if (degrees < 22.5 || degrees >=337.5)
    return "NORTH";

    if (degrees <67.5)
    return "NORTHEAST";

    if (degrees <112.5)
    return "EAST";

    if (degrees <157.5)
    return "SOUTHEAST";

    if (degrees <202.5)
    return "SOUTH";

    if (degrees <247.5)
    return "SOUTHWEST";

    if (degrees <292.5)
    return "WEST";


    return "NORTHWEST";

}
