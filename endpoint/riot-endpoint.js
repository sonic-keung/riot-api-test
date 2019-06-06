var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
const axios = require('axios');

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));
 
let apiKey = "RGAPI-fe4abfb4-3a77-4a77-beed-7b3dc29c0116"; // development key
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

app.get('/search', async (req, res) => {
    let summonerName = await getSummoner("hypersexual");
    let _matchHistory = matchHistory();
    console.log("Summoner information: " + JSON.stringify(summonerName));
    console.log(_matchHistory);
    res.send(summonerName);
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

