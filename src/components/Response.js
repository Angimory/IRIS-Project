import axios from "axios";
import { useState, useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";
export function Response(props) {
  const [responseFromAi, setResponseFromAi] = useState("");
  const speech = new SpeechSynthesisUtterance();
  const { prompt } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [loadingResponse,setLoadingResponse] = useState(false);
  useEffect(() => {
    let isMounted = true;

    if (prompt !== '') {
      const request = axios.post('http://localhost:8080/chat', { prompt });
      setLoadingResponse(true);
      request.then((res) => {
        if (isMounted) {
          setResponseFromAi(res.data);
          setError(''); // Clear any previous errors
          setIsVisible(false); // Hide the error message
          setLoadingResponse(false);
        }
      }).catch((err) => {
        setLoadingResponse(false);
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
      {loadingResponse && <LoadingAnimation/>}
    </div>
  );
}
export default Response;