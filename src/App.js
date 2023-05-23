import './App.css';
import { useState } from 'react';
import Loader from './Loader';


function App() {
  const [state,setState] = useState(false);
  function startRecognition(){
    console.log("Active");
    recognition.start();
    setState(true);
  };
  
  function endRecognition(){
    console.log("Unactive");
    recognition.stop();
    setState(false);
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition()

  recognition.continuous = true;

  recognition.onresult = async function(event){
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(transcript);
    speakThis(transcript);

  };

  function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello sir";
        speech.text = finalText;
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine sir tell me how can i help you";
        speech.text = finalText;
    }

    else if(message.includes('what is your name')) {
        const finalText = "My name is Iris";
        speech.text = finalText;
    }

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speech.text = finalText
    }

    else if(message.includes('open wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }
    else if(message.includes('turn off') || message.includes('shut down')) {
      endRecognition();
      const finalText = "Shutting Down";
      speech.text = finalText;
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
    }

  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);
}
  return (
    <div className="App">
      <div class = "main">
        <h1 class = "text-main"> This is IRIS </h1>
        <Loader/>
        <noscript>You need java script</noscript>
        <button onClick={state ? endRecognition : startRecognition} class="button-46">{state ? 'Stop':'Start'}</button>
      </div>
    </div>
  );
}

export default App;
