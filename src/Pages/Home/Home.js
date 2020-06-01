import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { MDBContainer, MDBRow, MDBCol,MDBBtn,MDBIcon,MDBInput} from "mdbreact";
import {Link} from 'react-router-dom';
import Images from '../../ProImg/ProImg';

class Home extends React.Component{

	render(){
	return(
	 	<div>
	 		<Header />
      
	 				<MDBContainer>
	 				<div style={{paddingTop : "100px"}}>
  						<MDBRow>
    					<MDBCol md="4" style={{textAlign:"center"}}>
    					<div>
    					<h4><strong>WEB CHAT APP</strong></h4>
    					<Link to="/Login">
    					<MDBBtn color="indigo" size="medium">Get Started</MDBBtn>
    					</Link>
    					</div>
    					</MDBCol>
    					<MDBCol md="8">
    					<img src={Images.img} alt="place" height="400" width="90%" className="bg" />
    					</MDBCol>
  						</MDBRow>
  						</div>
						</MDBContainer>

						<div style={{padding:"20px"}}>
						</div>
  						<MDBContainer style={{padding:"20px"}}>
  						<h5 style={{textAlign:"center",padding:"10px"}}><strong>Features of Web Chat App</strong></h5>
  						<hr />
  						<MDBRow>
    					<MDBCol md="3">
    					<strong><p><MDBIcon icon="rocket" size="small" className="blue-text pr-2" />Get Started Quickly</p></strong>
    					<p style={{fontSize:"16px"}}>To utilize my potential in designing new software and technology with latest requirement and advancements in the field of technology, 
					thereby adding up to the reputation of the organization.</p>
    					</MDBCol>
    					<MDBCol md="3"><strong><p><MDBIcon icon="award" size="small" className="blue-text pr-2" />Firebase Authentication</p></strong>
    					<p style={{fontSize:"16px"}}>To utilize my potential in designing new software and technology with latest requirement and advancements in the field of technology, 
					thereby adding up to the reputation of the organization.</p>
						</MDBCol>
    					<MDBCol md="3"><strong><p><MDBIcon icon="photo-video" size="small" className="blue-text pr-2" />Media</p></strong>
    					<p style={{fontSize:"16px"}}>To utilize my potential in designing new software and technology with latest requirement and advancements in the field of technology, 
					thereby adding up to the reputation of the organization.</p>
    					</MDBCol>
    					<MDBCol md="3"><strong><p><MDBIcon icon="award" size="small" className="blue-text pr-2" />Updates</p></strong>
    					<p style={{fontSize:"16px"}}>To utilize my potential in designing new software and technology with latest requirement and advancements in the field of technology, 
					thereby adding up to the reputation of the organization.</p>
						</MDBCol>
  						</MDBRow>
						</MDBContainer>
					
					<MDBContainer style={{padding:"20px"}}>
					<h5 style={{fontSize:"20px",textAlign:"center",padding:"10px"}}><strong>About Us</strong></h5>
					<hr />
  					<MDBRow>
    				<MDBCol md="4">
    				<img src={Images.pravin} alt="hold" height="300" width="300" className="bg" />
    				</MDBCol>
    				<MDBCol md="8">
    				<h6 style={{fontSize:"18px"}}><strong>CAREER OBJECTIVES</strong></h6>
					<p style={{fontSize:"16px"}}>To utilize my potential in designing new software and technology with latest requirement and advancements in the field of technology, 
					thereby adding up to the reputation of the organization.</p>

					<h6 style={{fontSize:"18px"}}><strong>PROJECTS</strong></h6>
					<ul style={{fontSize:"16px"}}>
					<li><a href="https://github.com/PravinMani1999/Aliquam" target="blank">https://github.com/PravinMani1999/Aliquam</a></li>
					<li><a href="https://ancient-thicket-51247.herouapp.com/" target="blank">https://ancient-thicket-51247.herouapp.com/</a></li>
					</ul>

    				</MDBCol>
  					</MDBRow>
					</MDBContainer>

					  <MDBContainer style={{padding:"20px"}}>
					  <h5 style={{fontSize:"20px",textAlign:"center",padding:"10px"}}><strong>Contact Us</strong></h5>
					<hr />
  						<MDBRow>
   					 <MDBCol md="5" >

   					 <div className="form-group" style={{fontSize:"16px"}}>
     <MDBInput label="Name" size="sm" />
     <MDBInput label="Email" size="sm"/>
     <label htmlFor="exampleFormControlTextarea1">
            Message
            </label>
            <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"/>

     <MDBBtn color="indigo" size="sm">Submit</MDBBtn>
    </div>
   					 </MDBCol>
    				<MDBCol md="5" style={{padding:"50px"}}>
    				<p>LinkedIn  : <a href="www.linkedin.com">click</a></p>
    				<p>Twitter   : <a href="www.linkedin.com">click</a></p>
    				<p>Instagram : <a href="www.linkedin.com">click</a></p>
    				<p>GitHub    : <a href="www.linkedin.com">click</a></p>
    				</MDBCol>
  					</MDBRow>
					</MDBContainer>
					
			<Footer />
	 		</div>
	 		)
	 }
}

 export default Home;