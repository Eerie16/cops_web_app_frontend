import data from './data/top_blogs';
import React from 'react';
import MobileTearSheet from './MobileTearSheet';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort';
import ActionDate from 'material-ui/svg-icons/action/date-range';
import ActionLike from 'material-ui/svg-icons/action/thumb-up';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import SocialPerson from 'material-ui/svg-icons/social/person';
import {lightBlue800, amber800} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar'
import Heap from './Heap';

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
	// Currently use partial sorting through Heaps. 
	// Time complexity: O({list.length} + {count}log({list.length} + {count}log({count}))
	sortBlogs = (list, sortBy, count) => {
		var arr = [], i, length, heapList;
		if (sortBy === "timestamp") {
			heapList = new Heap(list, (a, b) =>
				new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime());
			for (i = 0, length = Math.min(list.length, count); i < length; i++) {
				arr.push(heapList.extractRoot());
			}
			arr.sort((b, a) => 
				new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
		}
		else if (sortBy === "comments") {
			heapList = new Heap(list, (a, b) =>
				a.comments.length > b.comments.length);
			for (i = 0, length = Math.min(list.length, count); i < length; i++) {
				arr.push(heapList.extractRoot());
			}
			arr.sort((b, a) => 
				a.comments.length - b.comments.length)
		}
		else if (sortBy === "likes") {
			heapList = new Heap(list, (a, b) =>
				a.likes > b.likes);
			for (i = 0, length = Math.min(list.length, count); i < length; i++) {
				arr.push(heapList.extractRoot());
			}
			arr.sort((b, a) => 
				a.likes - b.likes)
		}
		
		return arr
	}

	render() {
		const {list, sortBy, count} = this.props;
		const blogs = this.sortBlogs(list, sortBy, count);
		return (
			<List style={{maxHeight: '90%', overflow: 'auto'}}>
			{blogs.map((blog, index) => 
				<Blog key={index} index={index} {...blog} />)}
			</List>
		);
	}
} 

class TopBlogs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valueSort: "likes",
			blogsCount: 10
		};
	}

	handleSortChange = (event, value) => {
		this.setState({
			valueSort: value,
		});
	}

	render() {
		return (
			<div className="top-blogs">
				<MobileTearSheet height="700px">
					<AppBar
						title="Top Blogs"
						iconElementRight={
							<SortComponent 
								onChange={this.handleSortChange} 
								value={this.state.valueSort}
								tooltip="Sort"
							/>
						}
						showMenuIconButton={false}
					/>
					<BlogsList 
						list={data} 
						sortBy={this.state.valueSort} 
						count={this.state.blogsCount} 
					/>
				</MobileTearSheet>
			</div>
		);
	}
}
export default TopBlogs