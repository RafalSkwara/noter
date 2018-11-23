import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import internalData from '../../assets/internalData.json'
import { IconClose, IconAddBig } from '../Icons'
import { closeMenu } from '../../actions/actions';
import { ChromePicker } from 'react-color';
import BigButton from '../BigButton'
import "./styles.sass";

const mapStateToProps = state => ({
	menu: state.menuReducer.mainMenu
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		closeMenu: closeMenu,
	}, dispatch);
}

class MainMenu extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {

		}

	}


	render() {
		const options = internalData.types;
		return (
				<nav className={`main-menu__wrapper${this.props.menu ? " visible" : ""}`}>
					<div className="main-menu__header">
						<p>Noter</p>
						<div className="main-menu__close-btn flex-center" onClick={() => this.props.closeMenu()}>
							<IconClose size={44} />
						</div>
					</div>
					<div className="main-menu__links">
						<NavLink className="main-menu__link" onClick={() => this.props.closeMenu()} to="/" className="main-menu__link">Home</NavLink>
						<NavLink className="main-menu__link" onClick={() => this.props.closeMenu()} to="/notes" className="main-menu__link">View Notes</NavLink>
					</div>
				</nav>
			)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu))