function activateBeacon() {

    const status = document.getElementById("status");
    const message = document.getElementById("message");
    const progress = document.getElementById("progress");

    status.innerHTML = "AWAKENING";

    message.innerHTML = "Restoring ancient signal...";

    let steps = [
        "▮□□□□□□□ 20%",
        "▮▮▮□□□□□ 40%",
        "▮▮▮▮▮□□□ 60%",
        "▮▮▮▮▮▮▮□ 80%",
        "▮▮▮▮▮▮▮▮ 100%"
    ];

    let count = 0;

    let timer = setInterval(function(){

        progress.innerHTML = steps[count];

        count++;

        if(count === steps.length){

            clearInterval(timer);

            status.innerHTML = "WATCHTOWER ONLINE";

            message.innerHTML =
            "Explorer transmission detected.<br><br>" +
            "Five memory fragments remain hidden.<br>" +
            "Recover them all to unlock the final sequence.";

        }

    }, 900);

}
