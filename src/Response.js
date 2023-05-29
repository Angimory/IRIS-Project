import axios from "axios";
import { useState } from "react";
import generate from "./server";

function Response(){
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    
   
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080")
        // Send a request to the server with the prompt
        axios
          .post("/chat", { prompt })
          .then((res) => {
            // Update the response state with the server's response
            setResponse(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      };
    
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{response}</p>
        </div>
      );
}

export default Response;