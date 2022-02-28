let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;


//lista das musicas
let all_song = [
    {
        name: "Primeira música",
        path: "musicas/song1.mp3",
        img: "imagens/img1.jpg",
        singer: "Primeiro cantor"
    },
    {
        name: "Segunda música",
        path: "musicas/song2.mp3",
        img: "imagens/img2.jpg",
        singer: "Segundo cantor"
    },
    {
        name: "Terceira música",
        path: "musicas/song3.mp3",
        img: "imagens/img3.jpg",
        singer: "Terceiro cantor"
    },
    {
        name: "Quarta música",
        path: "musicas/song4.mp3",
        img: "imagens/img4.jpg",
        singer: "Quarto cantor"
    },
    {
        name: "Quinta música",
        path: "musicas/song5.mp3",
        img: "imagens/img5.jpg",
        singer: "Quinto cantor"
    }
];

//criando elemento de audio
let track = document.createElement('audio');

// todas as funcoes

//funcao carregar a musica
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = all_song[index_no].path;
    title.innerHTML = all_song[index_no].name;
    track_image.src = all_song[index_no].img;
    artist.innerHTML = all_song[index_no].singer;
    track.load();

    total.innerHTML = all_song.length;
    present.innerHTML = index_no + 1;

    timer = setInterval(range_slider , 1000);
}

load_track(index_no);


//mutar o som
function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0
}


//resetar slider
function reset_slider() {
    slider.value = 0
}


// checando se a musica esta tocando
function justplay() {
    if (playing_song === false) {
        playsong();
    } else {
        pausesong();
    }
}

//tocar a musica
function playsong() {
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

//pausar musica 
function pausesong() {
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
}

//proxima musica
function next_song() {
    if (index_no < all_song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = 0;
        load_track(index_no);
        playsong;
    }
}

//musica anterior
function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = all_song.length;
        load_track(index_no);
        playsong;
    }
}

// alterar volume
function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//mudança posição slider
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//funcao do autoplay
function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    } else {
        autoplay = 1;
        auto_play.style.background = "#FF8A65"
    }
}


function range_slider() {
    let position = 0;
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    //funcao para rodar quando a musica acabar
    if (track.ended) {
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (auto_play == 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}