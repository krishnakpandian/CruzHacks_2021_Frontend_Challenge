import React, { Component } from 'react';
import '../index.css';
import loading from './assets/loading_page.gif';
import { render } from '@testing-library/react';

class Announcements extends Component {
  state = {
    code: 0,
    count: 0,
    loading: true,
    results: [],
    html: ''
  };

  async componentDidMount() { //Fetches the data from the api
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://us-central1-cruzhacks-test-challenge-65ccc.cloudfunctions.net/getDB";
    const response = await fetch(proxyurl + url);
    const data = await response.json();
    //console.log(JSON.stringify(data.results))
    let arr = Object.keys(data.results)
    this.setState({ code: data.code, count: data.count, results: arr, loading: false });
    var code = "<div class=\"data\">"
    for (var i = 0; i < this.state.count; i++) {
      var data_key = this.state.results[this.state.results.length - i - 1]
      code += "<div class=\"data-header\">" +
        data.results[data_key].time + "</div><div class=\"data-body\">" + data.results[data_key].text + "</div>";
    }

    code += "</div>"
    this.setState({ html: code }) //We create code to be rendered
  }
  render() {
    if (this.state.loading) { //While Loading the Page
      return (<div>loading... <br />
        <img src={loading} alt="Failed Gif" ></img>
      </div>
      );
    }
    else if (this.state.code !== 200) { //If Failed API fetch
      return <div>API Failed to Fetch</div>;
    }
    else if (this.state.count === 0) {  //If nothing in API
      return <div>No Announcements Yet</div>
    }
    return (  // API Normally
      <div class="data-tabled">
        <h1>CruzHacks Announcments!</h1>
        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </div>
    );
  }
}

export default Announcements;

