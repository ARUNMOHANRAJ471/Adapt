import React from 'react';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import {
  Grid,
  Card,
  Popup,
  Label,
  Icon,
  Segment
} from 'semantic-ui-react';
import Main from './Main.jsx';
class StageComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      stage: [],
      stageName: [],
      stage1: [],
      value: 0
    };
    this.stageSelection = this.stageSelection.bind(this);
    this.selectCorrectStage = this.selectCorrectStage.bind(this);
    this.loadGate = this.loadGate.bind(this);
    this.closeActive = this.closeActive.bind(this);
  }
  componentWillMount() {
    this.stageSelection();
  }
  stageSelection() {
    let context = this;
    let theme = window.location.hash.split('theme=')[1];
    // console.log("......."+theme);
    $.ajax({
      url: '/userGame/loadStage',
      type: 'POST',
      data: {
        theme: theme
      },
      success: function(data) {
        // console.log('..............data', data);
        context.setState({stage: data});
      },
      error: function(err) {
        console.log('error', err);
      }
    });
  }
  selectCorrectStage() {
    console.log("inside stage");
    let context = this;
    let data1 = context.state.stage.map((item) => {
      if (item.stage == 'stage1') {
        context.setState({stage1: item.material});
        // context.setState(stageName:item.material)
      }
    })
    // console.log(",,,,,,,,,,,,............"+this.state.stage1);
  }
  loadGate() {
    console.log("iuhydsihduhfiduh");
    this.setState({value: 1});
    console.log("value" + this.state.value);
  }
  closeActive() {
    this.setState({value: 0});
  }

  render() {
    let landing;
    let aaa = '';
    // console.log(",,,,,,,,,,"+this.state.stage1);
    if (this.state.stage1.length != 0) {
      aaa = this.state.stage1.map((item) => {
        // console.log();
        return (
          <ul>{item}</ul>
        )
      })
    }
    if (cookies.get('userType') == 'User') {
      landing = (
        <div style={{
          marginTop: '5%',
          marginLeft: '5%',
          marginRight: '5%'
        }}>
          <Grid>
            <Grid.Column width={9}>
              <Card fluid onClick={this.selectCorrectStage} style={{
                textDecoration: 'none',
                marginLeft: '5%',
                marginRight: '10%',
                width: '80%'
              }}>
                <Card.Content>
                  <Popup trigger={<Label as='a' color='green' ribbon style={{width: '100%',marginLeft:'-1%'}}><p style={{
                    marginLeft: '3%'
                  }}>1<center style={{marginTop: '-3%'}}>Stage1</center></p> </Label>} position='popup' content='Completed' id='popup'/>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>Score : 22</p>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>Start Time : 10.00</p>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>End Time : 12.00</p>
                </Card.Content>
              </Card>
              <Card fluid onClick={this.selectCorrectStage} style={{
                textDecoration: 'none',
                marginLeft: '5%',
                marginRight: '10%',
                width: '80%'
              }}>
                <Card.Content>
                  <Popup trigger={<Label as='a' color='yellow' ribbon style={{width: '100%',marginLeft:'-1%'}}><p style={{
                    marginLeft: '3%'
                  }}>2<center style={{marginTop: '-3%'}}>Stage2</center></p> </Label>} position='popup' content='Work in Progress' id='popup'/>
                  <Icon name='signup' style={{
                    float: 'right',
                    cursor: 'pointer'
                  }} size='large' color='orange' onClick={this.loadGate}/>
                  <h4 style={{
                    marginLeft: '8%'
                  }}>Stage1</h4>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>Score : 22</p>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>Start Time : 10.00</p>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>End Time : 12.00</p>
                </Card.Content>
              </Card>
              <Card fluid onClick={this.selectCorrectStage} style={{
                textDecoration: 'none',
                marginLeft: '5%',
                marginRight: '10%',
                width: '80%'
              }}>
                <Card.Content>
                  <Popup trigger={<Label as='a' color='teal' ribbon style={{width: '100%',marginLeft:'-1%'}}><p style={{
                    marginLeft: '3%'
                  }}>3<center style={{marginTop: '-3%'}}>Stage3</center></p> </Label>} position='popup' content='Not Started' id='popup'/>
                  <Icon name='signup' size='large' style={{
                    float: 'right'
                  }} onclick={this.loadGate}/>
                  <h4 style={{
                    marginLeft: '8%'
                  }}>Stage1</h4>
                  <p style={{
                    textAlign: 'left',
                    marginLeft: '8%'
                  }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              {this.state.stage1.length !== 0
                ? <Segment id='stagePosition'>
                    <h4>Material</h4>
                    {aaa}</Segment>
                : null}
            </Grid.Column>
          </Grid>
          {this.state.value == 1
            ? <Main closeActive={this.closeActive}/>
            : null}
        </div>
      );
    } else {
      hashHistory.push('/');
    }
    return (
      <div>
        {landing}
      </div>
    );
  }
}
module.exports = StageComponent;
