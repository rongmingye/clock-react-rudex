import React from "react";
import { connect } from "react-redux";
import { getRecords }  from "../reducers/action";
import $ from 'jquery';
import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';

import './css/page.css';
import './css/record.css';


class Record extends React.Component{

	componentWillMount(){
		$.ajax({
			url: "/record_post",
			type: "post",
			contentType: "application/x-www-form-urlencoded;",
			data: '',
			dataType: 'json',
			success: function(result){
				this.props.getRecords(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	}

	render(){
		let recordList = this.props.records.map(function(item, i){
			return (
				<li key={i}>
					<span>{item.id}</span>
					<span>{item.name}</span>
					<span>{item.time}</span>
				</li>
			);		
		});
		return (
			<div className="page record">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left"><Side /> </div>
					<div className="show f-right">
						<div className="show-title">
							<span>序号</span>
							<span>用户</span>
							<span>开门时间</span>
						</div>
						<div className="show-article">
							{recordList}
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
		records : state.records,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getRecords: (val) => { dispatch(getRecords(val)) },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
