import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import internalData from '../../assets/internalData.json'
import { IconClose, IconAddBig } from '../Icons'
import { setCategories } from '../../actions/actions';
import { ChromePicker } from 'react-color';
import BigButton from '../BigButton'
import "./styles.sass";

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setCategories: setCategories,
	}, dispatch);
}

class CategoryModal extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			textColor: "#FFFFFF",
			backgroundColor: "#000000",
			name: '',
			type: 'plain',
			textColorModal: false,
			bgColorModal: false,
			success: false
		}
		// this.updateBgColor = this.updateBgColor.bind(this)
		// this.updateTextColor = this.updateTextColor.bind(this)
	}

	updateType(e){
		let val = e.target.value
		this.setState({type: val})
	}
	updateBgColor(color, event){
		this.setState({backgroundColor: color.hex})
	}

	updateTextColor(color, event){
		this.setState({textColor: color.hex})
	}

	updateName(e){
		let val = e.target.value
		this.setState({name: val})
	}

	closeModalsOnClick(e) {
		let ev = e;
		console.log(ev.target.tagName);
		//all conditions that should prevent closing the modals
		let condition1 = ev.target.classList.contains('modal-toggle') ? true : false;
		let condition2 = ev.target.classList.contains('saturation-black') ? true : false;
		let condition3 = ev.target.tagName==="svg" ? true : false;
		let condition4 = ev.target.tagName==="INPUT" ? true : false;
		( condition1 || condition2 || condition3 || condition4)
		? null
		: this.hideModals();
	}

	hideModals() {
		this.setState({
			textColorModal: false,
			bgColorModal: false,
		});		
		console.log('modals hidden');
		
	}

	showModal(modal) {
		this.hideModals();
		this.setState({
			[modal]: true
		});	
		console.log(`modal ${modal} shown`);
			
	}

	addCategory() {
		let data = JSON.parse(localStorage.data);
		const newCategory = {
			"id": data.categories.length || 0,
			"name": this.state.name,
			"bg-color": this.state.backgroundColor,
			"text-color": this.state.textColor,
			"type": this.state.type
		}
		if(this.state.name.length > 0) {
			if (data.categories === undefined ) {
				data.categories = [newCategory];
			} else {
				data.categories.push(newCategory);
			}
			localStorage.setItem("data", JSON.stringify(data));
			this.props.setCategories(data.categories)
			this.setState({
				name: '',
				success: true
			})
			setTimeout(() => {
				this.setState({
					success: false
				})
			}, 2000);
		} 
		
	}


	render() {
		const options = internalData.types;
		return (
				<div className="category-modal-wrapper" onClick={(e) => this.closeModalsOnClick(e)}>
					<div className="category-modal">
						<div className="category-modal__header">
							<div className="category-modal__close flex-center"  onClick={this.props.closeHandler}>
								<IconClose size={28}/>
							</div>
						</div>
						<div className="category-modal__form">
							<div className="category-modal__row">
								<div className="category-modal__label">Name</div>
								<div className="category-modal__picker">
									<input 
										value={this.state.name}
										onChange={ (e) => this.updateName(e) }/>
								</div>
							</div>
							<div className="category-modal__row">
								<div className="category-modal__label">Type</div>
								<div className="category-modal__picker">
									<select
										value={this.state.type}
										onChange={ (e) => this.updateType(e) }>
										{
											options.map((option, i) => (<option value={option} key={i}> {option} </option>))
										}
									</select>
								</div>
							</div>
							<div className="category-modal__row">
								<div className="category-modal__label">Text Color</div>
								<div className="category-modal__picker">
									<div 
										onClick={()=>this.showModal("textColorModal")}
										className="modal-toggle flex-center" 
										style={{backgroundColor: this.state.textColor}}>
									</div>
									{this.state.textColorModal && (<div 
										className="modal-wrapper"
										>
										<ChromePicker
											disableAlpha 
											color={this.state.backgroundColor} 
											onChangeComplete={ (col, e) => this.updateTextColor(col, e) } />
									</div>)
									
									}
								</div>
							</div>
							<div className="category-modal__row">
								<div className="category-modal__label">Background Color</div>
								<div className="category-modal__picker">
									<div 
										className="modal-toggle flex-center"
										onClick={()=>this.showModal("bgColorModal")} 
										style={{backgroundColor: this.state.backgroundColor}}>
									</div>
									{this.state.bgColorModal && (<div 
										className="modal-wrapper"
										>
										<ChromePicker
											disableAlpha 
											color={this.state.backgroundColor} 
											onChangeComplete={ (col, e) => this.updateBgColor(col, e) } />
									</div>)
									
									}
								</div>
							</div>
							<div className="category-modal__row no-color">
								<div className="category-add" onClick={() => this.addCategory() }>Add Category</div>
							</div>
						</div>
					</div>
				</div>
			)
	}

}

export default withRouter(connect(null, mapDispatchToProps)(CategoryModal))