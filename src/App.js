import React, { Component } from 'react';
import './App.css';
import './components/Announcements.css';
import './components/Register.css';
import logo from './components/assets/CruzHacks_Challenge_Logo.png'
import Register from './components/Register';
import Announcements from './components/Announcements';


class App extends Component {
  doNothing = () => { //Stubbed Login Button
    alert('This doesn\'t do anything');
  }
  render() {
    return (
      <div className="App" >
        <header>
          <img src={logo} alt="Error Message" height="48px" width="48px" />
          <div>Dashboard</div>
          <button type="submit" onClick={this.doNothing}> Log out</button>
        </header>
        <body>
          <div class="Body">
            <div class="announcements">
              <div class="background-body">
              <Announcements />
              </div>
            </div>
            <div class="Register">
              <div class="register-header">
                Application
              </div>
              <Register />
            </div>
          </div>
        </body>
        <footer>
          <div class="footer-container">
            <div class="follow">
              <div class="Upper">
                <b>Follow</b>
                <br />
              </div>
              <div class="links">
                <a href="https://www.facebook.com/CruzHacks/" target="_blank" rel="noopener noreferrer"><span>Facebook</span></a>
                <a href="https://www.instagram.com/cruzhacks/" target="_blank" rel="noopener noreferrer"><span>Instagram</span></a>
                <a href="mailto:sponsor@cruzhacks.com"><span>Email</span></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;