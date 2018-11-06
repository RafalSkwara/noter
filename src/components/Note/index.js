import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconMenu } from '../Icons'
import { setNotes, removeNote } from '../../actions/actions';
import "./styles.sass";
import { IconDelete } from '../../components/Icons'
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

	removeItem(ev, id) {
		let e = ev;
		e.preventDefault();
		e.stopPropagation();
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
	}
	getSnippet(str) {
		return str.length >= 30 ? `${str.slice(0, 27)}...` : str;
	}


	render() {		
		return (
			<NavLink to={`/notes/${this.props.index}`}>

				<div className="note" >
					<div className="note__header">
						{this.props.title}
						<div className="note__delete flex-center" onClick={(e)=>this.removeItem(e, this.props.index)}><IconDelete size={28}/></div>
					</div>
					{/* <div className="note__text">
						{this.getSnippet(this.props.noteText)}
					</div> */}
				</div>
			</NavLink>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)