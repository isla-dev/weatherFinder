import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "610595f91a6c73fa9e4fa424ce6fe17d";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/getLocation",async (req,res)=>{
    const longitude = req.body.lon;
    const latitude = req.body.lat
    console.log(longitude+"  "+latitude);
    try {
        const weather = await axios.get("https://api.openweathermap.org/data/2.5/weather?",{
            params: {
                lat: latitude,
                lon: longitude,
                units: "metric",
                appid: apiKey,
                
            }
        });
        console.log(JSON.stringify(weather.data));
        res.render("index.ejs", {content : weather.data});          
    } catch (error) {
    
    }
});

app.post("/weather",async (req,res)=>{
    const stateName = req.body["state"];
    try {
        const reponse = await axios.get("http://api.openweathermap.org/geo/1.0/direct?",{
            params: {
                q: stateName,
                appid: apiKey
            }
        });
        const state = reponse.data[0];
        const latitude = state.lat;
        const longitude = state.lon;
        console.log(`Lan = ${latitude} Lat = ${longitude}`);

        try {
            const weather = await axios.get("https://api.openweathermap.org/data/2.5/weather?",{
                params: {
                    lat: latitude,
                    lon: longitude,
                    units: "metric",
                    appid: apiKey
                }
            });
            console.log(JSON.stringify(weather.data));
            res.render("index.ejs", {content : weather.data});  
            res.redirect("/");        
        } catch (error) {
        
        }

    } catch (error) {

    }
});


app.listen(port,()=>{
    console.log("Listening on port "+port);
});