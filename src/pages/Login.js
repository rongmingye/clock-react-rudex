import React from "react";
import $ from 'jquery';
import './css/login.css';

class Login extends React.Component{

	// 登陆处理
	loginHandle(username, pwd){
		$.ajax({
			url: "/login",
			type: "post",
			contentType: "application/x-www-form-urlencoded;charser=utf8",
			data: "username="+ username + "&pwd="+pwd ,
			dataType: "text",
			success: function(result){
				if(result === "success"){
					this.props.history.push("/record"); //调到record.html
				}else if(result==="fail"){
					alert("密码错误");
				}
			}.bind(this),
			fail: function(err, status){
				console.log(err);
			}
		});
	}
	
	render(){
		return (
			<div className="page login-page">
				<div className="login">
					<h3>用户登陆</h3>
					<p>
			         	<span className="username">用户名:</span> 
			          	<input type="text" name="username" id="username" ref="username" />
			      	</p>
			  		<p>
			          	<span>密码:</span>
			          	<input type="password" name="password" id="password" ref="pwd" />
			      	</p>
			  		<p> 
			  			<span></span>
			          	<input type="button" value="登录" id="loginBtn" onClick={ ()=>{
			          		let username = this.refs.username.value;
			          		let pwd = this.refs.pwd.value;
			          		this.loginHandle(username, pwd);
			          	}}/>
					</p>
				</div>	     	
			</div>
		);
	}
}


export default Login;