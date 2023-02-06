$(document).on('submit', '#load', function (e) {
    console.log('loading next page...');
    loadingbutton(true, 'loadbtn');
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "/music/play",
        dataType: 'json',
        headers: { "X-CSRFToken": $('input[name = csrfmiddlewaretoken]').val() },
        cache: false,
        data: {
            emotion: $('#emotionNotify').text(),
            page: $('input[name = pagenumber]').val(),
        },
        success: function (data) {
            loadingbutton(false, 'loadbtn');

            console.log("success response...", data);
            if (data['songs']) {
                if (data['songs'] == "NoMoreSong") {
                    $('#notify').removeAttr('hidden');
                    $('#msg').html(data['songs']);
                    console.log('No More song');
                    setTimeout(() => {
                        document.getElementById('notify').hidden = true;
                        console.log("hidding");
                    }, 7000);
                }
                else {
                    const datajson = JSON.parse(data['songs'])
                    console.log(datajson)
                    for (const key in datajson) {
                        if (Object.hasOwnProperty.call(datajson, key)) {
                            const element = datajson[key];
                            createsong(element);
                            ButtonListenFunc();

                        }
                    }
                }
            }
            let page = $('input[name = pagenumber]').val();

            let updatepage = (parseInt(page) + 1);

            console.log(updatepage);
            $('input[name = pagenumber]').val(updatepage);

        },
        error: function (data) {
            $('#notify').removeAttr('hidden');
            $('#msg').html(data);
            setTimeout(() => {
                document.getElementById('notify').hidden = true;
            }, 7000);
            console.log("Error", data)
        }
    })
})
