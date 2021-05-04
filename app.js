const songList = document.getElementById('Song-list');
loadEventListeners();

function loadEventListeners() {
  //Reloading page
  document.addEventListener('DOMContentLoaded', getSongs);
  // Removing songs
  songList.addEventListener('click', removeSong, true);
  songList.addEventListener('click', openSong, true);

}
function videoUpload() {
  var URL = document.getElementById("URL").value;
  if (URL === '') {
    alert("Please Enter URL");
  }
  var splitURL = URL.split("?")[1].split("&")[0].split("=")[1]
  document.getElementById("iFrameTag").src = embedCode(splitURL);
  
}

function embedCode(splitURL) {
  return `https://www.youtube.com/embed/${splitURL}`
}



function addSongName() {
  var songName = document.getElementById('Song-name').value;
  var URL = document.getElementById("URL").value;

  //again splitting the URL to save it inside Song name method 
  var splitURL = URL.split("?")[1].split("&")[0].split("=")[1];
  const embedURL = embedCode(splitURL);

  if (songName === '') {
    alert("Please Enter Song Name")
  }



  const songList = document.getElementById('Song-list');
  const li = document.createElement('li');
  li.className = 'Song-list-item';
  console.log(songName)
  li.appendChild(document.createTextNode(songName));
  li.style.backgroundColor = '#fff';
  li.style.marginRight = '20px';
  li.style.marginBottom = '20px';
  li.style.padding = '5px';
  li.style.border = '1px solid'
  li.style.cursor = 'pointer'
  //for delete icon
  const link = document.createElement('a');
  link.className = 'delete-song';
  link.innerHTML = '<i class="fas fa-times"></i>'
  link.style.float = 'right';
   link.style.marginTop = '-8px';
  li.appendChild(link);
  console.log(li);

  songList.appendChild(li);

  //Storing Song names in Local Storage
  storeSongInLocalStorage(songName, embedURL);

  document.getElementById("Song-name").value = '';
  document.getElementById("URL").value = '';
}
function openSong(e) {
  if (e.target.classList.contains('Song-list-item')) {
    var songName = e.target.textContent;
    console.log(`You clicked on song ${songName} `);
    const allSongs = JSON.parse(localStorage.getItem('songs'));
    const sIndex = allSongs.findIndex(o => o.name === songName);
    localStorage.setItem('lastPlayed', JSON.stringify({ name: songName, url: allSongs[sIndex].url }))
    document.getElementById('iFrameTag').src = allSongs[sIndex].url;

  }
}

//function for removing a song
function removeSong(e) {
  if (e.target.parentElement.classList.contains('delete-song')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      removeSongFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

}

function removeSongFromLocalStorage(songItem) {
  let songs;
  if (localStorage.getItem('songs') === null) {
    songs = [];
  }
  else {
    songs = JSON.parse(localStorage.getItem('songs'));
  }
  for (var index = 0; index < songs.length; index++) {
    if (songs[index].name === songItem.textContent) {
      songs.splice(index, 1);
    }
  }
  localStorage.setItem('songs', JSON.stringify(songs))


}



//Storing Song names (this function stores the song name to local storage but doesn't store it to the UI)
function storeSongInLocalStorage(song, url) {
  let songs;
  if (localStorage.getItem('songs') === null) {
    songs = [];
  }
  else {
    songs = JSON.parse(localStorage.getItem('songs'));
  }
  songs.push({ name: song, url: url });
  localStorage.setItem('songs', JSON.stringify(songs));
}


//  Getting songs and the last video from Local Storage to display on UI 
function getSongs() {
  console.log("Inside getSongs");
  let songs;
  let lastPlayed;
  if (localStorage.getItem('songs') === null) {
    songs = [];
  }
  else {
    songs = JSON.parse(localStorage.getItem('songs'));
  }
  songs.forEach(songName => {
    const songList = document.getElementById('Song-list');
    const li = document.createElement('li');
    li.className = 'Song-list-item';
    li.appendChild(document.createTextNode(songName.name));
    li.style.backgroundColor = '#fff';
    li.style.marginRight = '20px';
    li.style.marginBottom = '20px';
    li.style.padding = '5px';
    li.style.border = '1px solid'
    li.style.cursor = 'pointer'


    //for delete icon
    const link = document.createElement('a');
    link.className = 'delete-song';
    link.innerHTML = '<i class="fas fa-times"></i>'
    link.style.float = 'right';
    link.style.marginTop = '-8px';
    li.appendChild(link);
    songList.appendChild(li);
  });
  if (localStorage.getItem('lastPlayed') === null) {
    lastPlayed = [];
  }
  else {
    lastPlayed = JSON.parse(localStorage.getItem('lastPlayed'));
  }
  document.getElementById('iFrameTag').src = lastPlayed.url;

}
