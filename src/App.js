import './App.css';
import { useEffect, useState} from 'react';
import Loader from './Loader';
import {Response} from './Response';
import sound from "./assets/sound.mp3"
import axios from 'axios';
import React from 'react';

function App() {
  const [state,setState] = useState(false);
  const [answer,setAnswer] = useState("");
  const [prompt,setPrompt] = useState("");
  console.log(state);
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition()
 
  function play(){
    new Audio(sound).play()
  }
  let stoppingR = false;

  function startRecognition(){
    setState((current) => !current);
    recognition.start();
    console.log(state);
    stoppingR = false;
    play();
  };
  
  function endRecognition(){
    setState((current) => !current);
    console.log(state);
    stoppingR = true;
    recognition.stop();
    
  };

  function toggle(){
    if(state === true){
      console.log("start stop")
      stoppingR = true;
      endRecognition();
      console.log("stop");
    }else if (state === false){
      startRecognition();
      console.log("start");
    }
  }
  recognition.onresult = async function(event){
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    
    transcript = transcript.toLowerCase();
    
    if (transcript.includes("iris")){
      let newTranscript = transcript.replace("iris", "")
      console.log(newTranscript);
      speakThis(newTranscript);
    }
    
  };
  recognition.continuous = true;
  
  recognition.onend = function () {
    if (stoppingR === false) {
      setTimeout(() => {
        recognition.start();
      }, 500);
    } else if (stoppingR === true) {
      recognition.stop();
    }
  };
  
  function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    if(message.includes('what is your name')) {
        const finalText = "My name is Iris";
        speech.text = finalText;
 
    }

    else if (message.includes("play")) {
      let playStr = message.split("");
      playStr.splice(0, 5);
      let videoName = playStr.join("");
      playStr = playStr.join("").split(" ").join("+");
      speech.text = `searching youtube for ${videoName}`;
      window.open(`https://www.youtube.com/search?q=${playStr}`
      );
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
    else{
      setPrompt(message);
    }

  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);

};
  return (
    <div className="App">
      <div className = "main">
        <h1 className = "text-main"> This is IRIS </h1>
        <Loader/>
        <noscript>You need java script</noscript>
        <button onClick={toggle} class="button-46">{state ? 'Stop':'Start'}</button>
        <Response prompt ={prompt}/>
      </div>
        
    </div>
    
  );
}

export default App;
