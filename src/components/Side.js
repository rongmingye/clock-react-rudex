import React from "react";
import { Link } from "react-router-dom";
import './css/side.css';

class Side extends React.Component{

	render(){
		return (
			<div>
				<h4>功能模块:</h4>
				<ul>
					<li><Link to='/record' > record</Link></li>
					<li><Link to='/user' >user </Link></li>
					<li><Link to="/addUser">addUser</Link></li>
				</ul>
			</div>
		);
	}
	
}

export default Side;