import React from 'react';
import ModalDesign from './ModalDesign';
import {Button, Icon, Image, Card, Popup, Label} from 'semantic-ui-react'
class Component2 extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true,
      value1: 0
    }
  }

  abc() {
    this.setState({value1: 1})
  }
  closeViewAllScenariodata() {
    this.setState({value1: 0});
  }
  render() {
    const {active} = this.state
    let context = this;
    let btn = '';
    if(this.props.status == 'wip') {
      btn = (
        <Popup
        trigger={
          <Label as='a' corner style={{borderColor: '#ffb100'}}><Icon name='hourglass half'/></Label>
        } position='popup' content='Work In Progress' id='popup' />);

    } else if(this.props.status == 'notstarted') {
      btn = (<Popup
      trigger={<Label as='a' corner style={{borderColor: '#5b6a92'}}><Icon name='send'/></Label>
    } position='bottom center' content='Not started' style={{marginLeft: '0%'}}/>);
    }else{
      btn = (<Popup
      trigger={<Image label={{
        as: 'a',
        corner: 'right',
        icon: 'check circle',
          color:'green'
      }}/>} position='bottom center' content='Completed' style={{marginLeft: '12%'}}/>);
    }
    return (
        <Card style={{textDecoration: 'none'}} color='teal' raised={true} onClick={this.abc.bind(this)}>
          {btn}
          <Card.Content style={{textAlign: 'left'}}>
            <Card.Header style={{fontSize: '98%',marginRight: '13%'}}>
              <div>{this.props.scenarioName}</div>
            </Card.Header>
            <div>
            <Card.Meta style={{marginTop: '5px', marginBottom: '5px', color: '#736969'}}>
              ID:{this.props.scenarioId}
            </Card.Meta>
            </div>
          </Card.Content>
          <Button style={{backgroundColor: '#4c8bda', color: 'white'}} onClick={this.abc.bind(this) }>
            More<Icon name='arrow circle right' size='large'/>
          </Button>
          {this.state.value1 == 1
            ?
            <ModalDesign domainName={this.props.domainName} closeViewAllScenariodata={this.closeViewAllScenariodata.bind(this)} scenarioName={this.props.scenarioName} scenarioId={this.props.scenarioId} scenarioDescription={this.props.scenarioDescription} video={this.props.video} name={this.props.name} status={this.props.status} loginid={this.props.loginid}/>
            : null}
        </Card>
    );
  }
}

module.exports = Component2;
