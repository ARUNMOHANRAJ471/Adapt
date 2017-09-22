import React from 'react';
import {Card, Icon, Button, Popup, Segment} from 'semantic-ui-react';

class MyCard extends React.Component {
  constructor() {
    super();
    this.state={
      bColor:'white'
    }
    this.remove = this.remove.bind(this);
  }
  remove() {
    //console.log('remove',this.props.position);
    this.props.remove(this.props.position);
  }
  render() {
    const {cardColor} = this.props;
    const {category} = this.props;
    const {checked} = this.props;

    var cColor = '';
    var bColor = '';
    var tColor = 'white';
    var fSize = '14px';
    var nColor = '';
    var iColor = 'white';

    var description = this.props.description;
    if (cardColor == '') {
      if (category == 'code') {
        nColor = '#ad4658';
      } else if (category == 'test') {
        nColor = '#465a65';
      } else if (category == 'devops') {
        nColor = '#6f781b';
      } else if (category == 'infra') {
        nColor = '#0097a8';
      }
    }
    if (cardColor == '') {
      if (category == 'code') {
        bColor = '#ad4658'
      } else if (category == 'test') {
        bColor = '#465a65'
      } else if (category == 'devops') {
        bColor = '#6f781b'
      } else if (category == 'infra') {
        bColor = '#0097a8'
      }
    }
    var name = <span style={{
      fontSize: fSize,
      fontFamily:'arial',
      color:tColor
    }}><b style={{padding:'2px'}}>{this.props.name}</b></span>

    var icon = '';
    var num = '';
    if (this.props.place == 'right') {
      icon = <Button basic color={iColor} onClick={this.remove} basic size='mini' style={{
        margin: '0px',
        float: 'right',
        padding: '4px',
        fontSize: '14px',
        fontWeight: 'bolder',
        fontFamily:'cursive'
      }}>X
    </Button>


      num = <Segment raised style={{
        float: 'left',
        fontSize: '13px',
        padding:'2px 5px',
        margin:'0px'
      }}><span style={{color:nColor}}><b>{this.props.position + 1}</b></span></Segment>
    }

    var card;
    card = <div>
        <Popup trigger={
        <Card style = {{ margin: 'auto',border:'2px solid '+tColor,backgroundColor:bColor, textDecoration:'none' }} >
           <Card.Content style={{color: 'black'}}>
        {num}
        {name}
        {icon}
      </Card.Content>
    </Card>} content={description} size='small' wide='huge'/>
</div>
    return (
      <div>
        {card}
      </div>
    );
  }
}
module.exports = MyCard;
