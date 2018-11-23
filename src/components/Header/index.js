import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconMenu, IconBack } from '../Icons'
import {closeMenu, openMenu} from '../../actions/actions'

import "./styles.sass";


const mapStateToProps = state => ({
	menu: state.menuReducer.mainMenu
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		closeMenu: closeMenu,
		openMenu: openMenu
	}, dispatch);
}


class Header extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

	}

	menuToggle() {
		this.props.menu ? this.props.closeMenu() : this.props.openMenu()
	}

	render() {
		const logo = require('../../assets/img/logo.png')
		return (
			<header>
				{!this.props.homepage && <NavLink to={this.props.backLink}>
					<button>
						<IconBack size={45} />
					</button>
				</NavLink> }
				<NavLink to="/">
					<img className="logo" src={logo} />
				</NavLink>
				<button onClick={() => this.menuToggle()}>
					<IconMenu size={45}/>
				</button>
				
			</header>

		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))