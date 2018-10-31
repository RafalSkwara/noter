import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconMenu } from '../Icons'

import "./styles.sass";


const mapStateToProps = state => ({

});


const BigButton = (props) => (<NavLink className="button button--big" to={props.link}>{props.children}</NavLink>);

export default withRouter(connect(mapStateToProps)(BigButton))