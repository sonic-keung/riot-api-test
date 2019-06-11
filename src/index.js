import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        summonerName: "",
    }
  }

  /*
  handlerSummonerNameChange = event => {
    this.setState({summonerName: event.target.value});
  }
  */

  getSummoner() {
    console.log("Click");
    let summonerID = document.getElementById("summonerID").value; 
    return axios.get('http://localhost:5000/search/' + summonerID)
      .then(async res => {
        console.log("received data");
        console.log(summonerID);
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h3>Search Summoner</h3>
        <form action="/search" method="GET">
          <input type="text" name="summonerName" id="summonerID"></input>
          <br></br>
          <br></br>
          <button type="button" onClick={() => this.getSummoner()}>Search</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <SearchPage />,
  document.getElementById('root')
);

