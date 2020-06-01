import React ,{Component} from 'react';
import LoginString from '../Login/LoginString';
import {Link} from 'react-router-dom';
import firebase from '../../services/firebase';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class Login extends React.Component{

	constructor(props){
		super(props)
		this.state={
			isLoading : true,
			email :"",
			password :""
		}
		  this.handleChange = this.handleChange.bind(this)
   		 this.handleSubmit =this.handleSubmit.bind(this)
	}

	handleChange(event){
		this.setState({
			[event.target.name] : event.target.value
		});
	}

	componentDidMount(){
		if(localStorage.getItem(LoginString.ID)){
			this.setState({isLoading :false},()=>{
				this.setState({isLoading:false})
				this.props.showToast(1,'Login Success')
				this.props.history.push("./Chat")

			})

		}else{
			this.setState({isLoading:false})
		}
	}

	async handleSubmit(event){
		event.preventDefault();
		await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then(async result =>{
			let user=result.user;
			if(user){
				await firebase.firestore().collection('users')
				.where('id',"==",user.uid)
				.get()
				.then(function(querySnapshot){
					querySnapshot.forEach(function(doc){
						const currentdata=doc.data();
			            localStorage.setItem(LoginString.FirebaseDocumentId,doc.id);
			localStorage.setItem(LoginString.ID, currentdata.id);
            localStorage.setItem(LoginString.Name, currentdata.name);
            localStorage.setItem(LoginString.Email,currentdata.email);
            localStorage.setItem(LoginString.Password,currentdata.password);
            localStorage.setItem(LoginString.PhotoURL, currentdata.URL);
            localStorage.setItem(LoginString.UPLOAD_CHANGED,'state_changed');
            localStorage.setItem(LoginString.Description,currentdata.description);
					})
				})

			}	
			this.props.history.push("/Chat")
		}).catch(function(error){
				document.getElementById('1').innerHTML="Email or password is incorrect";
		})

		}
	render(){
		return (

			<div>
				<MDBContainer>
  <MDBRow>
    <MDBCol md="5" className="mx-auto mt-5">
      <form noValidate onSubmit={this.handleSubmit}>
        <p className="h5 text-center mb-4">LogIn</p>
        <div className="grey-text">
          <MDBInput size="sm" label="Type your email" icon="envelope" group type="email"
           name="email" id="email" value={this.state.email}  onChange={this.handleChange}/>
          <MDBInput size="sm" label="Type your password" icon="lock" group type="password" id="password" name="password"
          onChange={this.handleChange} value={this.state.password} />
        </div>

        <div className="error">
        <p id="1" style={{color:"red",fontSize:"14px"}}></p>
        </div>

        <div className="text-center">
          <MDBBtn color="indigo" size="sm" type="submit" >Login</MDBBtn>
          <Link to="/">
          <MDBBtn color="indigo" size="sm">Home</MDBBtn>
          </Link>
        </div>
        
        <div style={{textAlign:"center",fontSize:"18px"}}>
        <p>cannot have an Account ? </p>
        <Link to="/Signup">
        SignUp
        </Link>
        </div>

      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>

			</div>
			)
	}
}

export default Login;