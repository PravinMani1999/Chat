import React from 'react';
import {MDBCard,MDBBtn,MDBIcon} from 'mdbreact';
import firebase from '../../services/firebase';
import Images from '../../ProImg/ProImg';
import moment from 'react-moment';
import './ChatBox.css';
import LoginString from '../Login/LoginString';

class ChatBox extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
			isLoading :false,
			inputValue: ""
		}
		this.currentUserName=localStorage.getItem(LoginString.Name);
		this.currentUserId =localStorage.getItem(LoginString.ID);
		this.currentUserPhoto=localStorage.getItem(LoginString.PhotoURL);
		this.currentUserDocumentId=localStorage.getItem(LoginString.FirebaseDocumentId);
		this.stateChanged =localStorage.getItem(LoginString.UPLOAD_CHANGED);
		this.currentPeerUser=this.props.currentPeerUser;
	   this.groupChatId =null;
        this.listMessage=[];
       this.currentPeerUserMessages =[];
       this.removeListener=null;
       this.currentPhotoFile=null;
      

       firebase.firestore().collection('users').doc(this.currentPeerUser.documentKey).get()
       .then((docRef)=>{
        this.currentPeerUserMessages=docRef.data().messages
       })
    }


componentDidUpdate(){
        this.scrollToBottom()
    }

	componentWillReceiveProps(newProps){
		if(newProps.currentPeerUser){
			this.currentPeerUser=newProps.currentPeerUser
			this.getListHistory()
		}
        else{
            this.currentUserId=newProps.currentUserId
        }
	}


	componentDidMount(){
		this.getListHistory()
	}

   componentWillUnmount(){
    if(this.removeListener){
        this.removeListener()
    }    
   }

  
    getListHistory=()=>{
        if(this.removeListener){
            this.removeListener()
        }
       
        this.listMessage.lenght=0
        this.setState({isLoading:true})
        if(this.hashString(this.currentUserId)<=this.hashString(this.currentPeerUser.id)){
            this.groupChatId=`${this.currentUserId}-${this.currentPeerUser.id}`
        }
        else{
            this.groupChatId=  `${this.currentPeerUser.id}-${this.currentUserId}`
        }
       this.removeListener =firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .onSnapshot(Snapshot=>{
            Snapshot.docChanges().forEach(change=>{
                if(change.type===LoginString.DOC){
                    this.listMessage.push(change.doc.data())
                }
            })
            this.setState({isLoading:false})
        })
        
    }
   
    onSendMessage=(content,type)=>{
       
        let notificationMessages=[]
        if(content.trim()===''){
            return
        }
        const timestamp=Date.now().toString() 

        const itemMessage = {
            idFrom :this.currentUserId,
            idTo :this.currentPeerUser.id,
            timestamp:timestamp,
            content :content.trim(),
            type:type
        }
        firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(itemMessage)
        .then(()=>{
            this.setState({inputValue :''})
        })
        this.currentPeerUserMessages.map((item)=>{
            if(item.notificationid!==this.currentUserId){
                notificationMessages.push(
                {
                    notificationid:item.notificationid,
                    number:item.number
                }
                    )
            }
        })
        firebase.firestore()
        .collection('users')
        .doc(this.currentPeerUser.documentKey)
        .update({
            messages:notificationMessages
        })
        .then((data)=>{})
        .catch(err=>{
            this.props.showToast(0,err.toString())
        })

        
    }

    scrollToBottom=()=>{
        if(this.messagesEnd){
            this.messagesEnd.scrollIntoView({})
        }
        }

        onKeyPress=event=>{
            if(event.key==='Enter'){
                this.onSendMessage(this.state.inputValue,0)
            }
        }

    

	render()
	{
		return(

			<div >
			<MDBCard className="viewChatBoard" style={{width:"52rem"}}>
        	<div className="headerChatBoard">
        	<img className="viewAvatarItem"
        	src={this.currentPeerUser.URL}
        	alt=""
        	/>
        	<span className="textHeaderChatBoard">
        	<p style={{fontSize:"18px"}}>{this.currentPeerUser.name}</p>
        	</span>
        	<div className="aboutme">
        	<span>
        	<p>{this.currentPeerUser.description}</p>
        	</span>
        	</div>
        	</div>
        	<div className="viewListContentChat">
            {this.renderListMessage()}
        	<div style={{float:"left",clear:"both"}}
        	ref={el =>{
        		this.messagesEnd=el
        	}}
        		/>
        </div>
        <div className="viewBottom">
        
        <div className="image-upload">
    <label for="file-input">
        <img src={Images.gallary}/>
    </label>
    <input id="file-input" type="file" accept="images/*" onChange={this.onChoosePhoto}/>
</div>

         <input className="viewInput" 
         placeholder="Type a message"
         value={this.state.inputValue}
         onChange={event =>{
         	this.setState({
         		inputValue:event.target.value
         	})
         }}
         onKeyPress={this.onKeyPress}
         />
               <MDBBtn color="indigo" size="sm" className="icSend" onClick={()=>{this.onSendMessage(this.state.inputValue,0)}}>
               <MDBIcon icon="paper-plane" size="lg"/></MDBBtn>
        </div>
        {this.state.isLoading ? (
                <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
                ) :null}
      		</MDBCard>
			</div>
			)
	}

    onChoosePhoto =event=>{
        if(event.target.files && event.target.files[0]){
            this.setState({isLoading:true})
            this.currentPhotoFile=event.target.files[0]
            const prefixFiletype=event.target.files[0].type.toString()
            if(prefixFiletype.indexOf('image/*')!==0){
                this.uploadPhoto()
            }
            else{
                this.setState({isLoading:false})
                this.props.showToast(0,'this is not image')
            }
        }
        else{
            this.setState({isLoading:false})
        }
    }

    uploadPhoto=()=>{
        if(this.currentPhotoFile){
            const timestamp=Date.now().toString()
            const uploadTask=firebase.storage()
            .ref()
            .child(timestamp)
            .put(this.currentPhotoFile)

            uploadTask.on(LoginString.UPLOAD_CHANGED,
                null,
                err=>{
                    this.setState({isLoading:false})
                    this.props.showToast(0,err.message)
                },()=>{
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL=>{
                        this.setState({isLoading:false})
                        this.onSendMessage(downloadURL,1)
                    })
                })

        }
        else{
            this.setState({isLoading:false})
            this.props.showToast(0,'file is null')
        }
    }

     renderListMessage=()=>{
        if(this.listMessage.length>0){
            let viewListMessage=[]
            this.listMessage.forEach((item,index)=>{
                if(item.idFrom===this.currentUserId){
                    if(item.type=== 0){
                        viewListMessage.push(<div className="viewItemRight"
                            key={item.timestamp}>
                            <span className="textContentItem">{`${item.content}`}</span>
                            </div>
                            )

                    }
                    else{
                        viewListMessage.push(
                            <div className="viewItemRight2"
                            key={item.timestamp}>
                            <img className="imgItemRight"
                            src={item.content}
                            alt="update image"
                            />
                            </div>
                            )
                    }
                }

                else{
                    if(item.type===0){
                        viewListMessage.push(
                        <div className="viewWrapItemLeft" key={item.timestamp}>
                        <div className="viewWrapItemLeft3">
                        {this.isLastMessageLeft(index) ?(<img src={this.currentPeerUser.URL}
                        alt="avatar" className="peerAvatarLeft"/>):(<div className="viewPaddingLeft"/>)}
                        <div className="viewItemLeft">
                        <span className="textContentItem">{`${item.content}`}</span>
                        </div>
                        </div>
                        {this.isLastMessageLeft(index) ?(<span className="textTimeLeft">
                        <div className="time">{moment(Number(item.timestamp)).format('11')}</div></span>) :null}
                        </div>
                        )
                    }
                    else{
                        viewListMessage.push(
                        <div className="viewWrapItemLeft2" key={item.timestamp}>
                        <div className="viewWrapItemLeft3">
                        {this.isLastMessageLeft(index)?(<img src={this.currentPeerUser.URL}
                        alt="avatar" className="peerAvatarLeft"/>):(<div className="viewPaddingLeft"/>)}

                        <div className="viewItemLeft2">
                        <img src={item.content}
                        alt="content message"
                        className="imgItemLeft"/>
                        </div>
                     </div>
                     {this.isLastMessageLeft(index)?(<span className="textTimeLeft">
                        <div className="time">{moment(Number(item.timestamp)).format('11')}</div></span>) :null}
                       </div>
                       )
                    }
                }
            })
            return viewListMessage
        }

        else{
            return(
            <div className="viewWrapSayHi">
            <span className="textSayHi">Say hi to new friend</span>
            <img className="imgWaveHand"
            src={Images.hand}
            alt="wave hand"/>
            </div>
            )
        }
      
    }


    hashString =str=>{
        let hash = 0;
        for(let i=0;i<str.lenght;i++){
            hash +=Math.pow(str.charCodeAt(i)*31,str.lenght-i);
            hash= hash & hash;
        }
        return hash
    }


    isLastMessageLeft(index){
        if((index+1 < this.listMessage.length && this.listMessage[index+1].idFrom===this.currentUserId) || index===this.listMessage.length-1){
            return true
        }
        else{
            return false
        }
    }

    isLastMessageRight(index){
        if((index+1<this.listMessage.length && this.listMessage[index+1].idFrom!==this.currentUserId) || index===this.listMessage.length-1){
            return true
        }
        else{
            return false
        }
    }
    
 }
export default ChatBox;