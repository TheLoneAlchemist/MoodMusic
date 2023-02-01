
function loadingbutton(loading, elemID) {
    if (loading == true) {
        let load = document.getElementById(elemID);
        load.removeAttribute('class');
        load.setAttribute('disabled', 'true');
        load.setAttribute('class', 'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2');
        load.textContent = null;


        let loadsvg = document.getElementById('loadsvg');
        loadsvg.removeAttribute('hidden')
        loadsvg.setAttribute('aria-hidden', 'true');
        loadsvg.setAttribute('role', 'status');
        loadsvg.setAttribute('class', 'inline w-4 h-4 mr-3 text-white animate-spin');
        loadsvg.setAttribute('viewBox', '0 0 100 101');
        loadsvg.setAttribute('fill', 'none');
        loadsvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        let svgpath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgpath1.setAttribute('d', 'M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z');
        svgpath1.setAttribute('fill', '#E5E7EB');
        let svgpath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgpath2.setAttribute('d', 'M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z');
        svgpath2.setAttribute('fill', 'currentColor');
        loadsvg.appendChild(svgpath1);
        loadsvg.appendChild(svgpath2);
        load.appendChild(loadsvg);
        load.appendChild(document.createTextNode('Loading...'));

    }
    else if (loading == false) {
        let loadsvg = document.getElementById('loadsvg');
        let loadbtn = document.getElementById(elemID);
        loadbtn.parentElement.appendChild(loadsvg)
        loadbtn.innerText = 'Load More';
        loadbtn.removeAttribute('disabled');
        loadbtn.setAttribute('class', 'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2');
        
        
        loadsvg.removeAttribute('aria-hidden');
        loadsvg.removeAttribute('role');
        loadsvg.removeAttribute('class');
        loadsvg.removeAttribute('viewBox');
        loadsvg.removeAttribute('fill');
        loadsvg.removeAttribute('xmlns');
        $('#loadsvg').empty();
        loadsvg.setAttribute('hidden','hidden')
        loadbtn.parentElement.appendChild(loadsvg);

    }
}


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









