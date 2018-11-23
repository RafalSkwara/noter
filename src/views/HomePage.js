import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import {openMenu, closeMenu} from "../actions/actions"
import "../view_styles/HomePage.sass";
import Header from '../components/Header'
import MainMenu from '../components/MainMenu'
import Searchbar from '../components/Searchbar'
import BigButton from '../components/BigButton'

const mapStateToProps = state => ({
	menu: state.menuReducer.mainMenu
});
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openMenu: openMenu,
		closeMenu: closeMenu
	}, dispatch);
}

class HomePage extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
	}
	componentWillMount() {
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": 0
		});

	}
	
	render() {
		const img = require('../assets/img/logo.png')
		return (
			<React.Fragment>
				<MainMenu />
				<div className="page-wrapper">
					<Header homepage={true} />
					<img className="large-img" src={img}/>
					<div className="button-wrapper" >
						<Searchbar />
						<BigButton link="/notes">View Notes</BigButton>
						<BigButton link="/add-note">Add Note</BigButton>
					</div>
				</div>
			</React.Fragment>

		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))