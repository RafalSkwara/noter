import { hot } from "react-hot-loader"
import * as React from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { setNotes, setCategories, activateCategory } from '../src/actions/actions'
import { AnimatedSwitch } from 'react-router-transition';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect } from 'react-router-dom'

import HomePage from './views/HomePage'
import ViewNotesPage from './views/ViewNotesPage'
import NotePage from './views/NotePage'
import AddNotePage from './views/AddNotePage'
import "./view_styles/theme.sass";
import { map } from "react-icons-kit/ionicons";
import internalData from "./assets/internalData.json";

const mapStateToProps = state => ({
	notes: state.mainReducer.notes,
	category: state.mainReducer.activeCategory
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setNotes: setNotes,
		setCategories: setCategories,
		activateCategory: activateCategory
	}, dispatch);
}
class App extends React.Component {
    // eslint-disable-line react/prefer-stateless-function
	;
	componentWillMount() {
		if(localStorage.hasOwnProperty("data")) {
			this.props.setNotes(JSON.parse(localStorage.data).notes)
			let catTemp = JSON.parse(localStorage.data).categories
				if (catTemp !== undefined) {				
					this.props.setCategories(JSON.parse(localStorage.data).categories)
				} else {
					this.props.setCategories(internalData.categories)
				}
		} else {
			localStorage.setItem("data", JSON.stringify(internalData));
			this.props.setCategories(JSON.parse(localStorage.data).categories)
		}
		this.props.activateCategory(0)
	}

	
    render() {
		const timeout = 1000;
		return (
			<Router basename={"/noter"} > 
			{/* change the string in basename to "/" for development */}
				<AnimatedSwitch
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}
					className="switch-wrapper"
					>
						<Route path={"/add-note"} component={AddNotePage}/>
						<Route path={"/notes/:id"} component={NotePage}/>
						<Route path={"/notes"} component={ViewNotesPage}/>
						<Route path={"/"} exact component={HomePage}/>
						<Redirect from={"*"} to={"/"} />
					</AnimatedSwitch>
			</Router>
		)
	}

}

export default withRouter(hot(module)(connect(mapStateToProps, mapDispatchToProps)(App)))
