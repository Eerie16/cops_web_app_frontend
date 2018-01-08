import React from 'react'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import SocialPerson from 'material-ui/svg-icons/social/person'
import ActionLike from 'material-ui/svg-icons/action/thumb-up'
import CommunicationComment from 'material-ui/svg-icons/communication/comment'
import {lightBlue800, amber800} from 'material-ui/styles/colors'

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
		const {title, avatar, author, timestamp, body, likes, comments, tags, index} = this.props;
		const iconStyle = {
			width: '20px',
			height: '20px'
		}
		return (
			<Card 
				expanded={this.state.expanded}
				onExpandChange={this.handleExpandChange}
				className='blog'
			>
				<CardHeader 
					title={<b>{author}</b>}
					style={(index%2 !== 0) ? {textAlign: "right"} : {}}
					textStyle={{paddingRight: "0px"}}
					subtitle={<div>In <b>{tags[0]}</b> - {new Date(timestamp).toLocaleString()}</div>}
					avatar={(avatar !== "") ? "images/" + avatar : <SocialPerson style />}
					actAsExpander={true}
					className={'blog-header-' + ((index%2 !== 0) ? 'right' : 'left')}
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
					<p class="blog-tags">{tags.length>1 ? 'Tags:' : 'Tag:'} {tags.join(', ')}</p>
					<p>{body.slice(0, this.state.summarySize) + ((body.length > this.state.summarySize) ? " [...]" : "")}</p>
				</CardText>
				<Divider />
			</Card>
		);
	}
}

export default Blog