import * as React from "react";
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { androidApps, iosSearch, androidArrowBack } from 'react-icons-kit/ionicons/'


export const IconHome = () => <Icon icon={home} />
export const IconMenu = (props) => <Icon icon={androidApps} size={props.size}/>
export const IconSearch = (props) => <Icon icon={iosSearch} size={props.size}/>
export const IconBack = (props) => <Icon icon={androidArrowBack} size={props.size}/>


