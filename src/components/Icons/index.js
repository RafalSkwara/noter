import * as React from "react";
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { ic_mode_edit } from 'react-icons-kit/md/'
import { androidApps, 
	iosSearch, androidArrowBack, 
	androidClose, androidDelete,
	androidAddCircle, 
	androidAdd, edit} from 'react-icons-kit/ionicons/'



export const IconHome = () => <Icon icon={home} />
export const IconMenu = (props) => <Icon icon={androidApps} size={props.size}/>
export const IconSearch = (props) => <Icon icon={iosSearch} size={props.size}/>
export const IconBack = (props) => <Icon icon={androidArrowBack} size={props.size}/>
export const IconClose = (props) => <Icon icon={androidClose} size={props.size}/>
export const IconDelete = (props) => <Icon icon={androidDelete} size={props.size}/>
export const IconAdd = (props) => <Icon icon={androidAddCircle} size={props.size}/>
export const IconEdit = (props) => <Icon icon={edit} size={props.size}/>


