import axios from "axios";
import { useState, useEffect } from "react";

export function Response(props) {
  const [responseFromAi, setResponseFromAi] = useState("");
  const speech = new SpeechSynthesisUtterance();
  const { prompt } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (prompt !== '') {
      const request = axios.post('http://localhost:8080/chat', { prompt });

      request.then((res) => {
        if (isMounted) {
          setResponseFromAi(res.data);
          setError(''); // Clear any previous errors
          setIsVisible(false); // Hide the error message
        }
      }).catch((err) => {
        console.error(err);
        if (isMounted) {
          setError(err.message); // Use err.message to get the error message string
          setIsVisible(true); // Show the error message
        }
      });
    }

    return () => {
      isMounted = false;
    };
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

  useEffect(() => {
    if (isVisible) {
      const errorTimeout = setTimeout(() => {
        setIsVisible(false); // Hide the error message after 3 seconds
      }, 3000);

      return () => {
        clearTimeout(errorTimeout);
      };
    }
  }, [isVisible]);

  return (
    <div>
      {isVisible && <h2 className="error-text">{error}</h2>}
    </div>
  );
}
