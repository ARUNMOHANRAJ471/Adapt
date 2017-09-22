import React from 'react';
import LogicCompStr from './logicalCompStructure.jsx';

class LogicalComponent extends React.Component {
	constructor () {
		super();
    this.getId = this.getId.bind(this);
	}
getId(id) {
	this.props.getId(id);
}
	render () {
		// map function to get the array value and
		// passing it to card to get the array of cards
		let context = this;
		let cards = this.props.compArray.map(function(item) {
				return (
					// sending data to child card
			<div>
					<LogicCompStr content={item.content} id={item.id} getId={context.getId}/>
			</div>
			);
		});
		return(
			// returning cards to add Scenario page
			<div>
			{cards}
		</div>
		);
	}
}
module.exports = LogicalComponent;
