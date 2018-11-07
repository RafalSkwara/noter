import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconSearch, IconClose } from '../Icons'

import "./styles.sass";


const mapStateToProps = state => ({
	notes: state.notesReducer.notes
});


class SearchBar extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			result: ''
		}
	}

	clearInput(){
		this.setState({input: ''})
		document.querySelector('.search-bar input').focus()
	}

	handleChange(e) {
		let val = e.target.value;
		let resArr = this.props.notes.filter(el => el.title.toLowerCase().includes(val));
		console.log(resArr);
		
		this.setState({
			input: val,
			result: resArr
		})
	}
	getSnippet(str, length) {
		return str.length >= length ? `${str.slice(0, length-3)}...` : str;
	}

	render() {
		const logo = require('../../assets/img/logo.png')
		return (
			<React.Fragment>
				<section className="search-bar">
					<div className="input-wrapper">
						<input type="text" value={this.state.input} onChange={(e)=> this.handleChange(e)}/>
						{this.state.input.length > 2 && (
							<div className="search-bar__clear flex-center" onClick={()=> this.clearInput()}>
								<IconClose className="no-style" size={28}/>
							</div>)
						}
					</div>
					<div className="icon-wrapper flex-center"><IconSearch size={28}/></div>
					{ this.state.input.length >2 && (
						<div className="results">
						{this.state.result.map((el, i) => (
							<NavLink to={`/notes/${el.id}`}>
								<div key={i} className="results__item">
										<b>{el.title}</b> - 
										{Array.isArray(el.text) 
											? this.getSnippet(el.text[0], 45) 
											: this.getSnippet(el.text, 45)}
								</div>
							</NavLink>
						))}
						</div>
					)}
				</section>
			</React.Fragment>
		)
	}

}

export default withRouter(connect(mapStateToProps)(SearchBar))