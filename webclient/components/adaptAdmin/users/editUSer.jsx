import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchQueryUser: '',
      empName: '',
      email: '',
      userType: '',
      team: '',
      typeChange: [
        { key: 'User', text: 'User', value: 'User' },
        { key: 'Pair', text: 'Pair', value: 'Pair' },
        { key: 'Admin', text: 'Admin', value: 'Admin' }
      ]
    };
    this.updatesearchQueryUser = this.updatesearchQueryUser.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.mailChange = this.mailChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.teamChange = this.teamChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.checkForOnlyAlphaAlert = this.checkForOnlyAlphaAlert.bind(this);
    this.checkForEnterCorrectUserTypeAlert = this.checkForEnterCorrectUserTypeAlert.bind(this);
    this.checkForUserDataUpdatedSuccessfullyAlert = this.checkForUserDataUpdatedSuccessfullyAlert.bind(this);
  }
  nameChange(e) {
    this.setState({empName: e.target.value});
  }
  mailChange(e) {
    this.setState({email: e.target.value});
  }
  typeChange(e, a) {
    this.setState({userType: a.value});
  }
  teamChange(e) {
    this.setState({team: e.target.value});
  }
  checkForOnlyAlphaAlert() {
    this.refs.asd.error(
      'Only alphabets allowed in Employee name',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForEnterCorrectUserTypeAlert() {
    this.refs.asd.error(
      'Enter correct user type',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForUserDataUpdatedSuccessfullyAlert() {
    this.refs.asd.success(
      'User data updated successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  updateUser() {
    let value = {empId: this.state.searchQueryUser, name: this.state.empName, email: this.state.email, userType: this.state.userType, team: this.state.team};
    let context = this;
    $.ajax({
      url: '/admin/updateUser',
      type: 'POST',
      data: value,
      success: function(data)
      {
        if(data == 'success') {
          context.getUsers();
          context.checkForUserDataUpdatedSuccessfullyAlert();
          context.setState({empName: '', email: '', userType: '', team: '', searchQueryUser: ''});
        }
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  componentWillMount() {
    this.getUsers();
  }
  getUsers() {
    let arr = [];
    $.ajax({
      url: '/admin/getUsers',
      type: 'GET',
      success: function(data)
      {
        for(let k = 0; k < data.length; k = k + 1) {
          if(k !== null) {
            arr.push({key: data[k].empId, value: data[k].empId, text: data[k].userName});
          }
        }
        this.setState({users: arr});
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  updatesearchQueryUser(e, a) {
    if(a.value != null) {
      let res = a.value;
      this.setState({
        searchQueryUser: res,
        empName: '',
        email: '',
        userType: '',
        team: ''
      });
      let context = this;
      $.ajax({
        url: '/admin/findUserData',
        type: 'POST',
        data: {empId: res},
        success: function(data)
        {
          context.setState({empName: data[0].userName, email: data[0].emailId, userType: data[0].userType, team: data[0].teamName});
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }
  render() {
    let teamfield;
    if(this.state.userType== 'Admin') {
      teamfield = '';
    }
    else {
      teamfield = (<div><Form.Field>
        <label>
          <p style={{fontSize: '14px', fontFamily: 'arial'}}> Team Name</p>
        </label>
        <input autoComplete='off' type='text' name='newTeamName' onChange={this.teamChange} value={this.state.team} ref='newTeamName' placeholder='Team Name' required/>
      </Form.Field></div>);
    }
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Edit User</b></p>
              <Form onSubmit={this.addNewUser}>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Select User</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryUser.bind(this)} placeholder='Select the user to be updated'  fluid search selection options={this.state.users}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}> Employee Name</p>
                  </label>
                  <input autoComplete='off' type='text' onChange={this.nameChange} value={this.state.empName} name='newEmployeeName' ref='newEmployeeName' placeholder='Emloyee Name' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}> Email</p>
                  </label>
                  <input autoComplete='off' type='email' onChange={this.mailChange} value={this.state.email} name='newEmailID' ref='newEmailID' placeholder='email ID' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}> User Type</p>
                  </label>
                  <Dropdown onChange={this.typeChange} fluid placeholder='Select the user type' selection options={this.state.typeChange} required/>
                </Form.Field>
                {teamfield}
              </Form>
              <Button style={{marginTop: '10px'}}color='green' fluid type='submit' onClick={this.updateUser}>Update user</Button>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop: '8%'}}/>
        </div>
      );
    }
  }
