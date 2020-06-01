import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {Link} from 'react-router-dom';
import firebase from '../../services/firebase';
import LoginString from '../Login/LoginString';
class Signup extends React.Component{ 
    constructor(){
      super()
    this.state={
      email :"",
      password :"",
      name :"",
      error :null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit =this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }
  async handleSubmit(event){
    const {name,email,password} = this.state;
    event.preventDefault();
    try{
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(async result=>{
        firebase.firestore().collection('users')
        .add({
          name,
          id :result.user.uid,
          email,
          password,
          URL :'',
          description :'',
          messages :[{notificationid :"",number:0}]
        }).then((docRef)=>{
            localStorage.setItem(LoginString.ID, result.user.id);
            localStorage.setItem(LoginString.Name, name);
            localStorage.setItem(LoginString.Email, email);
            localStorage.setItem(LoginString.Password, password);
            localStorage.setItem(LoginString.PhotoURL, "");
            localStorage.setItem(LoginString.UPLOAD_CHANGED,'state_changed');
            localStorage.setItem(LoginString.Description,"");
            localStorage.setItem(LoginString.FirebaseDocumentId,docRef.id);
            this.setState({
              name :'',
              password :'',
              url :'',
            });
            this.props.history.push("/Chat")
        })
        .catch((error)=>{     
            console.error("error in document",error)
        })
      })  
    }
    catch(error){
        document.getElementById('1').innerHTML="Error Occured Try Again"
    }
  }
  render() {
    return (
      <div>
        <MDBContainer >
  <MDBRow>
    <MDBCol md="5" className="mx-auto mt-5">
      <form noValidate onSubmit={this.handleSubmit}>
        <p className="h5 text-center mb-4">SignUp</p>
        <div className="grey-text">
          <MDBInput label="Your name" size="sm" icon="user" group type="text" id="name" name="name" onChange={this.handleChange} 
          value={this.state.name}/>
          <MDBInput label="Your email"  size="sm" icon="envelope" group type="email" name="email" id="email" onChange={this.handleChange} 
          value={this.state.email}/>
          <MDBInput label="Your password" size="sm" icon="lock" group type="password" name="password"
          id="password" onChange={this.handleChange} value={this.state.password} />
        </div>
        <div className="text-center">
          <MDBBtn color="indigo" size="sm" type="submit">Register</MDBBtn>

          <Link to="/">
          <MDBBtn color="indigo" size="sm">go back</MDBBtn>
          </Link>
        </div>
      
        <div className="error">
        <p id="1" style={{color:"red"}}></p>
        </div>
        <div style={{textAlign:"center",fontSize:"18px"}}>
        <p>Already have an Account ?</p>
        <Link to="/Login">Log In</Link>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
</div>
    );
  }
}

export default Signup;