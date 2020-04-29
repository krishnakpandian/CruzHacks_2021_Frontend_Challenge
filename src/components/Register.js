import React, { Component } from 'react';
import '../index.css';
import firebase from './firebase';
import { render } from '@testing-library/react';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Page 1
      fname: '',
      lname: '',
      age: '',
      gender: '',
      gender_string: '',
      graduation: '',
      student: '', 
      affiliation: '',
      // Page 2
      hackathon: '',
      participate: '',
      // Page 3
      transportation: '',
      accomodations: '',
      page: 1,
      //errors
      fname_error: '',
      lname_error: '',
      age_error: '',
      gender_error: '',
      graduation_error: '',
      student_error: '',
      affiliation_error: '',
      hackathon_error: '',
      participate_error: '',
      transportation_error: '',
      accomodation_error: '',

      id: ''
    };
  }

  handleChange = (event) => { //Changes State of an Object
   event.preventDefault()
   this.setState({
       [event.target.name]: event.target.value
   })
  }

  handleRadioChange = (event) => {  //Handles Radio Change (Key Difference is the event.preventDefault)
    this.setState({
        [event.target.name]: event.target.value
    })
   }

  alphanumeric(value) {      //Alphanumeric and Punctuation (I don't really know what defines these characters but this is my guess, probably could add more easily)
    var regex = value.match(/^[a-zA-Z0-9\s+-:;?.-.]*$/)
    //console.log(value + ' ' + regex);
    if(!regex){
      return true;
    }
    else {
      return false;
    }
  }

  addUser = e => {
    //e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection('getHackerInfo').add({
      fname: this.state.fname,
      lname: this.state.lname,
      age: parseInt(this.state.age),
      gender: this.state.gender+this.state.gender_string,
      graduation: parseInt(this.state.graduation),
      student: this.state.student === 'Yes', 
      affiliation: this.state.affiliation,
      hackathon: this.state.hackathon === 'Yes',
      participate: this.state.participate,
      transportation: this.state.transportation === 'Yes',
      accomodations: this.state.accomodations
    }).then(docRef => {
      this.setState({id: docRef.id})
      console.log("Document written with ID: ", this.state.id);
  })
  .catch(error => console.error("Error: ", error))
    this.getUsers()
  };
  deleteApp = () => {
    const db = firebase.firestore();
    db.collection("getHackerInfo").doc(this.state.id).delete()
    this.setState({id: ''})
    this.resetPage()
  }
  getUsers() {
    const db = firebase.firestore()
    db.collection("getHackerInfo")
      .get()
      .then(querySnapshot => {
        const query = querySnapshot.docs.map(doc => doc.data());
        console.log(query);
      });
  }

  saveData = () => {
    alert("This outputs the current DB of submitted applications to the Console")
    this.getUsers()
  }
  nextPage = () => {
    const { page } = this.state;
    this.setState({
        page: page + 1
    });
  }

  prevPage = () => {
    const { page } = this.state;
    this.setState({
        page: page - 1
    });
  }

  resetPage = () => {
    this.setState({
      fname: '',
      lname: '',
      age: '',
      gender: '',
      gender_string: '',
      graduation: '',
      student: '', 
      affiliation: '',
      hackathon: '',
      participate: '',
      transportation: '',
      accomodations: '',
      id:'',
      page: 1
    })
  }

  validate() {  //Invalid is set to the page number that the screen should go to and thus it will go to the earliest page where an error occurs if not it submits the data
    var invalid = 0
  //Third Page
    if (this.state.transportation === ''){
      this.setState({transportation_error: 'Answer this'})
      invalid = 3;
    }
    else{
      this.setState({transportation_error: ''})
    }
    if (this.state.accomodations.length > 150){
      this.setState({accomodation_error: 'Keep Less than 150 Characters'})
      invalid = 3
    }
    else if (this.alphanumeric(this.state.accomodations)) {
      this.setState({ accomodation_error: 'Alphanumeric and Punctuation only' })
      invalid = 3
    }
    else {
      this.setState({ accomodation_error: '' })
    }

    // Second Page
    if (this.state.hackathon === '') {
      this.setState({ hackathon_error: 'Indicate you experience' })
      invalid = 2;
    }
    else {
      this.setState({ hackathon_error: '' })
    }
    if (this.state.participate.length > 500) {
      this.setState({ participate_error: 'Response must be under 500 characters' })
      invalid = 2;
    }
    else if (this.alphanumeric(this.state.participate)) {
      this.setState({ participate_error: 'Alphanumeric and Punctuation only' })
      invalid = 2
    }
    else {
      this.setState({ participate_error: '' })
    }

    //First Page
    if (this.state.fname.length === 0 || this.state.fname.length > 100) {
      this.setState({ fname_error: 'Input first name under 100 characters' })
      invalid = 1
    }
    else if (this.alphanumeric(this.state.fname)) {
      this.setState({ fname_error: 'Alphanumeric and Punctuation only' })
      invalid = 1
    }
    else {
      this.setState({ fname_error: '' })
    }
    if (this.state.lname.length === 0 || this.state.lname.length > 100) {
      this.setState({ lname_error: 'Input your last name under 100 characters' })
      invalid = 1
    }
    else if (this.alphanumeric(this.state.lname)) {
      this.setState({ lname_error: 'Alphanumeric and Punctuation only' })
      invalid = 1
    }
    else {
      this.setState({ lname_error: '' })
    }

    if (this.state.age.length > 3 || this.state.age.includes('-') || this.state.age.length === 0 || parseInt(this.state.age) != this.state.age) {
      this.setState({ age_error: 'Input a valid age' })
      invalid = 1
    }
    else {
      this.setState({ age_error: '' })
    }
    if ((this.state.gender === '' && this.state.gender_string === '') || (this.state.gender !== '' && this.state.gender_string !== '')) {
      this.setState({ gender_error: 'Input one gender option' })
      invalid = 1
    }
    else if (this.alphanumeric(this.state.gender_string)) {
      this.setState({ gender_error: 'Alphanumeric and Punctuation only' })
      invalid = 1
    }
    else if (this.state.gender_string.length > 320){
      this.setState({gender_error: 'Input must be less than 320 characters'})
      invalid = 1
    }
    else {
      this.setState({ gender_error: '' })
    }
    if (parseInt(this.state.graduation) != this.state.graduation) {
      this.setState({ graduation_error: 'Input a valid graduation year' })
      invalid = 1
    }
    else if (this.state.graduation.length !== 4 ){
      this.setState({ graduation_error: 'Use a Valid Formate' })
      invalid = 1  
    }
    else {
      this.setState({ graduation_error: '' })
    }
    if (this.state.student === '') {
      this.setState({ student_error: 'Indicate your college' })
      invalid = 1
    }
    else {
      this.setState({ student_error: '' })
    }
    //console.log(this.state.affiliation)
    if (this.state.student === 'Yes' && this.state.affiliation === '') {
      this.setState({ affiliation_error: 'Indiciate your UCSC affiliation' })
      invalid = 1
    }
    else if (this.state.student === 'No' && this.state.affiliation !== '') {
      this.setState({ affiliation_error: 'Don\'t answer if you are not a UCSC student' })
      invalid = 1
    }
    else {
      this.setState({ affiliation_error: '' })
    }
    return invalid;
  }
  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    var err = this.validate();
    if (!err) {
      // Would do Something Normally but ignoring it for now
      this.addUser()
      this.setState({
        page: 0,
      });
    }
    else {
      this.setState({page:err});
    }
  };


  render() {  // One thing I regret is not making a function for each input field formatting
      if(this.state.page === 1){
       return (
        <div class = "Form">
          <div class="Form-Header">Page 1: Demographics</div>
          <div class="row"> 
            <label>
              First Name*<br/>
              <div><span class="error">{this.state.fname_error}</span></div>
              <input 
                class="medium"
                type="text"
                name="fname"
                value={this.state.fname}
                onChange={this.handleChange.bind(this)}
                placeholder="First Name"
                maxlength = "100"
              />
            </label>
            <label>
              Last Name*
              <div><span class="error">{this.state.lname_error}</span></div>
              <input
                class="medium" 
                type="text"
                name="lname"
                value={this.state.lname}
                onChange={this.handleChange.bind(this)}
                placeholder="Last Name"
                maxlength = "100"
              />
            </label>
          </div>
          <div class="row">
            <label>
              Age*
              <div><span class="error">{this.state.age_error}</span></div>
              <input 
                class="small"
                type="number"
                inputMode= "numeric"
                name="age"
                min = "0"
                max = "999"
                value={this.state.age}
                onChange={this.handleChange.bind(this)}
                placeholder="Age"
              />
            </label>
            <label class= "radio">
              Gender*
              <div><span class="error">{this.state.gender_error} </span></div>
              <div class="fieldset">
                <input type="radio" id="Male" name="gender" value='Male' checked ={this.state.gender === 'Male'} onChange={this.handleRadioChange}/>
                <label for="Male">Male</label>
                <input type="radio" id="Female" name="gender"  value='Female' checked ={this.state.gender === 'Female'} onChange={this.handleRadioChange}/>
                <label for="Female">Female</label>
                <input type="radio" id="Trans" name="gender"  value='Trans' checked ={this.state.gender === 'Trans'} onChange={this.handleRadioChange}/>
                <label for="Trans">Trans</label>
                <input type="radio" id="Non-binary" name="gender" value='Non-Binary' checked ={this.state.gender === 'Non-Binary'} onChange={this.handleRadioChange}/>
                <label for="Non-Binary">Non-Binary</label>
                <input type="radio" id="Other" name="gender" value='' checked ={this.state.gender === ''} onChange={this.handleRadioChange}/>
                <label for="Other">Other</label>
              </div>
            </label>
            <input 
              class="small"
              type="text"
              name="gender_string"
              maxlength = "320"
              value={this.state.gender_string}
              onChange={this.handleChange.bind(this)}
              placeholder="Other"
            />
          </div>
          <div class="row">
            <label>
              Graduation Year* (YYYY)
              <div> <span class="error">{this.state.graduation_error}</span></div>
              <input 
                class="small"
                type="number"
                inputMode= "numeric"
                min = "1900"
                max = "2100"
                name="graduation"
                value={this.state.graduation}
                onChange={this.handleChange.bind(this)}
                placeholder="Graduation Year"
              />
            </label>
            <label class= "radio">
              UCSC Student*
              <div><span class="error">{this.state.student_error} </span></div>
              <div class="fieldset">
                <input type="radio" id="Yes" name="student" value='Yes' checked ={this.state.student === 'Yes'} onChange={this.handleRadioChange}/>
                <label for="Yes">Yes</label>
                <input type="radio" id="No" name="student"  value='No' checked ={this.state.student === 'No'} onChange={this.handleRadioChange}/>
                <label for="No">No</label>
              </div>
            </label>
            <div class="styled-select">
              <label>
                College affiliation
                <div><span class="error">{this.state.affiliation_error}</span></div>
                <select multiple={false} name= "affiliation" value={this.state.affiliation} placeholder= "UCSC College" onChange={this.handleChange.bind(this)}>
                  <option value=""></option>
                  <option value="Stevenson">Stevenson College</option>
                  <option value="Cowell">Cowell College</option>
                  <option value="Merrill">Merrill College</option>
                  <option value="Crown">Crown College</option>
                  <option value="Kresge">Kresge College</option>
                  <option value="Porter">Porter College</option>
                  <option value="Oakes">Oakes College</option>
                  <option value="Rachel-Carson">Rachel Carson College</option>
                  <option value="Nine">College Nine</option>
                  <option value="Ten">College Ten</option>
                </select>
              </label>
            </div>
          </div>
          <div class="button-row-2">
            <button className="Save" onClick={this.saveData}> Save </button>
            <button className="Next" onClick={this.nextPage}>Next</button>
          </div>
        </div>
    );
  }
    else if(this.state.page === 2){
      return(
      <div class= "Form">
        <div class="Form-Header">Page 2 Experience</div>
        <div class = "row-single">
          <label class= "radio">
            First Hackathon*
            <div><span class="error">{this.state.hackathon_error} </span></div>
            <div class="fieldset">
              <input type="radio" id="Yes" name="hackathon" value='Yes' checked ={this.state.hackathon === 'Yes'} onChange={this.handleRadioChange}/>
              <label for="Yes">Yes</label>
              <input type="radio" id="No" name="hackathon"  value='No' checked ={this.state.hackathon === 'No'} onChange={this.handleRadioChange}/>
              <label for="No">No</label>
            </div>
          </label>
        </div>
        <div class = "row-single">
          <label>
            Why Do you want to Participate (500 Characters)
            <div><span class="error">{this.state.participate_error}</span></div>
            <textarea 
              class="large"
              type="text"
              name="participate"
              maxlength = "500"
              value={this.state.participate}
              onChange={this.handleChange.bind(this)}
              placeholder="Why Do you want to Participate (500 Characters)"
            />
          </label>
        </div>
        <div class="button-row-1">
          <button className="Save" onClick={this.saveData}> Save </button>
        </div>
        <div class="button-row-2">
          <button className="Back" onClick={this.prevPage}>Back</button>
          <button className="Next" onClick={this.nextPage}>Next</button>
        </div>
      </div>
      )
    }
  else if (this.state.page === 3){
    return (
      <div class= "Form">
        <div class="Form-Header">Page 3 Logistics</div>
        <div class = "row-single">
          <label class= "radio">
            Can you help us with transportation?*
            <div><span class="error">{this.state.transportation_error} </span></div>
            <div class = "fieldset">
              <input type="radio" id="Yes" name="transportation" value='Yes' checked ={this.state.transportation === 'Yes'} onChange={this.handleRadioChange}/>
              <label for="Yes">Yes</label>
              <input type="radio" id="No" name="transportation"  value='No' checked ={this.state.transportation === 'No'} onChange={this.handleRadioChange}/>
              <label for="No">No</label>
            </div>
          </label>
        </div>
        <div class = "row-single">
          <label>
            Do you require any special Accomodations? (150 Characters)
            <div><span class="error">{this.state.accomodation_error}</span></div>
            <textarea 
              class="large"
              type="text"
              name="accomodations"
              value={this.state.accomodations}
              maxlength = "150"
              onChange={this.handleChange.bind(this)}
              placeholder="Anything Additional Accomodations We Should Know About"
            />
          </label>
        </div>
        <div class ="button-row-1">
          <button className="Save" onClick={this.saveData}> Save </button>
        </div>
        <div class="button-row-2">
          <button className="Back" onClick={this.prevPage}>Back</button>
          <button className="Submit" onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
  else if (this.state.page === 0){
    return (
      <div class= "Form-Header">
        Congratulation on submitting your CruzHacks Application, we will notify you soon, If you would like to edit your application click the button below!
        <div class = "output">
          <label class = "input"> First Name:</label>
          <div class="inputted">{this.state.fname} </div>
          <label> Last Name: </label>
          <div class="inputted">{this.state.lname} </div>
          <label> Age:</label>
          <div class="inputted">{this.state.age} </div>
          <label> Gender:</label>
          <div class="inputted">{this.state.gender} {this.state.gender_string} </div>
          <label> Graduation Year:</label>
          <div class="inputted">{this.state.graduation} </div>
          <label> UCSC Student:</label>
          <div class="inputted">{this.state.student} </div>
          <label> College Affiliation:</label>
          <div class="inputted">{this.state.affiliation} </div>
          <label> First Hackathon:</label>
          <div class="inputted">{this.state.hackathon} </div>
          <label> Transporation: </label>
          <div class="inputted">{this.state.transportation} </div>
          <label> Why Do you want to attend CruzHacks: </label>
          <div class="inputted">{this.state.participate}</div>
          <label> Additional Accomodations: </label>
          <div class="inputted">{this.state.accomodations}</div>
        </div>
        <button className="Submit" onClick={this.deleteApp}>Delete App</button>
        <button className="Submit" onClick={this.resetPage}>New App</button>
      </div>
    );
  }
  else {  //If you somehow break the form
    return(
      <div class="Form-Header"> Application isn't Ready Yet</div>
    )
  }
}
}

export default Register;