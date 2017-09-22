import React from 'react';
import ButtonComponent from './ButtonComponent.jsx';
import '../../../node_modules/react-html5video/dist/styles.css';

class childComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    let scenarioId = this.props.scenarioId;
    let buttonValues = '';
    let context = this;
    let idvalue = '' + scenarioId;
    let domainName = this.props.domainName;
    // Check the status of that user story
    if (this.props.status == 'Completed') {
      buttonValues = (<ButtonComponent scenarioId={context.props.scenarioId}
        scenarioName={context.props.scenarioName}
        scenarioDescription={context.props.scenarioDescription}
        video={context.props.video} buttonStatus='Completed'
        domainName={this.props.domainName} loginid={this.props.loginid}/>);
    } else if (this.props.status == 'wip') {
      buttonValues = (<ButtonComponent scenarioId={this.props.scenarioId}
        scenarioName={context.props.scenarioName}
        scenarioDescription={this.props.scenarioDescription}
        video={this.props.video} buttonStatus='wip'
        domainName={this.props.domainName} loginid={this.props.loginid}/>)
    } else {
      buttonValues = (<ButtonComponent scenarioId={this.props.scenarioId}
        scenarioName={context.props.scenarioName}
        scenarioDescription={this.props.scenarioDescription}
        video={this.props.video} buttonStatus='notstarted' domainName={this.props.domainName}
        loginid={this.props.loginid}/>);
    }
    return (
      <div>
        {buttonValues}
      </div>
    );
  }
}

module.exports = childComponent;
