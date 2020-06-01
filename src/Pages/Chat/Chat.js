import React from 'react';
import LoginString from '../Login/LoginString';
//import {Link} from 'react-router-dom';
import firebase from '../../services/firebase';
import { MDBIcon,MDBFormInline,MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
	MDBRow,MDBCol,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';

//import ReactLoading from 'react-loading';
import './Chat.css';
import Welcome from '../Welcome/Welcome';
import ChatBox from '../ChatBox/ChatBox';

class Chat extends React.Component{
	state = {
  modal: false
}
	constructor(props){
		super(props)
		this.state={
			isLoading : true,
			isOpenDialogConfirmLogout :false,
			currentPeerUser :null,
			displayContactSwitchedNotification :[],
			displayedContacts :[]
		}
		this.currentUserName=localStorage.getItem(LoginString.Name);
		this.currentUserId =localStorage.getItem(LoginString.ID);
		this.currentUserPhoto=localStorage.getItem(LoginString.PhotoURL);
		this.currentUserDocumentId=localStorage.getItem(LoginString.FirebaseDocumentId);


		this.currentUserMessages=[]
		this.searchUsers=[]
		this.notificationMessagesErase=[]
		this.onProfileClick=this.onProfileClick.bind(this);
		this.getListUser =this.getListUser.bind(this)
		this.renderListUser=this.renderListUser.bind(this);
		this.getClassnameforUserandNotification=this.getClassnameforUserandNotification.bind(this);
		this.notificationErase=this.notificationErase.bind(this);
		//this.updaterenderList=this.updaterenderList.bind(this);
	}
	logout=()=>{
		firebase.auth().signOut()
		this.props.history.push('/')
		localStorage.clear()
	}


toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

		

		onProfileClick=()=>{
			this.props.history.push('/Profile')
		}



	componentDidMount(){
		firebase.firestore().collection('users').doc(this.currentUserDocumentId).get()
		.then((doc)=>{
			doc.data().messages.map((item)=>{
				this.currentUserMessages.push({
					notificationid :item.notificationid,
					number :item.number

				})

			})
			this.setState({
				displayContactSwitchedNotification:this.currentUserMessages
			})
		})
		this.getListUser()

	}

	getListUser=async()=>{
		const result=await firebase.firestore().collection('users').get();
		if(result.docs.length >0){
			let listUsers=[]
			listUsers=[...result.docs]
			listUsers.forEach((item,index)=>{
				this.searchUsers.push({
					key :index,
					documentKey :item.id,
					id:item.data().id,
					name :item.data().name,
					messages:item.data().messages,
					URL :item.data().URL,
					description :item.data().description
				})
			})

			this.setState({
				isLoading:false
			})
		}
		this.renderListUser()
	}
	
getClassnameforUserandNotification=(itemId)=>{
	let number=0
	let className=""
	let check=false
	if(this.state.currentPeerUser&&
		this.state.currentPeerUser.id === itemId){
		className="viewWrapItemFocused"
	}
	else{
		this.state.displayContactSwitchedNotification.forEach((item)=>{
			if(item.notificationid.length>0){
				if(item.notificationid === itemId){
					check=true
					number=item.number
				}
			}
		})
		if(check===true){
			className="viewWrapItemNotification"
		}
		else{
			className="viewWrapItem"
		}

		return className
}
}

notificationErase=(itemId)=>{
	this.state.displayContactSwitchedNotification.forEach((el)=>{
		if(el.notificationid.length>0){
			if(el.notificationid!==itemId){
				this.notificationMessagesErase.push({
					notificationid:el.notificationid,
					number:el.number
				})
			}
		}
	})
	//this.updaterenderList()
}

/*updaterenderList=()=>{
	firebase.firestore().collection('users').doc(this.currentUserDocumentId).update({
		messages :this.notificationErase
	})
	this.setState({
		displayContactSwitchedNotification:this.notificationMessagesErase
	})
}*/

 renderListUser=()=>{
 	if(this.searchUsers.length>0){
 		let viewListUser=[]
 		let classname=""
 		this.searchUsers.map((item)=>{
 			if(item.id !==this.currentUserId){
 				classname =this.getClassnameforUserandNotification(item.id)
 				viewListUser.push(
 					<button id={item.key}
 					className={classname}
 					onClick={()=>{
 						this.notificationErase(item.id)
 						this.setState({currentPeerUser:item})
 						
 					}}>
 					
 					<img className="viewAvatarItem"
 					src={item.URL}
 					alt=""
 					/>
 					

 					<div className="viewWrapContentItem">
 					<span className="textItem">
 					{`${item.name}`}
 					</span>
 					</div>
 					{classname === 'viewWrapItemNotification' ?
 					(<div className="notificationparagraph">
 					<p id={item.key} className="newmessage">New Message</p>
 					</div>) : null}

 					</button>
 				
 					
 					)
 			}
 		})
 		this.setState({
 			displayedContacts:viewListUser
 		})
 	}else{
 		console.log("no user is present")
 	}

 }

searchHandler=(event)=>{
	let searchQuery=event.target.value.toLowerCase(),
	displayedContacts=this.searchUsers.filter((el)=>{
		let SearchValue=el.name.toLowerCase();
		return SearchValue.indexOf(searchQuery)!==-1;
	})
	this.displayedContacts=displayedContacts
	this.displaySearchedContacts()
}

displaySearchedContacts=()=>{

	if(this.searchUsers.length>0){
 		let viewListUser=[]
 		let classname=""
 		this.displayedContacts.map((item)=>{
 			if(item.id !==this.currentUserId){
 				classname =this.getClassnameforUserandNotification(item.id)
 				viewListUser.push(
 					
 					<button id={item.key}
 					className={classname}
 					onClick={()=>{
 						this.notificationErase(item.id)
 						this.setState({currentPeerUser:item})
 					
 					
 				}}>
 					<img className="viewAvatarItem"
 					src={item.URL}
 					alt=""
 					placeholder=""/>

 					<div className="viewWrapContentItem">
 					<span className="textItem">
 					{`${item.name}`}
 					</span>
 					</div>
 					{classname === 'viewWrapItemNotification' ?
 					(<div className="notificationparagraph">
 					<p id={item.key} className="newmessage">New Message</p>
 					</div>) : null}

 					</button>

 					
 					)
 			}
 		})
 		this.setState({
 			displayedContacts:viewListUser
 		})
 	}else{
 		console.log("no user is present")
 	}
	
}

	render(){

		return (
			
  	<div className="root">
	<div className="body">

  <div className="viewListUser">
			<div className="profileviewleftside">
			<img className="ProfilePicture" 
			alt="" src={this.currentUserPhoto}
			onClick={this.onProfileClick} />

			<MDBBtn className="Logout"  color="indigo" size="sm" onClick={this.toggle}>Logout</MDBBtn>
			<MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalBody>
          Are you sure,You want to Logout?
        </MDBModalBody>
        <MDBModalFooter>
        <MDBBtn color="primary" size="sm" onClick={this.logout}>Yes</MDBBtn>
          <MDBBtn color="secondary" onClick={this.toggle} size="sm">No</MDBBtn>
          
        </MDBModalFooter>
      </MDBModal>
			</div>
			<div className="pad">
			<MDBFormInline className="md-form">
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search friends" aria-label="Search" 
        onChange={this.searchHandler}/>
      </MDBFormInline>
      </div>

      <div className="pad">
			{this.state.displayedContacts}
			</div>
			</div>
			<div className="viewBoard">
			{this.state.currentPeerUser ? (<ChatBox currentPeerUser={this.state.currentPeerUser}
			showToast={this.props.showToast}/>) : (<Welcome currentUserName={this.currentUserName}
			currentUserPhoto={this.currentUserPhoto}/>)}
			</div>
			</div>
  </div>
			
			)
	}
}

export default Chat;