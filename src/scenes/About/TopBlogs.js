import React from 'react'
import data from './components/data/blogs'
import SliderArrow from './components/SliderArrowComponent'
import Dots from './components/DotsComponent'
import ClubSlide from './components/ClubSlideComponent'
import './components/TopBlogsStyle.css'

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
			clubs.push(<ClubSlide 
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