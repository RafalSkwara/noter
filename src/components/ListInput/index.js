import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconSearch, IconClose, IconDelete } from '../Icons';
import {deleteListItem} from '../../actions/actions';
import "./styles.sass";
import { map } from "react-icons-kit/ionicons";


const mapStateToProps = state => ({
	notes: state.mainReducer.notes
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		deleteListItem: deleteListItem
	}, dispatch);
}
class ListInput extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

	}

	clearInput(){
		this.setState({input: ''})
		document.querySelector('.search-bar input').focus()
	}



	render() {
		return (
			<div className="list__item-wrapper">
				<input className="list__item"
					type="text"
					onChange={(e) => this.props.changeHandler(e, this.props.index)}
				/>
				<div className="delete-list-item flex-center" onClick={() => this.props.deleteListItem(this.props.index)}>
					<IconClose size={32}/>
				</div>
				<div className="delete-list-item flex-center" onClick={() => this.props.deleteListItem(this.props.index)}>
					<IconDelete size={32}/>
				</div>
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListInput))