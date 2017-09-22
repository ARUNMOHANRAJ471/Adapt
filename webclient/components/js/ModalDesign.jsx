import React from 'react';
import ButtonComponentStatus from './ButtonComponentStatus.jsx';
import {Dimmer, Header, Grid, Card} from 'semantic-ui-react'
class Component2 extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true,
      score: 0,
      negativescore: 0,
      preconditionNames: [],
      newDependencies: []
    }
  }
  componentWillMount() {
    let context;
    context = this;
    $.ajax({
      url: '/dnd/getScenarioDetails/' + context.props.scenarioId,
      type: 'GET',
      success: function(res) {
        context.setState({score: res.score.low, negativescore: res.negativescore.low, preConditions: res.precondition});
        context.getPreconditionNames();
      },
      error: function(err) {
        // console.log(err);
      }
    });
    context.getNewDependencies();
  }
// To get dependencies
  getNewDependencies() {
    let context = this;
    let data = {
      scenarioId: this.props.scenarioId
    };
    $.ajax({
      url: '/dnd/getNewDependencies',
      type: 'POST',
      data: data,
      success: function(res) {
        context.setState({newDependencies: res});
      },
      error: function(err) {
        // console.log(err);
      }
    });
  }
  // To load pre conditions
  getPreconditionNames() {
    let preconditionData = this.state.preConditions;
    let context = this;
    let result1 = [];
    let datax = {
      preconditionData: context.state.preConditions
    };
    $.ajax({
      url: '/dnd/getPreconditionNames',
      type: 'POST',
      traditional: true,
      data: {
        preconditionData: preconditionData
      },
      success: function(res) {
        res.map(function(item) {
          result1.push(item.properties.name);
        })
        context.setState({
          preconditionNames: result1
        }, function() {});
      }.bind(this),
      error: function(err) {}.bind(this)
    });
  }

  handleOpen = () => this.setState({active: true})
  handleClose = () => {
    this.setState({active: false});
    this.props.closeViewAllScenariodata();
  }
  render() {
    const {active} = this.state
    let context = this;
    let dep = 'No dependencies';
    if (this.state.newDependencies.length != 0) {
      dep = this.state.newDependencies.map((item, index) => {
        return <li>{item}</li>
      });
    }
    let displayname = '';
    if (this.props.status == 'wip') {
      displayname = (
        <p style={{
          paddingLeft: '1px',
          paddingRight: '10px',
          paddingBottom: '3px',
          color: '#6ce4f9',
          fontWeight: '600'
        }}>Selected by: {this.props.name}</p>
      );
    } else if (this.props.status == 'Completed') {
      displayname = (
        <p style={{
          paddingLeft: '1px',
          paddingRight: '10px',
          paddingBottom: '3px',
          color: '#6ce4f9',
          fontWeight: '600'
        }}>Completed by: {this.props.name}</p>
      );
    }
    return (
      // Display basic information about that user story
      <Dimmer active={active} onClickOutside={this.handleClose} page>
        <Grid>
          <Grid.Column width={3}/>
          <Grid.Column width={10}>
            <Card fluid id='txtalign' style={{
              padding: '20px',
              background: 'linear-gradient(to right, #1c567b, #080949)'
            }}>
              <Header as='h1' style={{
                color: 'white'
              }}>
                {this.props.scenarioName}
              </Header>
              <Grid id='txtclr'>
                <Grid.Column width={15} id='txtclr'>
                  <h4 style={{
                    color: '#6ce4f9'
                  }}>User story Description</h4>
                  <p style={{
                    paddingLeft: '2px',
                    paddingBottom: '3px',
                    color: 'white'
                  }}>{this.props.scenarioDescription}</p>
                  <h4 style={{
                    color: '#6ce4f9'
                  }}>Dependencies</h4>
                  <p style={{
                    paddingLeft: '2px',
                    paddingRight: '10px',
                    paddingBottom: '3px',
                    color: 'white'
                  }}>
                    {dep}
                  </p>
                  <div style={{
                    color: 'rgb(108, 228,249 )',
                    fontWeight: '300',
                    padding: '1.5%',
                    borderRadius: '5px',
                    margin: '-7% 1% 1% 45%',
                    width: '31%'
                  }}>MAXIMUM SCORE:
                    <span style={{
                      color: 'white'
                    }}>{this.state.score}</span>
                  </div>
                  <div style={{
                    color: 'rgb(108, 228,249 )',
                    fontWeight: '300',
                    paddingLeft: '1.5%',
                    borderRadius: '5px',
                    margin: '2% 1% 1% 45%',
                    width: '31%'
                  }}>NEGATIVE SCORE:
                    <span style={{
                      color: 'white'
                    }}>{this.state.negativescore}</span>
                  </div>
                  <p style={{
                    paddingLeft: '2px',
                    paddingRight: '10px',
                    paddingBottom: '3px',
                    color: '#6ce4f9',
                    fontWeight: '600'
                  }}>ID : {this.props.scenarioId}</p>
                  <div>{displayname}</div>
                </Grid.Column>
                <Grid.Column width={1} style={{
                  height: '100%'
                }}/>
              </Grid>
              <Grid>
                <Grid.Column width={13}></Grid.Column>
                <Grid.Column width={3}>
                  <ButtonComponentStatus scenarioId={this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription={this.props.scenarioDescription} video={this.props.video} status={this.props.status} loginid={this.props.loginid} domainName={this.props.domainName}/>
                </Grid.Column>
              </Grid>

            </Card>
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid>
      </Dimmer>
    );
  }
}

module.exports = Component2;
