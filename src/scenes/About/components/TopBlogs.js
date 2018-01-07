import data from './data/top_blogs'
import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import Heap from './Heap'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import {List} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import SvgIcon from 'material-ui/SvgIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SocialPerson from 'material-ui/svg-icons/social/person'
import HardwareLeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ContentSort from 'material-ui/svg-icons/content/sort'
import ActionDate from 'material-ui/svg-icons/action/date-range'
import ActionLike from 'material-ui/svg-icons/action/thumb-up'
import CommunicationComment from 'material-ui/svg-icons/communication/comment'
import ActionGroupWork from 'material-ui/svg-icons/action/group-work'
import {lightBlue800, amber800, blue500, greenA200} from 'material-ui/styles/colors'
import './data/style.css'

const styles = {
	autoplay: {
		bottom: '15px',
		right: '15px',
		position: 'absolute',
		zIndex: 1000,
	},
	dot: {
		padding: '10px',
		width: '48px',
		height: '48px',
	},
}

const OPEN_SOURCE_NAME = 'osg'
const INFORMATION_SECURITY_NAME = 'isg'
const COMPETITIVE_PROGRAMMING_NAME = 'cpg'
const DEVELOPERS_NAME = 'cod'

const OSGIcon = (props) => (
	<SvgIcon {...props}>
		<path id="osg" fill="#000000"
        d="M 35.80,46.38
           C 43.33,42.12 48.00,34.11 48.00,25.49
             48.00,12.26 37.23,1.49 24.00,1.49
             10.77,1.49 0.00,12.26 0.00,25.49
             0.00,34.11 4.67,42.11 12.20,46.38
             12.43,46.51 12.70,46.54 12.96,46.47
             13.21,46.40 13.43,46.23 13.56,46.00
             13.56,46.00 20.95,32.92 20.95,32.92
             21.22,32.44 21.05,31.83 20.57,31.56
             18.37,30.31 17.00,27.98 17.00,25.49
             17.00,21.63 20.14,18.49 24.00,18.49
             27.86,18.49 31.00,21.63 31.00,25.49
             31.00,27.98 29.63,30.31 27.42,31.56
             26.95,31.83 26.78,32.44 27.05,32.92
             27.05,32.92 34.44,46.00 34.44,46.00
             34.57,46.23 34.79,46.40 35.04,46.47
             35.13,46.49 35.22,46.51 35.31,46.51
             35.48,46.51 35.65,46.46 35.80,46.38 Z
           M 33.00,25.49
           C 33.00,20.53 28.96,16.49 24.00,16.49
             19.04,16.49 15.00,20.53 15.00,25.49
             15.00,28.37 16.41,31.07 18.75,32.76
             18.75,32.76 12.32,44.12 12.32,44.12
             5.93,40.11 2.00,33.06 2.00,25.49
             2.00,13.36 11.87,3.49 24.00,3.49
             36.13,3.49 46.00,13.36 46.00,25.49
             46.00,33.06 42.07,40.11 35.68,44.12
             35.68,44.12 29.25,32.76 29.25,32.76
             31.59,31.07 33.00,28.37 33.00,25.49 Z" />
	</SvgIcon>
)

const ISGIcon = (props) => (
	<SvgIcon {...props}>
		<path id="isg" fill="#000000"
        d="M 39.69,30.46
           C 39.69,39.12 32.65,46.15 24.00,46.15
             15.35,46.15 8.31,39.12 8.31,30.46
             8.31,26.31 10.00,22.30 12.92,19.37
             12.92,19.37 12.92,13.31 12.92,13.31
             12.92,6.99 17.89,1.85 24.00,1.85
             30.11,1.85 35.08,6.99 35.08,13.31
             35.08,13.31 35.08,19.37 35.08,19.37
             38.00,22.30 39.69,26.30 39.69,30.46 Z
           M 14.77,13.31
           C 14.77,13.31 14.77,17.77 14.77,17.77
             14.79,17.76 14.80,17.75 14.82,17.74
             15.11,17.53 15.40,17.34 15.69,17.15
             16.31,16.76 16.95,16.42 17.62,16.12
             18.43,15.76 19.28,15.48 20.14,15.26
             21.39,14.94 22.69,14.77 24.00,14.77
             24.95,14.77 25.89,14.86 26.81,15.03
             28.76,15.38 30.63,16.09 32.31,17.16
             32.45,17.24 32.59,17.34 32.73,17.43
             32.87,17.53 33.01,17.62 33.14,17.71
             33.17,17.73 33.20,17.75 33.23,17.77
             33.23,17.77 33.23,13.31 33.23,13.31
             33.23,8.01 29.09,3.69 24.00,3.69
             18.91,3.69 14.77,8.01 14.77,13.31
             14.77,13.31 14.77,13.31 14.77,13.31 Z
           M 27.69,28.61
           C 27.69,26.58 26.04,24.92 24.00,24.92
             21.96,24.92 20.31,26.58 20.31,28.61
             20.31,30.33 21.49,31.77 23.08,32.18
             23.08,32.18 23.08,35.08 23.08,35.08
             23.08,35.08 24.92,35.08 24.92,35.08
             24.92,35.08 24.92,32.18 24.92,32.18
             26.51,31.76 27.69,30.33 27.69,28.61 Z" />
	</SvgIcon>
)

