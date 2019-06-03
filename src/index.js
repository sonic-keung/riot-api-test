import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class SearchPage extends React.Component {
  getSummoner() {
    return axios.get('localhost:5000/search/')
      .then(async res => {
        console.log("received data");
        console.log(res.data);
     }).catch(err => {
        console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h3>Search Summoner</h3>
        <form action="/search" method="GET">
          <input type="text" id="summonerID"></input>
          <br></br>
          <br></br>
          <button onClick={this.getSummoner}>Search</button>
        </form>
      </div>
    );
  }
}

let summonerID = document.getElementById("summonerID");
console.log(summonerID);

/*
//send request to riot backend through api endpoint and get user details
function getSummoner() {
  return axios.get('localhost:5000/search/')
    .then(async res => {
      console.log("received data");
      console.log(res.data);
   }).catch(err => {
      console.log(err);
  });
}
*/

ReactDOM.render(
  <SearchPage />,
  document.getElementById('root')
);

