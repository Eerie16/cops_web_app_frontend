import React from 'react'
import Blog from './BlogComponent'
import {GridTile} from 'material-ui/GridList'
import Heap from './Heap'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import ContentSort from 'material-ui/svg-icons/content/sort'
import ActionDate from 'material-ui/svg-icons/action/date-range'
import ActionLike from 'material-ui/svg-icons/action/thumb-up'
import CommunicationComment from 'material-ui/svg-icons/communication/comment'

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

export default BlogsList