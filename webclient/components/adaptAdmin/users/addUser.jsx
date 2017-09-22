import React from 'react';
import {Form, Grid, Button, Icon, Divider, TextArea, Dropdown, Snackbar} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTypeSelected: '',
      ajaxTrigger: false
    };
    this.addNewUser = this.addNewUser.bind(this);
    this.updateUserType = this.updateUserType.bind(this);
    this.validateData = this.validateData.bind(this);
    this.validateDataPair = this.validateDataPair.bind(this);
    this.checkForAddedUserAlert = this.checkForAddedUserAlert.bind(this);
    this.checkForOnlyAlphabetsInNameAlert = this.checkForOnlyAlphabetsInNameAlert.bind(this);
    this.checkForEnterCorrectEmpIdAlert = this.checkForEnterCorrectEmpIdAlert.bind(this);
  }
  updateUserType(e, a) {
    if(a.value != null) {
      let res = a.value;
      this.setState({userTypeSelected: res});
    }
  }
  checkForAddedUserAlert() {
    this.refs.asd.success(
      'User added',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForOnlyAlphabetsInNameAlert() {
    this.refs.asd.error(
      'Only alphabets allowed in Employee name',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForEnterCorrectEmpIdAlert() {
    this.refs.asd.error(
      'Enter correct Employee ID',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  addNewUser(e, value) {
    e.preventDefault();
    let dataValue;
    let name;
    let employeeid;
    let email;
    let usertype;
    let teamname;
    let loginId;
    let context = this;
    if(this.state.userTypeSelected == 'User'){
      name = this.refs.newUserName.value;
      employeeid = this.refs.newEmployeeID.value;
      loginId = this.refs.newEmployeeID.value;
      email = this.refs.newEmailID.value;
      usertype = this.state.userTypeSelected;
      teamname = this.refs.newTeamName.value;
      dataValue = {name: name, employeeid: employeeid, email: email, teamname: teamname, usertype: usertype, loginId: loginId};
    }
    if(this.state.userTypeSelected == 'Admin') {
      name = this.refs.newUserName.value;
      employeeid = this.refs.newEmployeeID.value;
      loginId = this.refs.newEmployeeID.value;
      email = this.refs.newEmailID.value;
      usertype = this.state.userTypeSelected;
      dataValue = {name: name, employeeid: employeeid, email: email, usertype: usertype, loginId: loginId};
      // this.setState({ajaxTrigger:true});
    }
    if(this.state.userTypeSelected == 'Pair') {
      name = this.refs.newUserName.value;
      employeeid = this.refs.newEmployeeID.value;
      loginId = this.refs.loginId.value;
      email = this.refs.newEmailID.value;
      usertype = this.state.userTypeSelected;
      teamname = this.refs.newTeamName.value;
      dataValue = {name: name, employeeid: employeeid, email: email, teamname: teamname, usertype: usertype, loginId: loginId};
    }
    $.ajax({
      url: '/admin/addUser',
      type: 'POST',
      data: dataValue,
      success: function(response)
      {
        context.checkForAddedUserAlert();
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
    if(this.state.userTypeSelected == 'Admin') {
      this.refs.newUserName.value = '';
      this.refs.newEmployeeID.value = '';
      this.refs.newEmailID.value = '';
      this.state.userTypeSelected = '';
    } else if(this.state.userTypeSelected == 'User')
    {
      this.refs.newUserName.value = '';
      this.refs.newEmployeeID.value = '';
      this.refs.newEmailID.value = '';
      this.state.userTypeSelected = '';
      this.refs.newTeamName.value = '';
    } else if(this.state.userTypeSelected == 'Pair') {
      this.refs.newUserName.value = '';
      this.refs.newEmployeeID.value = '';
      this.refs.newEmailID.value = '';
      this.state.userTypeSelected = '';
      this.refs.newTeamName.value = '';
    }
  }
  validateData() {
    if(this.state.userTypeSelected != 'Pair') {
      let context = this;
      let EmpID = this.refs.newEmployeeID.value;
      if (EmpID.length != 6) {
        this.refs.newEmployeeID.value = '';
        if(this.state.userTypeSelected != 'Pair') {
          context.checkForEnterCorrectEmpIdAlert();
        }
      }
    }
  }
  validateDataPair() {
    this.refs.newUserName1.value = '';
    this.refs.newUserName2.value = '';
  }
  render() {
    let fieldsToShow = '';
    let userTypeList = [{ key: 'Admin', value: 'Admin', text: 'Admin' }, { key: 'User', value: 'User', text: 'User' }, { key: 'Pair', value: 'Pair', text: 'Pair' }];
    if(this.state.userTypeSelected == 'Admin') {
      fieldsToShow = (<div><Form.Field>
        <label>
          <p style={{fontSize: '14px', fontFamily: 'arial'}}> Name</p>
        </label>
        <input autoComplete='off' type='text' name='newUserName' ref='newUserName' placeholder='Name'  required/>
      </Form.Field>
      <Form.Field>
        <label>
          <p style={{fontSize: '14px', fontFamily: 'arial'}}> Employee ID</p>
        </label>
        <input autoComplete='off' type='text' name='newEmployeeID' ref='newEmployeeID' placeholder='Emloyee ID' required/>
      </Form.Field>
      <Form.Field>
        <label>
          <p style={{fontSize: '14px', fontFamily: 'arial'}}> Email</p>
        </label>
        <input autoComplete='off' type='email' name='newEmailID' ref='newEmailID' placeholder='email ID' required/>
      </Form.Field>
      <Button fluid color='green' type='submit' onClick={this.validateData} >Add user</Button>
    </div>
  );
}
if(this.state.userTypeSelected == 'User') {
  fieldsToShow = (<div><Form.Field>
    <label>
      <h4> Name</h4>
    </label>
    <input autoComplete='off' type='text' name='newUserName' ref='newUserName' placeholder='Name' required/>
  </Form.Field>
  <Form.Field>
    <label>
      <h4> Employee ID</h4>
    </label>
    <input autoComplete='off' type='text' name='newEmployeeID' ref='newEmployeeID' placeholder='Emloyee ID' required/>
  </Form.Field>
  <Form.Field>
    <label>
      <h4> Email</h4>
    </label>
    <input autoComplete='off' type='email' name='newEmailID' ref='newEmailID' placeholder='email ID' required/>
  </Form.Field>
  <Form.Field>
    <label>
      <h4> Team Name</h4>
    </label>
    <input autoComplete='off' type='text' name='newTeamName' ref='newTeamName' placeholder='Team Name' required/>
  </Form.Field>
  <Button fluid color='green' type='submit' onClick={this.validateData}>Add user</Button>
</div>);
}
if(this.state.userTypeSelected == 'Pair') {
  fieldsToShow = (<div>
    <p className='noteForAdmin'>Note: separate the data of the pair with '&'</p><Form.Field>
      <label>
        <h4> Names of the Pair</h4>
      </label>
      <input autoComplete='off' type='text' name='newUserName' ref='newUserName' placeholder='Name' required/>
    </Form.Field>
    <Form.Field>
      <label>
        <h4> Employee ID's of the Pair</h4>
      </label>
      <input autoComplete='off' type='text' name='newEmployeeID' ref='newEmployeeID' placeholder='Emloyee ID' required/>
    </Form.Field>
    <Form.Field>
      <label>
        <h4>Login ID</h4>
      </label>
      <input autoComplete='off' type='text' name='loginId' ref='loginId' placeholder='Login ID' required/>
    </Form.Field>
    <Form.Field>
      <label>
        <h4> Email Id's of the Pair</h4>
      </label>
      <input autoComplete='off' type='text' name='newEmailID' ref='newEmailID' placeholder='email ID' required/>
    </Form.Field>
    <Form.Field>
      <label>
        <h4> Team Name</h4>
      </label>
      <input autoComplete='off' type='text' name='newTeamName' ref='newTeamName' placeholder='Team Name' required/>
    </Form.Field>
    <Button fluid color='green' type='submit' onClick={this.validateData}>Add user</Button>
  </div>);
}
return (
  <div>
    <Grid>
      <Grid.Row><Grid.Column width={1}/>
      <Grid.Column width={14}>
        <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Add user</b></p>
        <Form onSubmit={this.addNewUser}>
          <Form.Field>
            <label>
              <p style={{fontSize: '14px', fontFamily: 'arial'}}> User Type</p>
            </label>
            <Dropdown onChange={this.updateUserType} fluid placeholder='Select User type' selection options={userTypeList}/>
          </Form.Field>
          {fieldsToShow}
        </Form>
        <Divider/>
      </Grid.Column>
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
