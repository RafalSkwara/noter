import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import "../view_styles/HomePage.sass";
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'
import BigButton from '../components/BigButton'

const mapStateToProps = state => ({
	
});


class HomePage extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			style: {
				animation: "mount .3s cubic-bezier(.83,.21,1,1) forwards"
			},
			data: [],
			visible: false
		}
		this.handleToggle = this.handleToggle.bind(this)
	}
	componentWillMount() {
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": 0
		});

	}
	

	handleToggle() {
		this.setState({
			visible: !this.state.visible
		})
	}
	render() {
		const img = require('../assets/img/logo.png')
		return (
			<div className="page-wrapper">
				<Header homepage={true} />
				<img className="large-img" src={img}/>
				<div className="button-wrapper" >
					<BigButton link="/notes">View Notes</BigButton>
					<BigButton link="/add-note">Add Note</BigButton>
					<Searchbar />
				</div>
			</div>

		)
	}

}

export default withRouter(connect(mapStateToProps)(HomePage))