import React from "react";
import {MDBContainer,MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="indigo" className="font-small pt-4 mt-4" style={{height:"60px"}}>
        <MDBContainer style={{textAlign:"center"}}>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Pravin </a>
        </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;