const CPGIcon = (props) => (
	<SvgIcon {...props}>
		<path id="cpg" fill="#000000"
        d="M 23.86,7.76
           C 18.37,7.76 13.92,12.02 13.92,17.28
             13.92,22.54 18.37,26.80 23.86,26.80
             29.35,26.80 33.80,22.54 33.80,17.28
             33.80,12.02 29.35,7.76 23.86,7.76 Z
           M 33.33,29.50
           C 30.96,31.19 28.08,32.26 24.95,32.46
             24.59,32.48 24.23,32.51 23.86,32.51
             23.65,32.51 23.44,32.49 23.23,32.48
             20.06,32.36 17.14,31.37 14.71,29.73
             10.63,26.97 7.96,22.43 7.96,17.28
             7.96,8.87 15.08,2.05 23.86,2.05
             32.65,2.05 39.77,8.87 39.77,17.28
             39.77,22.29 37.23,26.73 33.33,29.50 Z
           M 14.71,29.73
           C 17.14,31.37 20.06,32.36 23.23,32.48
             23.23,32.48 15.11,44.26 15.11,44.26
             15.11,44.26 14.64,37.39 14.64,37.39
             14.64,37.39 7.86,39.67 7.86,39.67
             7.86,39.67 14.71,29.73 14.71,29.73 Z
           M 40.34,39.67
           C 40.34,39.67 33.56,37.39 33.56,37.39
             33.56,37.39 33.09,44.26 33.09,44.26
             33.09,44.26 24.95,32.46 24.95,32.46
             28.08,32.26 30.96,31.19 33.33,29.50
             33.33,29.50 40.34,39.67 40.34,39.67 Z" />
	</SvgIcon>
)

const CODIcon = (props) => (
	<SvgIcon {...props}>
		<path id="cod" fill="#000000"
        d="M 20.25,41.10
           C 20.25,41.10 29.65,7.43 29.65,7.43
             29.80,6.91 29.49,6.37 28.97,6.22
             28.44,6.07 27.90,6.38 27.75,6.90
             27.75,6.90 18.35,40.57 18.35,40.57
             18.20,41.09 18.51,41.63 19.03,41.78
             19.12,41.81 19.21,41.82 19.29,41.82
             19.73,41.82 20.13,41.54 20.25,41.10 Z
           M 1.68,24.71
           C 1.68,24.71 14.76,12.07 14.76,12.07
             15.15,11.69 15.16,11.06 14.78,10.67
             14.41,10.27 13.78,10.27 13.39,10.64
             13.39,10.64 0.30,23.29 0.30,23.29
             -0.09,23.66 -0.10,24.29 0.27,24.68
             0.47,24.88 0.72,24.98 0.98,24.98
             1.24,24.98 1.48,24.90 1.68,24.71 Z
           M 14.78,37.33
           C 15.16,36.94 15.15,36.31 14.76,35.93
             14.76,35.93 1.67,23.29 1.67,23.29
             1.27,22.91 0.65,22.92 0.27,23.32
             -0.10,23.71 -0.09,24.34 0.30,24.71
             0.30,24.71 13.39,37.35 13.39,37.35
             13.57,37.54 13.83,37.63 14.07,37.63
             14.33,37.63 14.59,37.54 14.78,37.33 Z
           M 47.72,24.68
           C 48.09,24.29 48.08,23.66 47.69,23.29
             47.69,23.29 34.60,10.64 34.60,10.64
             34.21,10.27 33.58,10.27 33.21,10.67
             32.83,11.06 32.84,11.69 33.23,12.07
             33.23,12.07 46.33,24.70 46.33,24.70
             46.52,24.89 46.77,24.98 47.02,24.98
             47.27,24.98 47.53,24.89 47.72,24.68 Z
           M 34.61,37.36
           C 34.61,37.36 47.70,24.71 47.70,24.71
             48.09,24.34 48.10,23.71 47.73,23.32
             47.35,22.92 46.72,22.91 46.33,23.29
             46.33,23.29 33.24,35.93 33.24,35.93
             32.85,36.31 32.84,36.94 33.22,37.33
             33.41,37.53 33.67,37.63 33.93,37.63
             34.17,37.63 34.42,37.54 34.61,37.36 Z" />
	</SvgIcon>
)

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
		if (clubs[i] === OPEN_SOURCE_NAME)	icon = <OSGIcon style={styles.dot} color={blue500} hoverColor={greenA200} viewBox='0 0 48 48' />
		else if (clubs[i] === INFORMATION_SECURITY_NAME)	icon = <ISGIcon style={styles.dot} color={blue500} hoverColor={greenA200} viewBox='0 0 48 48' />
		else if (clubs[i] === COMPETITIVE_PROGRAMMING_NAME)	icon = <CPGIcon style={styles.dot} color={blue500} hoverColor={greenA200} viewBox='0 0 48 48' />
		else if (clubs[i] === DEVELOPERS_NAME)	icon = <CODIcon style={styles.dot} color={blue500} hoverColor={greenA200} viewBox='0 0 48 48' />
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

