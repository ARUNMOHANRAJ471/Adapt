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
export default class Penalise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTypeSelected: '',
      teamList: [],
      selectedTeam: '',
      teamScore: 0,
      userList: [],
      selectedUser: '',
      penalityScore:0
    };
    this.updateTeam = this.updateTeam.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.penalise = this.penalise.bind(this);
  }

  componentWillMount(){
      this.getAllTeams();
  }

  updateTeam(e, a) {
    if (a.value != null) {
      let res = a.value;
      this.setState({selectedTeam: res});
      this.getTeamScore(res);
    }
  }

  getTeamScore(teamName){
  let context = this;
  $.ajax({
    url: '/users/getTeamScore',
    type: 'POST',
    data: {
      teamName: teamName
    },
    success: function(data) {
      //console.log('dddddddddddddddd',data.records[0]._fields[0].low);
      context.setState({teamScore:data.records[0]._fields[0].low})
    },
    error: function(err) {
      //console.log("error", err);
    }
  })
  }

  updateScore(e){
    this.setState({penalityScore:e.target.value});
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

  penalise(){
    if(this.state.selectedTeam != ''){
    let ns = this.state.teamScore + this.state.penalityScore;
    let teamName = this.state.selectedTeam;
    let context = this;
    $.ajax({
      url: '/users/updateTeamScore',
      type: 'POST',
      data: {
        teamName: teamName,
        teamScore: ns,
        user: context.props.page,
        penalityScore: context.state.penalityScore
      },
      success: function() {
        context.checkForPenaliseSuccess();
        this.refs.penalityScore.value = "";
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }
  }

  checkForPenaliseSuccess(){
    //console.log("inside checkForPenaliseSuccess");
    let context = this;
    this.refs.asd.success(
      'Penalised successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }

  render() {
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
                <b>{this.props.page+' '+'Accounts'}</b>
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
                    }}>Deduct score</p>
                  </label>
                  <input autoComplete='off' type='number' min={0} onChange={this.updateScore} name='penalityScore' ref='penalityScore' placeholder='Enter penality score' required/>
                </Form.Field>
              </Form>
              <Button style={{marginTop:'10px'}} fluid color='green' type='submit' onClick={this.penalise}>Deduct</Button>
              <Divider/>
              <p><a href="/downloadAccountsLog">Click here </a>to download Accounts Log.</p>
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
