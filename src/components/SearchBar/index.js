import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconSearch } from '../Icons'

import "./styles.sass";


const mapStateToProps = state => ({

});


class SearchBar extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

	}

	render() {
		const logo = require('../../assets/img/logo.png')
		return (
			<section className="search-bar">
				<input type="text" />
				<IconSearch size={28}/>
			</section>

		)
	}

}

export default withRouter(connect(mapStateToProps)(SearchBar))