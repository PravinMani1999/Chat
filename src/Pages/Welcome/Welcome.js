import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';

class Welcome extends React.Component{
	render()
	{
		return(

			<div className="viewWelcomeBoard">
			<img className="avatarWelcome"
			src={this.props.currentUserPhoto}
			alt=""
			/>
			<span className="textTileWelcome" >{`Welcome,${this.props.currentUserName}`}</span>
			<span className="textDescriptionWelcome">
			Let's connect the world
			</span>
			</div>
			)
	}
}

export default Welcome;