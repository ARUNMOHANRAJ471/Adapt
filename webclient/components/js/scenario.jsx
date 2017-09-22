import React from 'react';
let Index = require('./scenarioStructure.jsx');
import {
  Icon,
  Button,
  Grid
} from 'semantic-ui-react';
import ViewAllScenariodata from './viewAllScenariodata';

class Component2 extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true,
      values: 0,
      zzz: ''
    }
  }
  // open dimmer
  abcde() {
    this.setState({values: 1});
  }
  // close dimmer
  closeViewAllScenariodata() {
    this.setState({values: 0});
  }
  render() {
    let scenario = <Index result={this.props.result} buttonStatus={this.props.buttonStatus} domainName={this.props.domainName}/>
    return (
      <div>
        {this.state.values == 1
          ? <ViewAllScenariodata closeViewAllScenariodata={this.closeViewAllScenariodata.bind(this)} resultall={this.props.resultall} buttonStatus={this.props.buttonStatus} domainName={this.props.domainName}/>
          : null}
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={7}>
              <div id='accordionPosition'>
                {this.props.result.length > 0
                  ? <div style={{
                      marginTop: '-38%',
                      fontFamily: 'Arial'
                    }}>
                      <h2 style={{
                        fontSize: '148%'
                      }}>Select your User Story
                        <Button floated='right' onClick={this.abcde.bind(this)}><Icon name='bars'/></Button>
                      </h2>
                      {scenario}
                    </div>
                  : null}
              </div>
            </Grid.Column>
            <Grid.Column/>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
module.exports = Component2;
