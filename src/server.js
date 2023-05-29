const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-2U7ekXo2LFqb7mFFgWYWiwmd",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    temperature:0.6,
  });
  res.send(completion.data.choices[0].text);
  console.log(res.data); 
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});





