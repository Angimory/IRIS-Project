import axios from "axios";
import { useState, useEffect } from "react";

export function Response(props) {
  const [responseFromAi, setResponseFromAi] = useState("");
  const speech = new SpeechSynthesisUtterance();
  const { prompt } = props;
    
  useEffect(() => {
    if (prompt !== "") {
      axios
        .post("http://localhost:8080/chat", { prompt })
        .then((res) => {
          setResponseFromAi(res.data);
          console.log(res.data);
          console.log(prompt);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [prompt]);

  useEffect(() => {
    if (responseFromAi.length > 0) {
      speech.text = responseFromAi;
      speech.volume = 1;
      speech.pitch = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
      setResponseFromAi("");
    }
  }, [responseFromAi]);

  return null; // or render any desired UI components
}

