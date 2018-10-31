import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { setNotes, addNote } from '../actions/actions';
import "../view_styles/AddNotePage.sass";
import Header from '../components/Header';
import CategorySetter from '../components/CategorySetter';
import Note from '../components/Note';


const mapStateToProps = state => ({
	notes: state.mainReducer.notes,
	category: state.mainReducer.activeCategory.id
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setNotes: setNotes,
		addNote: addNote
	}, dispatch);
}


class AddNotePage extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			text: "",
			type: "plain",

		}
	}

	handleChange(e, param) {
		let event = e;
		let val = event.target.value
		this.setState({
			[param]: val
		})
	}

	getId() {
		return this.props.notes.length > 0 ? this.props.notes[this.props.notes.length - 1].id + 1 : 0
	}

	handleEnter(e) {
		if(e.which === 13 ) {
			let newNote = {
				id: this.getId(),
				title: this.state.title,
				type: this.state.type,
				text: this.state.text
			}
			this.props.addNote(newNote)
			this.setState({text: "", title: ""})
			let stored = localStorage.hasOwnProperty("data") ? JSON.parse(localStorage.data).notes : [];
			let newStored = [...stored, newNote];
			localStorage.setItem("data", JSON.stringify({"notes": newStored}))
		}
	}

	render() {
		return (
			<div className="page-wrapper">
				<Header homepage={false}/>
				<div className="note-wrapper" >
					<div className="top-row">
						<input 
							value={this.state.title} 
							type="text" onKeyPress={(e) => this.handleEnter(e)} 
							onChange={(e)=>this.handleChange(e, "title")}/>
						<CategorySetter/>
			
					</div>
					<div className="bottom-row">
						<textarea 
							value={this.state.text} 
							type="text" onKeyPress={(e) => this.handleEnter(e)} 
							onChange={(e)=>this.handleChange(e, "text")}/>

					</div>
				</div>
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNotePage))