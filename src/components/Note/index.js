import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconMenu } from '../Icons'
import { setNotes, removeNote } from '../../actions/actions';
import "./styles.sass";

const mapStateToProps = state => ({
	notes: state.mainReducer.notes
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setNotes: setNotes,
		removeNote: removeNote
	}, dispatch);
}
class Note extends React.Component {
	constructor(props) {
		super(props);
		
	}

	removeItem(id) {
		console.log(localStorage.data)
		this.props.removeNote(id)		
		let data = JSON.parse(localStorage.data),
			newData = {"notes": []};
		if(data.notes.length > 0) {
			for (let item of data.notes) {
				item.id !== id ? newData.notes.push(item):null;
			}
			localStorage.clear();
			localStorage.setItem("data", JSON.stringify(newData));
		}	
		console.log(localStorage.data)
	}
	getSnippet(str) {
		return str.length >= 30 ? `${str.slice(0, 27)}...` : str;
	}


	render() {
		console.log(this.props.noteText.slice(0, 27));
		
		return (
			<div className="note" onClick={()=>this.removeItem(this.props.index)}>
				<div className="note__header">
				<b>{this.props.title}</b>
				</div>
				<div className="note__text">
					{this.getSnippet(this.props.noteText)}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)