import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import HardwareLeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

const SliderArrow = ({align, clickHandler}) => {
	return (
		<FloatingActionButton mini={true} className={"slider-arrow-"+align} onClick={clickHandler}>
			{(align==='left') ? (<HardwareLeftArrow />) : (<HardwareRightArrow />)}
		</FloatingActionButton>
	)
}

export default SliderArrow