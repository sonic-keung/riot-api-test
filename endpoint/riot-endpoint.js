const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

app.use(express.static(path.join(__dirname, 'client/build')));

let apiKey = "RGAPI-10d039e8-16c8-4362-9972-928e5259e2ea";

function getSummoner(summonerName) {
    
    let url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + apiKey; // REST URL
    
    return axios.get(url, { 
        headers: { 
            Accept: 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

app.get('/search', (req, res) => {
    let summonerName = getSummoner("hypersexual");
    res.send(summonerName);
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

