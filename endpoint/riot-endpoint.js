var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
const axios = require('axios');

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));
 
let apiKey = "RGAPI-d8bd8f1f-2a03-43ef-a322-93b77c817697"; // development key
let _accountId = "";

async function getSummoner(summonerName) {
    
    let url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + apiKey; // REST URL
    
    return axios.get(url, { 
        headers: { 
            Accept: 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => {
        console.log(response.data);
        _accountId = response.data.accountId;
        return _accountId;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

function championRotation() {
    let url = "https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + apiKey; // REST URL

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
 
async function matchHistory() { 
    let url = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + _accountId + "?api_key=" + apiKey; // REST URL

    return await axios.get(url, { 
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

app.get('/search/:userName', async (req, res) => {
    console.log("REQUEST: " + req.params.userName);
    let summonerName = await getSummoner(req.params.userName);
    let _matchHistory = await matchHistory();
    console.log("Summoner information: " + JSON.stringify(summonerName));
    console.log(_matchHistory);
    res.send('<p>' + 'Summoner Name:' + JSON.stringify(summonerName) + JSON.stringify(_matchHistory) + '</p>');
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

