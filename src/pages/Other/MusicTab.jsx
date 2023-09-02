import React, { useRef, useEffect, useCallback, useMemo } from "react";
import useLoader from "../../Hooks/useLoader";

export default function MusicTab() {
  useLoader();
  const allMusic = useMemo(
    () => [
      {
        name: "Harley Bird - Home",
        artist: "Jordan Schor",
        img: "music-1",
        src: "music-1",
      },
      {
        name: "Ikson Anywhere - Ikson",
        artist: "Audio Library",
        img: "music-2",
        src: "music-2",
      },
      {
        name: "Beauz & Jvna - Crazy",
        artist: "Beauz & Jvna",
        img: "music-3",
        src: "music-3",
      },
      {
        name: "Hardwind - Want Me",
        artist: "Mike Archangelo",
        img: "music-4",
        src: "music-4",
      },
      {
        name: "Jim - Sun Goes Down",
        artist: "Jim Yosef x Roy",
        img: "music-5",
        src: "music-5",
      },
      {
        name: "Lost Sky - Vision NCS",
        artist: "NCS Release",
        img: "music-6",
        src: "music-6",
      },
    ],
    []
  );
  const wrapper = useRef(); //
  const musicImg = useRef(); //
  const musicName = useRef(); //
  const musicArtist = useRef(); //
  const playPauseBtn = useRef(); //
  const mainAudio = useRef(); //
  const progressArea = useRef(); //
  const progressBar = useRef(); //
  const musicList = useRef(); //
  const repeatBtn = useRef(); //
  const moreMusicBtn = useRef(); //
  let ulTag;
  let musicIndex = Math.floor(Math.random() * allMusic.length + 1);

  const loadMusic = useCallback(
    (indexNumb) => {
      musicName.current.innerText = allMusic[indexNumb - 1].name;
      musicArtist.current.innerText = allMusic[indexNumb - 1].artist;
      musicImg.current.src = require(`../../static/Images/MusicThumbnails/${
        allMusic[indexNumb - 1].src
      }.jpg`);
      mainAudio.current.src = require(`../../static/Other/${
        allMusic[indexNumb - 1].src
      }.mp3`);
    },
    [allMusic]
  );

  //play music function
  function playMusic() {
    wrapper.current.classList.add("paused");
    playPauseBtn.current.querySelector("i").innerText = "pause";
    mainAudio.current.play();
  }

  //pause music function
  function pauseMusic() {
    wrapper.current.classList.remove("paused");
    playPauseBtn.current.querySelector("i").innerText = "play_arrow";
    mainAudio.current.pause();
  }

  //prev music function
  function prevMusic() {
    musicIndex--; //decrement of musicIndex by 1
    //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
    let mi = musicIndex;
    musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = mi);
    loadMusic(musicIndex);
    playMusic();
    playingSong();
  }

  //next music function
  function nextMusic() {
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    // eslint-disable-next-line
    musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingSong();
  }

  // play or pause button event
  function playPauseMusic() {
    const isMusicPlay = wrapper.current.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
  }

  // update progress bar width according to music current time
  function timeUpdate(e) {
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.current.querySelector(".current-time"),
      musicDuartion = wrapper.current.querySelector(".max-duration");
    mainAudio.current.addEventListener("loadeddata", () => {
      // update song total duration
      let mainAdDuration = mainAudio.current.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if (totalSec < 10) {
        //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  }

  // update playing song currentTime on according to the progress bar width
  function updateMusic(e) {
    let progressWidth = progressArea.current.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.nativeEvent.offsetX; //getting offset x value
    let songDuration = mainAudio.current.duration; //getting song total duration

    mainAudio.current.currentTime =
      (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); //calling playMusic function
    playingSong();
  }

  //change loop, shuffle, repeat icon onclick
  function repeatActions() {
    let getText = repeatBtn.current.innerText; //getting this tag innerText
    switch (getText) {
      case "repeat":
        repeatBtn.current.innerText = "repeat_one";
        repeatBtn.current.setAttribute("title", "Song looped");
        break;
      case "repeat_one":
        repeatBtn.current.innerText = "shuffle";
        repeatBtn.current.setAttribute("title", "Playback shuffled");
        break;
      case "shuffle":
        repeatBtn.current.innerText = "repeat";
        repeatBtn.current.setAttribute("title", "Playlist looped");
        break;
      default:
        break;
    }
  }

  //code for what to do after song ended
  function songEnded() {
    // we'll do according to the icon means if user has set icon to
    // loop song then we'll repeat the current song and will do accordingly
    let getText = repeatBtn.current.innerText; //getting this tag innerText
    switch (getText) {
      case "repeat":
        nextMusic(); //calling nextMusic function
        break;
      case "repeat_one":
        mainAudio.current.currentTime = 0; //setting audio current time to 0
        loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
        playMusic(); //calling playMusic function
        break;
      case "shuffle":
        let randIndex = Math.floor(Math.random() * allMusic.length + 1); //genereting random index/numb with max range of array length
        do {
          randIndex = Math.floor(Math.random() * allMusic.length + 1);
        } while (musicIndex === randIndex); //this loop run until the next random number won't be the same of current musicIndex
        musicIndex = randIndex; //passing randomIndex to musicIndex
        loadMusic(musicIndex);
        playMusic();
        playingSong();
        break;
      default:
        break;
    }
  }

  //show music list onclick of music icon
  function showMusicList() {
    musicList.current.classList.toggle("show");
  }
  function hideMusicList() {
    moreMusicBtn.current.click();
  }

  //play particular song from the list onclick of li tag
  const playingSong = useCallback(() => {
    const allLiTag = ulTag.querySelectorAll("li");

    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".audio-duration");

      if (allLiTag[j].classList.contains("playing")) {
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }

      //if the li tag index is equal to the musicIndex then add playing class in it
      if (allLiTag[j].getAttribute("li-index") === musicIndex) {
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "Playing";
      }
    }
    
  }, [musicIndex, ulTag]);
  
  useEffect(() => {
    loadMusic(musicIndex);
    ulTag = document.querySelector("ul.musicList");
    playingSong();
    window.onload = 
    window.addEventListener("keypress",(e)=>{
      // console.log(e.key);
      if(e.key === " "){
        console.log("Music started");
        playPauseBtn.current.click();
      }
    });
    document.querySelector(".scroll-to-top").innerHTML = "";
  }, [loadMusic, musicIndex, playingSong]);

  return (
    <div className=" musicTab">
      <div className="wrapper" ref={wrapper}>
        <div className="top-bar">
          <i className="material-icons">expand_more</i>
          <span>Enjoy Mellow Tunes!</span>
          <i className="material-icons">more_horiz</i>
        </div>
        <div className="img-area">
          <img src="" alt="" ref={musicImg} />
        </div>
        <div className="song-details">
          <p className="name" ref={musicName}></p>
          <p className="artist" ref={musicArtist}></p>
        </div>
        <div className="progress-area" onClick={updateMusic} ref={progressArea}>
          <div className="progress-bar" ref={progressBar}>
            <audio
              id="main-audio"
              src=""
              ref={mainAudio}
              onTimeUpdate={timeUpdate}
              onEnded={songEnded}
            ></audio>
          </div>
          <div className="song-timer">
            <span className="current-time">0:00</span>
            <span className="max-duration">0:00</span>
          </div>
        </div>
        <div className="controls">
          <i
            id="repeat-plist"
            className="material-icons"
            title="Playlist looped"
            ref={repeatBtn}
            onClick={repeatActions}
          >
            repeat
          </i>
          <i id="prev" className="material-icons" onClick={prevMusic}>
            skip_previous
          </i>
          <div
            className="play-pause"
            ref={playPauseBtn}
            onClick={playPauseMusic}
          >
            <i className="material-icons play">play_arrow</i>
          </div>
          <i id="next" className="material-icons" onClick={nextMusic}>
            skip_next
          </i>
          <i
            id="more-music"
            className="material-icons"
            ref={moreMusicBtn}
            onClick={showMusicList}
          >
            queue_music
          </i>
        </div>
        <div className="music-list" ref={musicList}>
          <div className="header">
            <div className="row">
              <i className="list material-icons">queue_music</i>
              <span>Music list</span>
            </div>
            <i id="close" className="material-icons" onClick={hideMusicList}>
              close
            </i>
          </div>
          <ul className="musicList">
            {allMusic.map((music, id) => (
              <li
                li-index={id + 1}
                onClick={(e) => {
                  let getLiIndex = e.target.getAttribute("li-index");
                  musicIndex = getLiIndex; //updating current song index with clicked li index
                  loadMusic(musicIndex);
                  playMusic();
                  playingSong();
                }}
                key={id}
              >
                <div className="row">
                  <span>{music.name}</span>
                  <p>{music.artist}</p>
                </div>
                <span id={music.src} className="audio-duration">
                  3:40
                </span>
                <audio
                  className={music.src}
                  src={require(`../../static/Other/${music.src}.mp3`)}
                  onLoadedData={() => {
                    let liAudioTag = document.querySelector(`.${music.src}`);
                    let liAudioDuartionTag = document.querySelector(
                      `#${music.src}`
                    );

                    let duration = liAudioTag.duration;
                    let totalMin = Math.floor(duration / 60);
                    let totalSec = Math.floor(duration % 60);
                    if (totalSec < 10) {
                      //if sec is less than 10 then add 0 before it
                      totalSec = `0${totalSec}`;
                    }
                    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
                    liAudioDuartionTag.setAttribute(
                      "t-duration",
                      `${totalMin}:${totalSec}`
                    ); //adding t-duration attribute with total duration value
                  }}
                ></audio>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
