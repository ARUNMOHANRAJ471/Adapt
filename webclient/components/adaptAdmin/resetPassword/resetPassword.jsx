import React from 'react';
import { Button, Grid, Form, Label, Dropdown, Divider, Dimmer, Header, Icon  } from 'semantic-ui-react'
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users : [],
      usertype : [],
      ddModal:false
    }
    this.handleYesDeleteUser = this.handleYesDeleteUser.bind(this);
  }
  checkForDeletedUserAlert() {
    //console.log("inside check for Password reset done successfully alert");
    let context = this;
    this.refs.asd.success(
      'Password reset done successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  componentWillMount() {
    this.getUsers()
  }
  getUsers() {
    let arr = [];
    let arr1 = [];
    $.ajax({
      url:"/admin/getUsers",
      type:'GET',
      success: function(data)
      {
        for(let k=0;k<data.length;k++) {
          if(k !== null) {
            arr.push({key: data[k].loginId, value: data[k].loginId, text: data[k].userName});
            // arr1.push({key: data[k].userType, value: data[k].userType, text: data[k].userType});
          }
        }
        this.setState({users: arr});
        this.setState({usertype: arr1});
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  updatesearchQueryUser(e,a) {
    if(a.value != null){
      //console.log("update ",a.value);
      let res = a.value;
      this.setState({
        searchQueryUser: res,
      });

      let arr1 = '';
      let k = '';
      $.ajax({
        url:"/admin/getusertype",
        type:'POST',
        data:{loginid:res},
        success: function(data)
        {
          //console.log("data n success ",JSON.stringify(data));
            //console.log("xxxx ",data.userType);
              // usertype = ({key: data.userType, value: data.userType, text: data.userType});
              // arr1.push({key: data[k].userType, value: data[k].userType, text: data[k].userType});


          this.setState({usertype: data.userType});
        }.bind(this),
        error: function(err)
        {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
      }
  }
  handleYesDeleteUser() {
this.setState({ddModal:true});
  }
  handleNoDeleteDomainClick(){
    this.setState({ddModal:false});
  }
  handleYesDeleteDomainClick(){
    let context = this;
    context.setState({ddModal:false});
      let sucessFlag = 0;
    var data = {
      loginid:this.state.searchQueryUser
    }
    $.ajax({
      url:"/admin/resetPassword",
      type:'POST',
      data:data,
      success: function(data)
      {
        // alert('deleted user');
        context.checkForDeletedUserAlert();
        sucessFlag = 1;
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX', err);
      }.bind(this)
    });
  }
  render() {
    // //console.log("reset password in reset",this.state.usertype);
    return(
      <div>
        <Dimmer active={this.state.ddModal} onClickOutside={this.handleNoDeleteDomainClick.bind(this)} page style={{fontSize:'130%'}}>
          <Header icon='trash outline' content='Reset Password' style={{color:'white',marginLeft:'35%'}}/>
          <p style={{marginRight:'3.2%'}}>Are you sure you want to reset the password?</p>
          <Button color='red' inverted onClick={this.handleNoDeleteDomainClick.bind(this)} style={{marginLeft:'10%',marginRight:'1%'}}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.handleYesDeleteDomainClick.bind(this)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Dimmer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <Form>
                  <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Reset the user password </b></p>
              <Form.Field>
                <label>
                  <p style={{fontSize:"14px",fontFamily:"arial"}}>Select User</p>
                </label>
                <Dropdown onChange={this.updatesearchQueryUser.bind(this)} placeholder='Select the user to be updated'  fluid search selection options={this.state.users}/>
              </Form.Field>
            </Form><br/>
              <p style={{fontSize:"14px",fontFamily:"arial"}}><b>Usertype :</b> {this.state.usertype}</p>
              <Divider/>
              <Grid.Column width={8}><Button style={{marginTop:"10px",marginLeft:"0%"}} fluid color='red' onClick={this.handleYesDeleteUser}>Reset</Button></Grid.Column>
              </Grid.Column>
          </Grid.Row>
        </Grid>
      <ToastContainer ref='asd'
        toastMessageFactory={ToastMessageFactory}
        className='toast-top-center' style={{marginTop:'8%'}}/>
    </div>
    );
  }
}
module.exports = ResetPassword;
