import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Card from './card.jsx';
// import {Card} from 'semantic-ui-react';

const style = {
  border: '1px dashed black',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const boxSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      description:props.description,
      cardColor:props.cardColor,
      category:props.category
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      props.addCard(item.id,item.name,item.description,item.cardColor,item.category);
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,

};

class Box extends Component {

  render() {
    // //console.log('box',this.props.description);

    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const {description} = this.props;
    const {cardColor} = this.props;
    const {category} = this.props;

    return (
      connectDragSource(
        <div>
          <Card name={name} description={description} cardColor={cardColor} category={category}/>
        </div>
        )
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(Box);
