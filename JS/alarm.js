const btn = document.getElementById('btn');
const inp = document.getElementById('inp');
var audio = new Audio('audio/sound.mp3');
// console.log(btn, inp);

btn.addEventListener('click', setAlarm);
let alarmDate;
let timeToAlarm;
const regex = /([0-9]){4}-([0-9]){1,2}-([0-9]){1,2} ([0-9]){1,2}:([0-9]){1,2}:([0-9]){1,2}/;



function setAlarm() {
    alarmDate = new Date(inp.value);
    // console.log(`Setting alarm for ${alarmDate}`);
    const now = new Date();

    timeToAlarm = alarmDate - now;
    // console.log(`Time remaining: ${timeToAlarm}`);
    if (!regex.test(inp.value)) {
        inp.classList.add('is-invalid');
    }
    else if(timeToAlarm > 0) {
        showNotification();
        setTimeout(() => {
            ringBell();
        }, timeToAlarm);
    }

}

function ringBell() {
    audio.play();
    // console.log('played');
    $('#alert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success!</strong> Your alarm has been Rung.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`);
}

$(document).ready(() => {

    $('#inp').blur(() => {
        str = inp.value;
        let result = regex.test(str);
        if (result) {
            $('#inp').removeClass('is-invalid');
            $('#inp').addClass('is-valid');
        }
        else {
            $('#inp').addClass('is-invalid');
        }
    })

    setInterval(() => {
        const currentTime = new Date();
        let formattedTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

        $("#italicTime").text(formattedTime);
    }, 1000);

});


function showNotification() {
    $('#set').text(`Setting alarm for ${alarmDate}`);
    $('#remaining').text(`Time remaining: ${timeToAlarm} milliseconds`);
    setTimeout(() => {
        $('#set').fadeOut(3000);
        $('#remaining').fadeOut(3000);
    }, 1000);
}
