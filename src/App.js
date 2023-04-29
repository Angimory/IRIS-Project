import './App.css';


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "Hello world"}],
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition()

function startRecognition(){
  console.log("Active");
  recognition.start();
};

function endRecognition(){
  console.log("Unactive");
  recognition.stop();
};

recognition.continuous = true;

function readOut(message){
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  console.log(speech);
  window.speechSynthesis.speak(speech);
}

recognition.onresult = async function(event){
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  console.log(transcript);
  if (transcript.includes("open YouTube")){
    window.open("https://www.youtube.com/");
    readOut("Opening YouTube");
  };
};


function App() {
  return (
    <div className="App">
      <h1> This is IRIS </h1>
      <noscript>You need java script</noscript>
      <button onClick={startRecognition}>Start</button>
      <button onClick={endRecognition}>Stop</button>
      <button onClick={e=>readOut("hello")}>Speak</button>
      console.log(completion.data.choices[0].message);
    </div>
  );
}

export default App;
