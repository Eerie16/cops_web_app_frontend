import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionGroupWork from 'material-ui/svg-icons/action/group-work'
import OSGIcon from './icons/osg-icon'
import ISGIcon from './icons/isg-icon'
import CPGIcon from './icons/cpg-icon'
import CODIcon from './icons/cod-icon'

const OPEN_SOURCE_NAME = 'osg'
const INFORMATION_SECURITY_NAME = 'isg'
const COMPETITIVE_PROGRAMMING_NAME = 'cpg'
const DEVELOPERS_NAME = 'cod'

const Dots = ({index, clubs, count, clickHandler, tooltips}) => {
	let dots = []
	for (let i = 0; i < count; i++) {
		let icon
		if (clubs[i] === OPEN_SOURCE_NAME)	icon = <OSGIcon viewBox='0 0 48 48' />
		else if (clubs[i] === INFORMATION_SECURITY_NAME)	icon = <ISGIcon viewBox='0 0 48 48' />
		else if (clubs[i] === COMPETITIVE_PROGRAMMING_NAME)	icon = <CPGIcon viewBox='0 0 48 48' />
		else if (clubs[i] === DEVELOPERS_NAME)	icon = <CODIcon viewBox='0 0 48 48' />
		else	icon = <ActionGroupWork />
		dots.push(
			<IconButton 
				key={i} 
				className={'dot'.concat((i===index) ? '-active' : '')} 
				onClick={(e) => clickHandler(i)}
				tooltip={(i===index) ? '' : tooltips[i]}
				tooltipPosition='top-center'
			>
			{icon}
			</IconButton>
		)
	}
	return (
		<div className='dots-wrapper'>
			{dots}
		</div>
	)
}

export default Dots