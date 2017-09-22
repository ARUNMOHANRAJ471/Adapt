import React, { Component, PropTypes } from 'react';

const style = {
  color: 'gray',
  border: '1px dashed gray',
  padding: '.5em',
  cursor: 'move'
};

const propTypes = {
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export function Item(props) {
  const { name, isDragging } = props;
  const opacity = isDragging ? 0 : 1;

  return (
    <div style={{ ...style, opacity }}>
      {name}
    </div>
  );
}

Item.propTypes = propTypes;

export function createItem(item, isDragging) {
  return <Item name={item.name} isDragging={isDragging}/>;
}
