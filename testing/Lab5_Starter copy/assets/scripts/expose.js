// expose.js

window.addEventListener('DOMContentLoaded', init);
const jsConfetti = new JSConfetti();

function init() {
  let horn = document.querySelector("[name='horn']");
  let image = document.querySelector("[alt='No image selected']");
  let audio = document.querySelector("[class='hidden']");
  let button = document.querySelector("button");
  let slider = document.getElementById("volume-controls");

  horn.addEventListener('input', function(){
   if (horn.value == 'air-horn'){
      image.src = 'assets/images/air-horn.svg';
      audio.src = 'assets/audio/air-horn.mp3';
   }else if (horn.value == 'car-horn'){
      image.src = 'assets/images/car-horn.svg';
      audio.src = 'assets/audio/car-horn.mp3';
   }else{
      image.src = 'assets/images/party-horn.svg';
      audio.src = 'assets/audio/party-horn.mp3';
   }
  });

  slider.addEventListener('input', function(){
    let vol = document.querySelector("[type='range']");
    let volImg = document.querySelector("[alt='Volume level 2']");
    if (vol.value >= 67){
      volImg.src = 'assets/icons/volume-level-3.svg';
    }else if (vol.value >= 33){
      volImg.src = 'assets/icons/volume-level-2.svg';
    }else if (vol.value > 0){
      volImg.src = 'assets/icons/volume-level-1.svg';
    }else{
      volImg.src = 'assets/icons/volume-level-0.svg';
    }
    audio.volume = vol.value / 100.0;
  });

  button.addEventListener('click', function(){
    if (horn.value != 'select'){
      audio.play();
      if (horn.value == 'party-horn' && audio.volume > 0){
        jsConfetti.addConfetti();
      }
    }
  });

}
