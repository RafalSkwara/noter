import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { setNotes, removeNote } from '../actions/actions';
import "../view_styles/NotePage.sass";
import Header from '../components/Header';
import Note from '../components/Note';
import { IconClose, IconDelete, IconEdit, IconCheck, IconCheckEmpty } from '../components/Icons'


import internalData from '../assets/internalData.json'


const mapStateToProps = state => ({
	notes: state.notesReducer.notes,
	categories: state.mainReducer.categories
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setNotes: setNotes,
		delete: removeNote
	}, dispatch);
}


class NotePage extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
	}


	componentWillMount() {
		// check if any data present in local Storage
		// if no, fill it with sample data
		if(!localStorage.hasOwnProperty("data")) {
			let d = JSON.parse(localStorage.data)
			this.props.setNotes(d.notes)
		}
	}
	
	deleteHandler(e, id) {
		this.props.delete(id)
	}

	render() {
		let id = Number(this.props.match.params.id), notes = this.props.notes;
		let note = notes.filter(el => el.id == Number(id))[0];
		console.log(note);
		
		const category = note ? this.props.categories.filter(el => el.name === note.category)[0] :null;
		let styles = note ? {
			backgroundColor: category["bg-color"],
			color: category["text-color"]
		} : {}
		
		return (
			<div className="page-wrapper">
				<Header homepage={false} backLink="/notes"/>
				<div className="single-note-wrapper" >
					<div className="note__operations">
						<p className="note__category flex-center" 
							style={styles}>
							{note && note.category}
						</p>
						<div className="note__icons">
							<NavLink to={`/edit/${id}`}>
								<div className="note__edit flex-center"><IconEdit size={32} /></div>
							</NavLink>
							<NavLink to="/notes" onClick={(e) => this.deleteHandler(e, id)}>
								<div className="note__delete flex-center" >
									<IconDelete size={32}/>
								</div>
							</NavLink>
						</div>
						
					</div>
					<div className="note__title">
						{note && note.title}
					</div>
					<div className="note__content">
						{note 
							? Array.isArray(note.text) 
								? (<ul>
									{note.text.map((bullet, i) => bullet.length > 0 
										? (<li key={`bullet-${i}`}>
											<IconCheckEmpty size={32} />
											<p>{bullet}</p>
											</li>)
										: null)}
								</ul>) 
								: note.text 
							: null} 
					</div>
					
				</div>
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotePage))