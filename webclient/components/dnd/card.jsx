import React from 'react';
import {Card, Icon, Button, Popup, Segment} from 'semantic-ui-react';

class MyCard extends React.Component {
  constructor() {
    super();
    this.state = {
      bColor: 'white'
    }
    this.remove = this.remove.bind(this);
  }
  remove() {
    //console.log('remove', this.props.position);
    this.props.remove(this.props.position);
  }
  render() {
    const {cardColor} = this.props;
    const {category} = this.props;
    const {checked} = this.props;

    var icon = '';
    var num = '';
    var cColor = '';
    var bColor = '';
    var tColor = 'white';
    var fSize = '14px';
    var nColor = '';
    var iColor = 'white';

    var num = '';

    var description = this.props.description;
    if (cardColor == '#f76a6a') {
      cColor = '#e02142';
      nColor = '#e02142';
      bColor = 'white';
      tColor = '#e02142';
      fSize = '20px';
      iColor = 'red';
      description = this.props.errorMsg;
    }
    if (cardColor == '') {
      if (category == 'code') {
        // tColor = '#ad4658';
        nColor = '#127fdc';
        // iColor = '#ad4658';
      } else if (category == 'test') {
        // tColor = '#465a65';
        nColor = '#465a65';
        // iColor = '#465a65';
      } else if (category == 'devops') {
        // tColor = '#6f781b';
        nColor = '#00a872';
        // iColor = '#6f781b';
      } else if (category == 'infra') {
        // tColor = '#0097a8';
        nColor = '#b76602';
        // iColor = '#0097a8';
      }
    }
    if (cardColor == '') {
      if (category == 'code') {
        bColor = '#127fdc'
      } else if (category == 'test') {
        bColor = '#465a65'
      } else if (category == 'devops') {
        bColor = '#00a872'
      } else if (category == 'infra') {
        bColor = '#b76602'
      }
    }
    var name = <span style={{
      fontSize: fSize,
      fontFamily: 'arial',
      color: tColor
    }}>
      <b style={{
        padding: '2px'
      }}>{this.props.name}</b>
    </span>

    if (this.props.place == 'right') {
      icon = <Button basic color={iColor} onClick={this.remove} basic size='mini' style={{
        margin: '0px',
        float: 'right',
        padding: '4px',
        fontSize: '14px',
        fontWeight: 'bolder',
        fontFamily: 'cursive'
      }}>X
      </Button>

    if (cardColor == '#f76a6a') {
      num = <Segment raised style={{
        float: 'left',
        fontSize: '13px',
        padding: '2px 5px',
        margin: '0px'
      }}>
        <span style={{
          color: nColor
        }}>
          <b>!</b>
        </span>
      </Segment>
    } else {
      num = <Segment raised style={{
        float: 'left',
        fontSize: '13px',
        padding: '2px 5px',
        margin: '0px'
      }}>
        <span style={{
          color: nColor
        }}>
          <b>{this.props.position + 1}</b>
        </span>
      </Segment>
    }
    }

    var card;
    if (checked)
      (card = <div>
        <Popup trigger={< Card style = {{ margin: 'auto',border:'2px solid '+tColor/*, borderLeft: '15px solid '+cColor*/,backgroundColor:bColor, textDecoration:'none' }} > <Card.Content style={{
          color: 'black'
        }}>
          {num}
          {name}
          {icon}
        </Card.Content> < /Card>} content={description} size='small' wide='huge'/>
      </div>)
    return (
      <div>
        {card}
      </div>
    );
  }
}
module.exports = MyCard;
