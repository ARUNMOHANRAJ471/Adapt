import React from 'react';
class LogicalComponentStructure extends React.Component {
	constructor () {
		super();
    this.sendId = this.sendId.bind(this);
	}
sendId() {
  this.props.getId(this.props.id);
}
	render () {
		return(
			// returning cards to add Scenario page
			<div className="cardComp" onClick={this.sendId}>
			<p>{this.props.content}</p>
			<p>{this.props.id}</p>
		</div>
		);
	}
}
module.exports = LogicalComponentStructure;
