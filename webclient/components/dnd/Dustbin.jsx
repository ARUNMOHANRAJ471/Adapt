import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Card from './card';
import Reorder from './reorder.jsx';
import {Label} from 'semantic-ui-react';

const style = {
  minHeight: '250px',
  width: '100%',
  padding:'0px',
  margin:'0px',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  backgroundImage:'C:/Users/th351985/Desktop/biggridofdots.gif'
};

const boxTarget = {
  drop() {
    return { name: 'Dustbin' };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};


class Dustbin extends Component {

  changeCard(cards)
  {
    this.props.changeCard(cards);
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    let text = '';
    if(this.props.allCards.length == 0){
      text = <p style={{marginTop: '10%',marginBottom: 10+'px', fontSize:18+'px', color:'#c3c5c9'}}>Drag and drop your components to create your workflow here</p>
    }

    return connectDropTarget(
      <div style={{ ...style}}>
        {text}
          <Reorder allCards={this.props.allCards} changeCard={this.changeCard.bind(this)}/>
  </div>,
    );
  }
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(Dustbin);
