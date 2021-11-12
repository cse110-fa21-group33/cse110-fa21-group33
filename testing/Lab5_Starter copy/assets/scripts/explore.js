// explore.js

window.addEventListener('DOMContentLoaded', init);


function init() {
  var synth = window.speechSynthesis;
  var options = document.getElementById("voice-select");
  var image = document.querySelector('img');
  setTimeout(() => {
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++){
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      option.value = i;
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      options.appendChild(option);
    }
    var button = document.querySelector('button');
    var text = document.getElementById('text-to-speak');
    options.addEventListener('change', () => {
    });

    button.addEventListener('click', () => {
      if (options.value == 'select'){
        return;
      }
      var utterance = new SpeechSynthesisUtterance(text.value);
      utterance.voice = voices[options.value];

      utterance.addEventListener('start', () => {
        image.src = 'assets/images/smiling-open.png';
      });

      utterance.addEventListener('end', () => {
        image.src = 'assets/images/smiling.png';
      });

      synth.speak(utterance);

    });

  }, 100);
}

