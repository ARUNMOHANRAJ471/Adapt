import React, { Component } from 'react';
import Box from './Box';

class ComponentCollection extends Component {
  render() {
    //console.log('inside compcollection',this.props.compArray);
    let aqw = this.props.compArray;
    //console.log(typeof aqw);
    let aaa = aqw.map(function(item){
      return (<div><Box id={item.componentId} name={item.componentName} addCard={this.props.addCard} place='left'/></div>);
    });
    return (<div>{aaa}</div>);
  }
}

module.exports = ComponentCollection;
