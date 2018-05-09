import React from "react";
import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';
import $ from 'jquery';
import './css/page.css';
import './css/addUser.css'

class AddUser extends React.Component{

	constructor(){
		super();
		this.state = {
			flag: 1,
		}
	}
	
	// 添加用户的处理
	handleBtn(user){
		$.ajax({
			url: "/emode",
			type: "post",
			contentType: "application/x-www-form-urlencoded;charser=utf8",
			data: "newUserName="+user,
			success: function(result){
				$("#text").html("<p><input type='button' id='getidnum' value='获取id' class='btn' onClick={this.getIdNumber}  /></p>");
			},
			fail: function(err){
				console.log(err);
			}
		});
	}

	// 获取用户id
	getIdNumber(){
		$.ajax({
			url: "/getidnumber",
			type: "post",
			contentType: "application/x-www-form-urlencoded;",
			data: null,
			dataType: "text",
			success: function(result){
				// 获取id成功后
				console.log(result);
				$("#text").html("<p><span>进入输入指纹模式<input type='button' value='进入' id='addFinger' class='btn' onClick={this.addFinger} ></p>");
			},
			fail: function(err, status){
				console.log(err);
			}
		});
	}

	// 录入指纹
	addFinger(){
		$("#text").html("<p>请输入指纹</p>");
			$.ajax({
				url: "/enroll",
				type: "post",
				contentType: "application/x-www-form-urlencoded;",
				data: null,
				dataType: "text",
				success: function(result){
					if(result === "enrollSuccess"){
						let flag = this.state.flag
						if(flag<3){
							$("#text").html("<p><input type='button' id='getidnum' value='再次获取id' class='btn' onClick={this.getIdNumber}  /></p>");
							this.setState({
								flag: flag++,
							});
						}else if(flag === 3){
							this.setState({
								flag: 1,
							});
							$("#text").html("<p><span>注册成功</span> <button id='completed' class='btn' onClick={this.showCompleted}> 完成</button> </p>");
						}
					}
				}.bind(this),
				fail: function(err, status){
					console.log(err);
				}
			});
	}

	// 完成添加用户，门锁返回识别模式
	showCompleted(){
		$.ajax({
			url: "/completed",
			type: "post",
			contentType: "application/x-www-form-urlencoded;",
			data: null,
			dataType: "text",
			success: function(result){
				if(result==="completedSuccess"){
					this.history.push("/addUser");
				}
			},
			fail: function(err, status){
				console.log(err);
			}
		});	
	}

	render(){

		let article = function(){
			return (
				<div>
					<span>请输入名字：</span>
					<input type="text" className="new-user" ref="newUser" />
					<input type="button" value="提交" className="btn" onClick={()=>{
						let user = this.refs.newUser;
						this.handleBtn(user.value);
						user.value = "";
					}}/>
				</div>
			);
		}();

		return (
			<div className="page user">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left"><Side /> </div>
					<div className="show f-right">
						<div className="add-title">添加用户: </div>
						<div className="add-form" id="text">
							{article}
						</div>
					</div>
				</div>
				<Foot />
			</div>	
		);
	}
}

export default AddUser;