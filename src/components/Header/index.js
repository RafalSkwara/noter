import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconMenu, IconBack } from '../Icons'

import "./styles.sass";


const mapStateToProps = state => ({

});


class Header extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

	}

	render() {
		const logo = require('../../assets/img/logo.png')
		return (
			<header>
				<NavLink to="/">
					<img className="logo" src={logo} />
				</NavLink>
					{
						this.props.homepage 
						? <button>
							<IconMenu size={55}/>
						</button>
						: <NavLink to="/"> 
							<button>
								<IconBack size={55} /> 
							</button>
						</NavLink>
					}
			</header>

		)
	}

}

export default withRouter(connect(mapStateToProps)(Header))