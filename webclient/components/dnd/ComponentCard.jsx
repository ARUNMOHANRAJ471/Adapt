import React from 'react';
import {Card, Icon, Button, Popup, Checkbox, Label} from 'semantic-ui-react';
var sel = [];

class ComponentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      checked:this.props.card.checked,
      selected:[]
    }
  }
  toggle(){
    this.setState({ checked: !this.state.checked },function(){
      // //console.log('toggle',this.state.checked);
      this.props.selectComponent(this.props.card,this.state.checked);
    });
  }
  render() {
    let lColor = '';
    let checkbox = '';
    let cCategory = '';

    if(this.props.card.checked){
      checkbox = <Checkbox checked toggle style={{float:'right',marginRight:'-150%',marginTop:'0',marginBottom:'0'}}/>
    }
    else if(!this.props.card.checked){
      checkbox = <Checkbox toggle style={{float:'right',marginRight:'-150%',marginTop:'0',marginBottom:'0'}}/>
    }

    if(this.props.card.category == 'code'){
      lColor = '#127fdc';
      cCategory = 'Code';
    }
    else if(this.props.card.category == 'test'){
      lColor = '#465a65';
      cCategory = 'Test';
    }
    else if(this.props.card.category == 'infra'){
      lColor = '#b76602';
      cCategory = 'Infra';
    }
    else if(this.props.card.category == 'devops'){
      lColor = '#00a872';
      cCategory = 'Devops';
    }

    return (
      <Card style={{color:'black',textAlign:'left',textDecoration:'none'}} onClick={this.toggle.bind(this)}>
        <Label style={{
          marginLeft: "2%",
          marginRight: "50%",
          backgroundColor:lColor,
          borderColor:lColor
        }} ribbon>{cCategory}
        {checkbox}</Label>
        <Card.Content>
          <Card.Header style={{}}>{this.props.card.name}

          </Card.Header>
        <Card.Description>{this.props.card.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
module.exports = ComponentCard;
