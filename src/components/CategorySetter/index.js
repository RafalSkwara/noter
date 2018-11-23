import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconSearch, IconAddBig } from '../Icons'
import { activateCategory } from '../../actions/actions';
import CategoryModal from '../CategoryModal'

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
			menuOpen: false,
			categoryModal: false
		}

	}

	componentDidMount() {
		document.body.addEventListener('keypress', this.closeMenu.bind(this));
	}
	componentWillUnmount() {
		document.body.removeEventListener('keypress', this.closeMenu.bind(this));
	}
	

	closeMenu(e) {
		let ev = e;
		console.log('close', ev.which);
		if (ev.which === 0 || ev.which === 32) {
			this.setState({
				menuOpen: false
			});
		}
	}
	toggleMenu() {
		console.log('toggle');
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

	categoryModalToggle() {
		this.setState({
			categoryModal: !this.state.categoryModal,
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
			{this.state.menuOpen && (
				<div className="category__list">
					{this.props.categories.map(el => (
					<div className="category__item" 
						key={el.id}
						onClick={() => this.chooseCategory(el.id)}>
						{el.name}
					</div>))}
					<div onClick={() => this.categoryModalToggle()} className="category__item add-category" >
						<IconAddBig size={28}/>Add Category
					</div>
				</div>)
			
			}
			</div>
			{this.state.categoryModal && (
				<CategoryModal closeHandler={this.categoryModalToggle.bind(this)}/>
			)

			}
			</React.Fragment>

		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategorySetter))