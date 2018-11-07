import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addNote, 
	addListItem, updateListItem, 
	clearList, updateNote,
	activateCategory, setList } from '../actions/actions';
import "../view_styles/EditNotePage.sass";

import Header from '../components/Header';
import AddButton from '../components/AddButton';
import ListInput from '../components/ListInput';
import {IconSave} from '../components/Icons';
import CategorySetter from '../components/CategorySetter';
import Note from '../components/Note';


const mapStateToProps = state => ({
	notes: state.notesReducer.notes,
	categories: state.mainReducer.categories,
	category: state.mainReducer.activeCategory[0].id,
	categoryName: state.mainReducer.activeCategory[0].name,
	type: state.mainReducer.activeCategory[0].type,
	listInputs: state.mainReducer.listInputs,
	activeCategory: state.mainReducer.activeCategory
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addNote: addNote,
		addListItem: addListItem,
		updateListItem: updateListItem,
		clearList: clearList,
		activateCategory: activateCategory,
		setList: setList,
		updateNote: updateNote
	}, dispatch);
}


class EditNotePage extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.notes[this.props.match.params.id].title,
			text: this.props.notes[this.props.match.params.id].text,
			id: this.props.match.params.id,
			type: this.props.notes[this.props.match.params.id].type,
			note: [this.props.notes[this.props.match.params.id]]
		}
	}

	
	componentDidMount() {
		let cat = this.props.categories.filter(category => category.name === this.state.note[0].category)[0]
		this.props.activateCategory(cat.id)
		this.props.setList(this.state.text)
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

	handleUpdateNoteClick() {
		let text = this.props.type === "list" ? this.props.listInputs : this.state.text;
		let newNote = {
			id: Number(this.state.id),
			title: this.state.title,
			type: this.props.type,
			text: text,
			category: this.props.categoryName
		}
		// this.setState({ text: "", title: "" })
		let stored = JSON.parse(localStorage.data).notes;
		stored = stored.map( el => {
			if (el.id === newNote.id) {
				return newNote
			} else { return el}
		})
		this.props.updateNote(newNote)
		localStorage.setItem("data", JSON.stringify({ "notes": stored }))
		//after adding the note clear the data in all of inputs

	}

	handleEnter(e) {
		if(e.which === 13 ) {
			this.handleAddNoteClick();
		}
	}

	render() {
		const noteObj = this.state.note;
		return (
			<div className="page-wrapper">
				<Header homepage={false} backLink={`/notes/${this.state.id}`}/>
				<div className="note-wrapper" >
					<div className="top-row">
						<p className="label">Title: </p>
						<input 
							value={this.state.title} 
							type="text" onKeyPress={(e) => this.handleEnter(e)} 
							onChange={(e)=>this.handleChange(e, "title")}/>
						<div title="Save Note" className="add-note-btn flex-center" onClick={() => this.handleUpdateNoteClick()}>
							<p>Save</p>
							<IconSave size={32} />
						</div>
					</div>
					<div className="top-row category-row">
						<p className="label" >Category: </p><CategorySetter/>
					</div>
					<div className="bottom-row">
						<p className="label" >Note: </p>
						{
							this.props.type === "plain" && (
								<textarea 
									value={this.state.text} 
									type="text"  
									onChange={(e)=>this.handleChange(e, "text")}/>
							)}
						{
							this.props.type === "list" && (
								<div className="list__wrapper">
								{
									this.props.listInputs.map((el, i) => (
										<ListInput key={`list-input-${i}`} index={i} changeHandler={this.handleMultiInputChange.bind(this)} defVal={el}/>
									))}
								
							
								
									<AddButton clickHandler={this.props.addListItem.bind(this)} title="Add list item" btnSize={50} size={50}/>
								</div>
							)
						}

					</div>
					<div className="button-row">
						<p className="label" ></p>
						
					</div>
				</div>
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditNotePage))