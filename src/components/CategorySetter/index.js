import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconSearch } from '../Icons'
import { activateCategory } from '../../actions/actions';

import "./styles.sass";


const mapStateToProps = state => ({
	categories: state.mainReducer.categories,
	activeCategory: state.mainReducer.activeCategory[0]
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		activateCategory: activateCategory
	}, dispatch);
}

class CategorySetter extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false
		}

	}

	componentDidMount() {
		document.body.addEventListener('click', this.closeMenu.bind(this));
	}
	componentWillUnmount() {
		document.body.removeEventListener('click', this.closeMenu);
	}
	

	closeMenu(e) {
		let ev = e;
		ev.target.classList.contains("category__item") 
			? null
			: this.setState({
				menuOpen: false
			})
	}
	toggleMenu() {
		this.setState({
			menuOpen: !this.state.menuOpen
		})
	}

	chooseCategory(id) {
		this.props.activateCategory(id);
		this.setState({
			menuOpen: false
		})
	}

	render() {
		const logo = require('../../assets/img/logo.png')
		return (
			<React.Fragment>
			<div className="category-setter" 
				style={{backgroundColor: this.props.activeCategory.color}}
				onClick={() => this.toggleMenu()}>

					{this.props.activeCategory.name}
			</div>
			{this.state.menuOpen && (
				<div className="category__list">
					{this.props.categories.map(el => (
					<div className="category__item" 
						key={el.id}
						onClick={() => this.chooseCategory(el.id)}>
						{el.name}
					</div>))}
				</div>)
			
			}
			</React.Fragment>

		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategorySetter))