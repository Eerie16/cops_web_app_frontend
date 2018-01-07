import React from 'react'
import data from './data/top_blogs'
import BlogsList from './BlogsListComponent'
import {GridList} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import HardwareLeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ActionGroupWork from 'material-ui/svg-icons/action/group-work'
import './data/style.css'
import OSGIcon from './icons/osg-icon'
import ISGIcon from './icons/isg-icon'
import CPGIcon from './icons/cpg-icon'
import CODIcon from './icons/cod-icon'

const OPEN_SOURCE_NAME = 'osg'
const INFORMATION_SECURITY_NAME = 'isg'
const COMPETITIVE_PROGRAMMING_NAME = 'cpg'
const DEVELOPERS_NAME = 'cod'

const SliderArrow = ({align, clickHandler}) => {
	return (
		<FloatingActionButton mini={true} className={"slider-arrow-"+align} onClick={clickHandler}>
			{(align==='left') ? (<HardwareLeftArrow />) : (<HardwareRightArrow />)}
		</FloatingActionButton>
	)
}

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

class Club extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valueSort: "likes",
			featuredBlogs: [],
			nonFeaturedBlogs: []
		};
	}

	componentDidMount = () => {
		const {blogs} = this.props
		this.setState({
			featuredBlogs: blogs.filter((blog) => blog.featured),
			nonFeaturedBlogs: blogs.filter((blog) => !blog.featured)
		})
	}

	render() {
		const {id, name, title} = this.props
		const {featuredBlogs, nonFeaturedBlogs} = this.state
		return (
			<div className={'club-slide'} id={name}>
				<GridList cols={3} cellHeight='auto' padding={2} style={{flexDirection: (id%2===0) ? 'row' : 'row-reverse'}}>
					<BlogsList
						title="Featured"
						list={featuredBlogs}
						cols={2}
						count={5}
					/>
					<BlogsList
						list={nonFeaturedBlogs}
						cols={1}
						count={15}
					/>
				</GridList>
				<div className='text-effect'>
					<h1 className='club-title' style={{width: title.length+5+'ch'}}>{title}</h1>
				</div>
			</div>
		)
	}
}

class TopBlogs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			slides: 0,
			sliderIndex: 0,
			clubsName: [],
			clubsTitle: [],
			translateValue: 0
		}
	}

	componentDidMount = () => {
		let clubsName = []
		let clubsTitle = []
		for (let i = 0; i < data.length; i++) {
			clubsName.push(data[i].name)
			clubsTitle.push(data[i].title)
		}
		this.setState({
			slides: data.length,
			clubsName: clubsName,
			clubsTitle: clubsTitle
		})
	}

	renderClubs = () => {
		let clubs = []
		for (let i = 0; i < data.length; i++) {
			clubs.push(<Club 
							key={i} 
							id={i} 
							name={data[i].name} 
							title={data[i].title} 
							blogs={data[i].blogs} 
						/>)
		}
		return clubs
	}

	previousSlide = () => {
		const {sliderIndex, slides, translateValue} = this.state
		let newTranslateValue = (sliderIndex > 0) ? (translateValue + this.getSlideWidth()) : -((slides-1)*this.getSlideWidth())
		let newIndex = (sliderIndex > 0) ? sliderIndex - 1 : slides - 1
		this.setState({
			sliderIndex: newIndex,
			translateValue: newTranslateValue
		})
	}

	nextSlide = () => {
		const {sliderIndex, slides, translateValue} = this.state
		let newIndex = (sliderIndex < slides - 1) ? sliderIndex + 1 : 0
		let newTranslateValue = (sliderIndex < slides - 1) ? (translateValue - this.getSlideWidth()) : 0
		this.setState({
			sliderIndex: newIndex,
			translateValue: newTranslateValue
		})
	}

	dotClickHandler = (index) => {
		const {sliderIndex, translateValue} = this.state
		if (index !== sliderIndex) {
			let newTranslateValue = (index > sliderIndex) ? -(index*this.getSlideWidth()) : (translateValue + (sliderIndex-index)*this.getSlideWidth())
			this.setState({
				sliderIndex: index,
				translateValue: newTranslateValue
			})
		}
	}

	render() {
		const {translateValue} = this.state
		return (
			<div className='clubs-slider'>
				<div 
					className='club-wrapper'
					style={{
						transform: `translateX(${translateValue}px)`,
						transition: 'transform ease-out 0.45s'
					}}
				>
					{this.renderClubs()}
				</div>
				<Dots
					index={this.state.sliderIndex}
					clubs={this.state.clubsName}
					count={this.state.slides}
					clickHandler={this.dotClickHandler}
					tooltips={this.state.clubsTitle}
				/>
				<SliderArrow align='left' clickHandler={this.previousSlide} />
				<SliderArrow align='right' clickHandler={this.nextSlide} />
			</div>
		)
	}

	getSlideWidth = () => 
		document.querySelector('.club-slide').clientWidth
}

export default TopBlogs