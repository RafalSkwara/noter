import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { setNotes } from '../actions/actions';
import "../view_styles/ViewNotesPage.sass";
import Header from '../components/Header';
import Note from '../components/Note';

import internalData from '../assets/internalData.json'


const mapStateToProps = state => ({
	notes: state.mainReducer.notes
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setNotes: setNotes
	}, dispatch);
}


class ViewNotesPage extends React.Component {
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
	

	render() {
		return (
			<div className="page-wrapper">
				<Header homepage={false}/>
				<div className="note-wrapper" >
					{this.props.notes.length > 0 
						? this.props.notes.map((el, i) => (
							<Note 
								key={el.id} 
								index={el.id} 
								noteText={el.text} 
								type={el.type}
								title={el.title}/>
						))
						: "There are no notes yet"
					}
				</div>
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewNotesPage))