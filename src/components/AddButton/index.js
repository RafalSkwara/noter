import * as React from "react";
import { IconSearch, IconAdd } from '../Icons'

import "./styles.sass";




class AddButton extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
	}


	render() {
		
		return (
			<div 
				title={this.props.title} 
				className="add-button" 
				style={{width: this.props.btnSize, height: this.props.btnSize}}
				onClick={this.props.clickHandler}>
				<IconAdd size={this.props.size}/>
			</div>
		)
	}

}

export default AddButton