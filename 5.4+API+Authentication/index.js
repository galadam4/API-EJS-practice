import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "jackjackjack";
const yourPassword = "webweb";
const yourAPIKey = "0fdca16a-4271-4694-ae51-e4494f2f2067";
const yourBearerToken = "92e82077-2f0b-479b-8955-555a2021f12f";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL+"random");
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
  const response = await axios.get(API_URL + "all?pages=2", {
    auth: {
      username: yourUsername,
      password: yourPassword
    },
  });
  const result = JSON.stringify(response.data);
  res.render("index.ejs",{content: result});
}catch(error){
  console.error("Failed to make request:",error.message)
  res.render("index.ejs", {
    error : "wrong username"
  });

}
});

app.get("/apiKey", async (req, res) => {

  try {
    const response = await axios.get(API_URL + "filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  try{
  const response = await axios.get(API_URL + "secrets/42", {
    headers: { 
      Authorization: "Bearer " + yourBearerToken,
    },
  });
   res.render("index.ejs",{
    content: JSON.stringify(response.data)});
  }catch(error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        content: error.message
      });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
