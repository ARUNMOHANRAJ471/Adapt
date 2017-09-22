import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
const {hashHistory} = require('react-router');
import '../../../node_modules/react-html5video/dist/styles.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class childComponent extends React.Component {
  constructor() {
    super();
    this.redirectToDnd = this.redirectToDnd.bind(this);
    this.watchscenarioVideo = this.watchscenarioVideo.bind(this);
  }
  state = {}
  redirectToDnd() {
    $.ajax({
      url: '/users/currentScenario',
      type: 'PUT',
      data: {
        empId: cookies.get('empId'),
        scenarioId: this.props.scenarioId,
        scenarioName: this.props.scenarioName,
        domainName: this.props.domainName,
        loginId: cookies.get('loginId'),
        userName: cookies.get('username'),
        userType: cookies.get('userType')
      },
      success: function(data) {
        // console.log('success'+data);
      }.bind(this),
      error: function(err) {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
    hashHistory.push('/dnd');
  }
  watchscenarioVideo() {
    hashHistory.push('/watchscenarioVideo');
  }

  render() {
    let buttonclr = '';
    if (this.props.buttonStatus == 'Completed') {
      buttonclr = (
        <Button style={{
          marginTop: '-24%',
          marginRight: '5px',
          background: 'linear-gradient(to bottom, #61acc9, #0a548d)'
        }} disabled floated='right' scenarioId={this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription={this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Completed</Button>
      );
    } else if (this.props.buttonStatus == 'wip') {
      if (cookies.get('loginId') == this.props.loginid) {
        buttonclr = (
          <Button style={{
            marginTop: '-24%',
            marginRight: '5px',
            background: 'linear-gradient(to bottom, #61acc9, #0a548d)'
          }} floated='right' scenarioId={this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription={this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Proceed<Icon name='right chevron'/></Button>
        );
      } else {
        buttonclr = (
          <Button style={{
            marginTop: '-24%',
            marginRight: '5px',
            background: 'linear-gradient(to bottom, #61acc9, #0a548d)'
          }} disabled floated='right' scenarioId={this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription={this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Work in progress</Button>
        );
      }
    } else {
      buttonclr = (
        <Button style={{
          marginTop: '-24%',
          marginRight: '5px',
          background: 'linear-gradient(to bottom, #61acc9, #0a548d)'
        }} floated='right' scenarioId={this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription={this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Proceed<Icon name='right chevron'/></Button>
      );
    }
    return (
      <div floated='right'>
        {buttonclr}
      </div>
    );
  }
}

module.exports = childComponent;
