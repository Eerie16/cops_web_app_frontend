import React from 'react'
import BlogsList from './BlogsListComponent'
import {GridList} from 'material-ui/GridList'

class ClubSlide extends React.Component {
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

export default ClubSlide