import './App.css';
import { useState} from 'react';
import Loader from './Loader';
import delay from 'delay';
import axios from "axios";


function App() {
  const [state,setState] = useState(false);
  const [input, setInput] = useState("");
  
  console.log(state);
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition()

  const handleSubmit = (event) => {
    event.preventDefault();
    speakThis(input);
  }

  let stoppingR = false;

  function startRecognition(){
    setState((current) => !current);
    recognition.start();
    console.log(state);
    stoppingR = false;
  };
  
  function endRecognition(){
    setState((current) => !current);
    console.log(state);
    stoppingR = true;
    recognition.stop();
    
  };

  function toggle(){
    if(state === true){
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

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello sir";
        speech.text = finalText;
        delay(4000);
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine sir tell me how can i help you";
        speech.text = finalText;
        delay(2000);
    }

    else if(message.includes('what is your name')) {
        const finalText = "My name is Iris";
        speech.text = finalText;
        delay(2000);
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
        delay(2000);
  
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
        delay(2000);
    }

    else if(message.includes('open wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
        delay(2000);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
        delay(2000);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
        delay(2000);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
        delay(2000);

    }
    else if(message.includes('turn off') || message.includes('shut down')) {
      endRecognition();
      const finalText = "Shutting Down";
      speech.text = finalText;
      delay(2000);
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
        delay(2000);
    }

  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);

}
  return (
    <div className="App">
      <div className = "main">
        <h1 className = "text-main"> This is IRIS </h1>
        <Loader/>
        <noscript>You need java script</noscript>
        <button onClick={toggle} class="button-46">{state ? 'Stop':'Start'}</button>
        <form onSubmit={handleSubmit}>
          <label>Enter your name:
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
