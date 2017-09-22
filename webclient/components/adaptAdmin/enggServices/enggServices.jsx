import React from 'react';
import {
  Form,
  Grid,
  Button,
  Icon,
  Divider,
  TextArea,
  Dropdown,
  Snackbar
} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class EnggServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: '',
      teamList: [],
      selectedService: '',
      points:''
    };
    this.updateTeam = this.updateTeam.bind(this);
    this.updateService = this.updateService.bind(this);
    this.log = this.log.bind(this);
  }

  componentWillMount() {
    this.getAllTeams();
  }

  getAllTeams() {
    let context = this;
    $.ajax({
      url: "/admin/getAllTeams",
      type: 'GET',
      success: function(response) {
        //console.log('rrrrr', response);
        let arr = [];
        response.map((item, index) => {
          let teamName = item._fields[0].properties.name;
          arr.push({key: teamName, value: teamName, text: teamName})
        });
        context.setState({
          teamList: arr
        }, function() {
          //console.log('teamList', context.state.teamList);
        })
      }.bind(this),
      error: function(err) {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }

  updateTeam(e, a) {
    if (a.value != null) {
      let res = a.value;
      this.setState({selectedTeam: res});
    }
  }

  updateService(e, a) {
    if (a.value != null) {
      let res = a.value;
      this.setState({selectedService: res},function(){
        if(this.state.selectedService == 'JIRA support'){
          this.setState({points: '5'});
        }
        else if(this.state.selectedService == 'Sequence Information - Code'){
            this.setState({points: '10'});
        }
        else if(this.state.selectedService == 'Sequence Information - Test'){
            this.setState({points: '10'});
        }
        else if(this.state.selectedService == 'Sequence Information - Infra'){
            this.setState({points: '10'});
        }
        else if(this.state.selectedService == 'Sequence Information - DevOps'){
            this.setState({points: '10'});
        }
        else if(this.state.selectedService == 'User story closure'){
            this.setState({points: '25'});
        }
        else if(this.state.selectedService == 'Architectural support'){
            this.setState({points: '5'});
        }
        else if(this.state.selectedService == 'Tools support'){
            this.setState({points: '5'});
        }
        else if(this.state.selectedService == 'Google Analytics'){
            this.setState({points: '5'});
        }
        else if(this.state.selectedService == 'Coaching Support'){
            this.setState({points: '5'});
        }
      });
    }
  }

  log(){
    let context = this;
    $.ajax({
      url: '/users/log',
      type: 'POST',
      data: {
        teamName: context.state.selectedTeam,
        service: context.state.selectedService,
        points: context.state.points
      },
      success: function() {
        context.checkForLogSuccess();
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }

  checkForLogSuccess(){
      //console.log("inside checkForLogSuccess");
      let context = this;
      this.refs.asd.success(
        'Logged successfully',
        '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }

  render() {
    let serviceList = [
      {
        key: 0,
        value: 'JIRA support',
        text: 'JIRA support'
      }, {
        key: 1,
        value: 'Sequence Information - Code',
        text: 'Sequence Information - Code'
      }, {
        key: 2,
        value: 'Sequence Information - Test',
        text: 'Sequence Information - Test'
      }, {
        key: 3,
        value: 'Sequence Information - Infra',
        text: 'Sequence Information - Infra'
      }, {
        key: 4,
        value: 'Sequence Information - DevOps',
        text: 'Sequence Information - DevOps'
      }, {
        key: 5,
        value: 'User story closure',
        text: 'User story closure'
      }, {
        key: 6,
        value: 'Architectural support',
        text: 'Architectural support'
      }, {
        key: 7,
        value: 'Tools support',
        text: 'Tools support'
      }, {
        key: 8,
        value: 'Google Analytics',
        text: 'Google Analytics'
      }, {
        key: 9,
        value: 'Coaching Support',
        text: 'Coaching Support'
      }
    ];
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <p style={{
                fontSize: "16px",
                fontFamily: "arial"
              }}>
                <b>Engineering Services</b>
              </p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{
                      fontSize: "14px",
                      fontFamily: "arial"
                    }}>Team name</p>
                  </label>
                  <Dropdown onChange={this.updateTeam} fluid placeholder='Select Team name' search selection options={this.state.teamList}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{
                      fontSize: "14px",
                      fontFamily: "arial"
                    }}>Service</p>
                  </label>
                  <Dropdown onChange={this.updateService} fluid placeholder='Select Services' search selection options={serviceList}/>
                </Form.Field>
              </Form>
              <Button style={{
                marginTop: '10px'
              }} fluid color='green' type='submit' onClick={this.log}>Log</Button>
              <Divider/>
              <p><a href="/downloadEnggServicesLog">Click here </a>to download Engineering services Log.</p>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd' toastMessageFactory={ToastMessageFactory} className='toast-top-center' style={{
          marginTop: '8%'
        }}/>
      </div>
    );
  }
}
