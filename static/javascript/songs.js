function heading() {
    const head = document.getElementById('heading');

    const first = document.createElement('div');
    first.setAttribute('class', 'container mx-auto px-6 py-16');
    const second = document.createElement('div');
    second.setAttribute('class', 'mx-auto sm:w-1/2 lg:w-5/12 xl:w-[30%]');
    const third = document.createElement('div');
    const fourth = document.createElement('h1');
    fourth.setAttribute('class', 'text-3xl');
    fourth.innerText = "Your Music Library";
    const fifth = document.createElement('p');
    fifth.setAttribute('class', 'mt-2 text-gray-600');
    fifth.innerText = "Listen to your favorite one!"
    const sixth = document.createElement('div');
    sixth.setAttribute('class', 'mt-4');
    sixth.setAttribute('id', 'sixth');

    head.appendChild(first);
    first.appendChild(second);
    second.appendChild(third)
    third.appendChild(fourth);
    third.appendChild(fifth);
    second.appendChild(sixth);

}






function createsong(song) {
    const s1div = document.createElement('div');
    s1div.setAttribute('class', 'relative flex flex-col justify-end overflow-hidden rounded-b-xl pt-6');
    const s2div = document.createElement('div');
    s2div.setAttribute('class', 'group relative flex justify-between rounded-xl bg-amber-200 cursor-pointer before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-amber-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100')
    s2div.setAttribute('name','btns');
    const s3div = document.createElement('div');
    s3div.setAttribute('class','relative space-y-1 p-4');

    const title = document.createElement('h4');
    title.setAttribute('class','text-lg text-amber-900');
    title.innerText = song['fields']['title'];
    title.setAttribute('name','titlesrc');

    const s4div = document.createElement('div');
    s4div.setAttribute('class','relative h-6 text-sm text-amber-800');
    
    const artist = document.createElement('span');
    artist.setAttribute('class','transition duration-300 group-hover:invisible group-hover:opacity-0')
    artist.innerText = song['fields']['artist']
    artist.setAttribute('name','artistsrc');

    const audio = document.createElement("source");
    audio.setAttribute('name','mediasource');
    let songsrc = song['fields']['song'];
    const songurl = "http://res.cloudinary.com/depq5oys1/" + songsrc
    audio.src = songurl

    const anchor = document.createElement('a');
    anchor.setAttribute('class','invisible absolute inset-0 flex items-center gap-3 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0');
    anchor.setAttribute('href',songsrc);
    

    const span = document.createElement('span');
    span.innerText = "Listen Now"

    // const svg = document.create

    const image = document.createElement('img');
    image.setAttribute('class','absolute bottom-0 right-6 w-[6rem] transition duration-300 group-hover:scale-[1.4]');
    image.setAttribute('alt',song['fields']['artist']);
    image.setAttribute('name','imgsrc');
    let imagesrc = song['fields']['image'];
    const url = "http://res.cloudinary.com/depq5oys1/" + imagesrc
    image.src = url;

    



    // linkin Elements 
    let h = document.getElementById('sixth');
    h.appendChild(s1div);
    s1div.appendChild(s2div);
    s2div.appendChild(s3div);
    s3div.appendChild(title);
    s3div.appendChild(s4div);
    s4div.appendChild(artist);
    s4div.appendChild(anchor);
    anchor.appendChild(span);
    s2div.appendChild(image);
    s2div.appendChild(audio);


    // update song 
    songlist.push(songurl);
    imagelist.push(url);
    titlelist.push(song['fields']['title']);
    artistlist.push(song['fields']['artist']);
    
    
}