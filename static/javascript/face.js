
var base64_image = null;
console.log("starting app");

(function () {
    var width = 320;
    var height = 0;
    var streaming = false;
    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (error) {
                console.log("Error Stream: " + error)
            });

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAtrribute('width', width);
                video.setAtrribute('height', height);
                canvas.setAtrribute('width', width);
                canvas.setAtrribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function (ev) {
            console.log("Capturing image")

            takepicture();
            ev.preventDefault();
        }, false);
        clearphoto();
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {

        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            document.getElementById('imgstring').value = canvas.toDataURL()
            base64_image = canvas.toDataURL()
        }
        else {
            clearphoto();
        }
    }
    startup()




})()

console.log($('input[name = csrfmiddlewaretoken]').val())
$(document).on('submit', '#post-form', function (e) {
    console.log("________________________________________")
    if ($('#heading')) {
        document.getElementById('loadnext').hidden == true;
        $('#heading').empty();
    }

    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "/music/getemotion",
        headers: { "X-CSRFToken": $('input[name = csrfmiddlewaretoken]').val() },
        caches: false,
        data: {

            image64: $('#imgstring').val(),
        },
        success: function (data) {
            $('#notify').removeAttr('hidden')
            console.log('json response of getemotion: ', data)

            if (data['emotion']) {
                $('#emotionNotify').text(data['emotion'])
                $('#loadnext').removeAttr('hidden')
                console.log(data['emotion'])
            }
            
            if (data['songs']) {
                const datajson = JSON.parse(data['songs'])
                console.log(datajson)
                heading();
                for (const key in datajson) {
                    if (Object.hasOwnProperty.call(datajson, key)) {
                        const element = datajson[key];
                        createsong(element);
                        ButtonListenFunc();
                    }
                }

                 
            }

            if (data == '') {
                $('#msg').html('Empty data from server reponse! ');
                
                setTimeout(() => {
                    document.getElementById('notify').hidden = true;
                    console.log("hidding");
                }, 10000);
            } else {
                $('#msg').html(data);
                setTimeout(() => {
                    document.getElementById('notify').hidden = true;
                    console.log("hidding");
                }, 7000);
            }
        },
        error: function () {
            $('#msg').html("something wrong happened!");
            console.log("Response Error::","Something went wrong!...")
        }
    })


});
