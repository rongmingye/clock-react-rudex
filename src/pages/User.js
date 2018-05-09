import React from "react";
import { connect } from "react-redux";
import { getUsers }  from "../reducers/action";
import $ from 'jquery';
import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';

import './css/page.css';
import './css/user.css';

let delShow = false;

class User extends React.Component{

	componentWillMount(){
		$.ajax({
			url: "/user_post",
			type: "post",
			contentType: "application/x-www-form-urlencoded;",
			data: null,
			dateType: "json",
			success: function(result){
				this.props.getUsers(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	}

	// 显示是否删除用户
	handleDel(){
		if(!delShow){
			delShow = true;
				 $(".del-user").css("display", "inline-block")
			}
			else{ 
				delShow = false;
				$(".del-user").css("display", "none"); 
			}
	}

	// 删除用户
	handleDelUser(id){
		$.ajax({
			url: "/user_del_post",
			type: "post",
			contentType: "application/x-www-form-urlencoded;charset=utf8",
			data: "id="+id,
			dateType: "text",
			success: function(result){
				alert("删除成功");
				this.props.getUsers(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});	
	}

	render(){

		// 用户列表
		let userList = this.props.users.map(function(item, i){
			let time = item.time.replace("T", ' ').split(".")[0];
			return (
				<li key={i}>
					<span>{item.id}</span>
					<span>{item.name}</span>
					<span>{time}</span>
					<span className="del-user" 
						onClick={()=>this.handleDelUser(item.id)} >
						删除用户
					</span>
				</li>
			);		
		});

		return (
			<div className="page user">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left"><Side /> </div>
					<div className="show f-right">
						<div className="show-title">
							<span>序号</span>
							<span>用户</span>
							<span>创建时间</span>
							<span className="del-btn" onClick={this.handleDel } > 删除 </span>
						</div>
						<div className="show-article">
							{userList}
						</div>
					</div>
				</div>
				<Foot />
			</div>	
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users : state.users,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUsers: (val) => { dispatch(getUsers(val)); },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(User);