const SortComponent = ({onChange, value, tooltip}) =>
	<IconMenu
		iconButtonElement={<IconButton tooltip={tooltip} touch={true}><ContentSort /></IconButton>}
		onChange={onChange}
		value={value}
	>
		<MenuItem 
			value="likes" 
			primaryText="Number of Likes" 
			rightIcon={<ActionLike />} 
		/>
		<MenuItem 
			value="comments" 
			primaryText="Number of comments" 
			rightIcon={<CommunicationComment />} 
		/>
		<MenuItem 
			value="timestamp" 
			primaryText="Recently published" 
			rightIcon={<ActionDate />} 
		/>
	</IconMenu>


class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			summarySize: 50,
			expanded: false,
		};
	}

	handleExpandChange = (expanded) =>
		this.setState({
			expanded: expanded
		});

	render() {
		const {title, avatar, author, timestamp, body, likes, comments, category, index} = this.props;
		const iconStyle = {
			width: '20px',
			height: '20px'
		}
		return (
			<Card 
				expanded={this.state.expanded}
				onExpandChange={this.handleExpandChange}
			>
				<CardHeader 
					title={<b>{author}</b>}
					style={(index%2 !== 0) ? {textAlign: "right"} : {}}
					textStyle={{paddingRight: "0px"}}
					subtitle={<div>In <b>{category}</b> - {new Date(timestamp).toLocaleString()}</div>}
					avatar={(avatar !== "") ? "images/" + avatar : <SocialPerson />}
					actAsExpander={true}
				/>
				<CardTitle
					title={title}
					style={{textAlign: "center"}}
					subtitle={
						<div>
							{likes} &nbsp;
							<ActionLike style={iconStyle} color={lightBlue800} /> &nbsp; | &nbsp;
							{comments.length} &nbsp;
							<CommunicationComment style={iconStyle} color={amber800} />
						</div>
					}
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true} style={{wordWrap: "break-word"}}>
					{body.slice(0, this.state.summarySize) + ((body.length > this.state.summarySize) ? " [...]" : "")}
				</CardText>
				<Divider />
			</Card>
		);
	}
}

class BlogsList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			valueSort: "likes"
		}
	}

	handleSortChange = (event, value) => {
		this.setState({
			valueSort: value,
		});
	}
	// Currently use partial sorting through Heaps. 
	// Time complexity: O({list.length} + {count}log({list.length} + {count}log({count}))
	sortBlogs = (list, sortBy, count) => {
		var arr = [], i, length, heapList
		if (sortBy === "timestamp") {
			heapList = new Heap(list, (a, b) =>
				new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime())
			for (i = 0, length = Math.min(list.length, count); i < length; i++) {
				arr.push(heapList.extractRoot())
			}
			arr.sort((b, a) => 
				new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
		}
		else if (sortBy === "comments") {
			heapList = new Heap(list, (a, b) =>
				a.comments.length > b.comments.length)
			for (i = 0, length = Math.min(list.length, count); i < length; i++) {
				arr.push(heapList.extractRoot())
			}
			arr.sort((b, a) => 
				a.comments.length - b.comments.length)
		}
		else if (sortBy === "likes") {
			heapList = new Heap(list, (a, b) =>
				a.likes > b.likes)
			for (i = 0, length = Math.min(list.length, count); i < length; i++) {
				arr.push(heapList.extractRoot())
			}
			arr.sort((b, a) => 
				a.likes - b.likes)
		}
		
		return arr
	}

	render() {
		const {title, list, count, cols} = this.props;
		const blogs = this.sortBlogs(list, this.state.valueSort, count)
		return (
			<GridTile
				cols={cols}
			>
			<AppBar
				title={title}
				iconElementRight={
					<SortComponent 
						onChange={this.handleSortChange} 
						value={this.state.valueSort}
						tooltip="Sort"
					/>
				}
				showMenuIconButton={false}
			/>
				<div className='blogs-list'>
					{blogs.map((blog, index) => 
						<Blog key={index} index={index} {...blog} />)}
				</div>
			</GridTile>
		)
	}
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