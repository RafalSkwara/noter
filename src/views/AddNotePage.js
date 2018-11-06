import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { setNotes, addNote, addListItem, updateListItem, deleteListItem, clearList } from '../actions/actions';
import "../view_styles/AddNotePage.sass";
import Header from '../components/Header';
import AddButton from '../components/AddButton';
import ListInput from '../components/ListInput';

import CategorySetter from '../components/CategorySetter';
import Note from '../components/Note';


const mapStateToProps = state => ({
	notes: state.mainReducer.notes,
	category: state.mainReducer.activeCategory[0].id,
	categoryName: state.mainReducer.activeCategory[0].name,
	type: state.mainReducer.activeCategory[0].type,
	listInputs: state.mainReducer.listInputs
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setNotes: setNotes,
		addNote: addNote,
		addListItem: addListItem,
		updateListItem: updateListItem,
		deleteListItem: deleteListItem,
		clearList: clearList
	}, dispatch);
}


class AddNotePage extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			text: "",

		}
	}

	handleChange(e, param) {
		let event = e;
		let val = event.target.value
		this.setState({
			[param]: val
		})
	}
	handleMultiInputChange(e, index) {
		let event = e;
		let val = event.target.value
		console.log(val, e.target, index);
		
		this.props.updateListItem([index, val])
	}




	getId() {
		return this.props.notes.length > 0 ? this.props.notes[this.props.notes.length - 1].id + 1 : 0
	}

	handleAddNoteClick() {
		let text = this.props.type === "list" ? this.props.listInputs : this.state.text;
		let newNote = {
			id: this.getId(),
			title: this.state.title,
			type: this.props.type,
			text: text,
			category: this.props.categoryName
		}
		this.props.addNote(newNote)
		this.setState({ text: "", title: "" })
		let stored = localStorage.hasOwnProperty("data") ? JSON.parse(localStorage.data).notes : [];
		let newStored = [...stored, newNote];
		localStorage.setItem("data", JSON.stringify({ "notes": newStored }))
		//after adding the note clear the data in all of inputs
		if(this.props.type === "list") {
			this.props.clearList();
		}
	}

	handleEnter(e) {
		if(e.which === 13 ) {
			this.handleAddNoteClick();
		}
	}

	render() {
		return (
			<div className="page-wrapper">
				<Header homepage={false} backLink="/"/>
				<div className="note-wrapper" >
					<div className="top-row">
						<p className="label">Title: </p>
						<input 
							value={this.state.title} 
							type="text" onKeyPress={(e) => this.handleEnter(e)} 
							onChange={(e)=>this.handleChange(e, "title")}/>
					</div>
					<div className="top-row">
						<p className="label" >Category: </p><CategorySetter/>
					</div>
					<div className="bottom-row">
						<p className="label" >Note: </p>
						{
							this.props.type === "plain" && (
								<textarea 
									value={this.state.text} 
									type="text" onKeyPress={(e) => this.handleEnter(e)} 
									onChange={(e)=>this.handleChange(e, "text")}/>
							)}
						{
							this.props.type === "list" && (
								<div className="list__wrapper">
									{this.props.listInputs.map((el, i) => (
										<ListInput key={i} index={i} changeHandler={this.handleMultiInputChange.bind(this)}/>
									))}
									<AddButton clickHandler={this.props.addListItem.bind(this)} title="Add list item" btnSize={50} size={50}/>
								</div>
							)
						}

					</div>
					<div className="button-row">
						<p className="label" ></p>
						<div className="add-note-btn" onClick={()=> this.handleAddNoteClick()}>
							Add Note
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNotePage))