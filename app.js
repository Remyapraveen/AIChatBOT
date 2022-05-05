const express = require('express')
const app = express()
require('dotenv').config()
const axios = require('axios');
const apiKey = process.env.OPENAI_API_KEY;
const client = axios.create({ headers: { 'Authorization': 'Bearer ' + apiKey }});
const path = require('path');
const { response } = require('express');
var bodyParser = require('body-parser');
var input = ""


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.get("/", (req,res) => {
  res.render("home")
})


app.post("/", (req,res) => {
  // res.render("result", {data: "ok"})
    input = req.body.msg
    console.log(input)
          
    const completionParams = {
            "prompt": "You:"+input+"  ",
             "temperature": 0.5,
              "max_tokens": 60,
              "top_p": 1.0,
              "frequency_penalty": 0.5,
              "presence_penalty": 0.0,
              "stop": ["AI:"]
           }

              client.post("https://api.openai.com/v1/engines/text-curie-001/completions", completionParams)
              .then(results => {

                
                 var output = results.data.choices[0].text
                  res.render("chat",{data:"AI:" +`${output}`} )
                  //res.send(JSON.stringify(output))
              })
                  .catch(err => {
                    console.log(err.response.data);  
                    console.log(err.response.status);  
                    console.log(err.response.headers); 
                })
  });



app.listen(3000)
  