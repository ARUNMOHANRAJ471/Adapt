import React from 'react';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class ChangePassword extends React.Component {
  constructor () {
    super();
    this.state={
        userName:'',
        buttonDisable:true,
        buttonColour:false,
        empId:'',
        currentPwd:'',
        userEnterCurrentPwd:'',
        newPwd:'',
        cnfrmNewPwd:'',
        btnStatus:true,
        successMsg:false
    }
    this.changePasswordFunc = this.changePasswordFunc.bind(this);
    this.changeUserEnterPwd = this.changeUserEnterPwd.bind(this);
    this.changenewPwd = this.changenewPwd.bind(this);
    this.changecnfrmPwd = this.changecnfrmPwd.bind(this);
  };
  componentWillMount(){
    let a = cookies.get('empId');
    let context = this;
    //console.log(this.state.userName);
      $.ajax({
          url:'/profile/view',
          type:'POST',
          data:{empId:a},
          success:function(data){
            //console.log("data"+JSON.stringify(data));
           context.setState({
                userName: data[0].userName,
               empId:data[0].empId,
               currentPwd: data[0].password,
               btnStatus: true,
               currPwdCheck: false,
               newPwdcheck: false
           })

              //console.log("success");
           },
           error: function(err){
             //console.log("error",err);
}})
}
  changeUserEnterPwd(e){
    this.setState({userEnterCurrentPwd: e.target.value});
    if((this.state.currentPwd == this.state.userEnterCurrentPwd) && (this.state.newPwd == this.state.cnfrmNewPwd)){
      this.setState({btnStatus: false});
    }
  }
  changenewPwd(e){
    this.setState({newPwd: e.target.value}, function(){
    if((this.state.currentPwd == this.state.userEnterCurrentPwd) && (this.state.newPwd == this.state.cnfrmNewPwd)){
      this.setState({btnStatus: false});
    }else{
      this.setState({btnStatus: true});
    }
    //console.log(this.state.currentPwd);
    //console.log(this.state.userEnterCurrentPwd);
    //console.log(this.state.newPwd);
    //console.log(this.state.cnfrmNewPwd);
    });
    }
  changecnfrmPwd(e){
    this.setState({cnfrmNewPwd: e.target.value},function(){
    if((this.state.currentPwd == this.state.userEnterCurrentPwd) && (this.state.newPwd == this.state.cnfrmNewPwd)){
      this.setState({btnStatus: false});
    }else{
      this.setState({btnStatus: true});
    }
    });
  }
  changePasswordFunc() {
    let context = this;
    let newPwd = this.state.newPwd;
    let empId = this.state.empId;
      $.ajax({
          url:'profile/changePassword',
          type:'POST',
          data:{empId:empId,newPwd: newPwd},
          success:function(data){
              //console.log("data"+JSON.stringify(data));
              if(data == 'success'){
                context.setState({userEnterCurrentPwd:'',
                newPwd:'',
                cnfrmNewPwd:'',btnStatus:true, currentPwd:newPwd, successMsg:true})
                //console.log("success");
              }
              },
              error: function(err){
                //console.log("error",err);
              }
            });
  }
  render() {
    let currentPwdMatch;
    let newPwdMatch;
    let crctFormat;
    let successMsgText;
    if(this.state.successMsg){
      successMsgText = (<p className="fontGreen"> password changed successfully </p>);
    }
    if(this.state.userEnterCurrentPwd == ''){
      currentPwdMatch = '';
    } else if((this.state.userEnterCurrentPwd != this.state.currentPwd)){
      currentPwdMatch = (<p className="fontRed">current password mismatch</p>);
    }else{
      currentPwdMatch = '';
    }
    if(this.state.newPwd != this.state.cnfrmNewPwd){
      newPwdMatch = (<p className="fontRed">new password mismatch</p>);
    }else{
      newPwdMatch = '';
      if(this.state.newPwd != '' && this.state.cnfrmNewPwd != '')
      crctFormat = (<p className="fontGreen">Good to go</p>);
    }
    return(<div style={{marginLeft:'5%'}}>
        <div>
            <h4 className="modal-title" id="myModalLabel">Change Password</h4>
            </div>
        <div>
            {/* <center> */}
            <br/>
            <div className="container">

                <form>
                  <div className="form-group">
                    <label htmlFor="pwd"> Current Password:</label>
                  <input type="password" required onChange={this.changeUserEnterPwd} value = {this.state.userEnterCurrentPwd} className="form-control" id="pwd" placeholder="Enter current password" name="pwd"/>
                  {currentPwdMatch}
                  </div>
                    <div className="form-group">
                      <label htmlFor="pwd2">New Password:</label>
                      <input type="password" required  onChange={this.changenewPwd} value = {this.state.newPwd}  ref="newPwd" className="form-control" id="pwd2" placeholder="Enter new password" name="pwd2"/>
                    </div>
                      <div className="form-group">
                        <label htmlFor="pwd3">Confirm Password:</label>
                        <input type="password" required  onChange={this.changecnfrmPwd} value = {this.state.cnfrmNewPwd}  ref="cnfrmNewPwd" className="form-control" id="pwd3" placeholder="Enter new password" name="pwd3"/>
                        {newPwdMatch}{crctFormat}
                      </div>
                </form>
            <button onClick={this.changePasswordFunc} disabled={this.state.btnStatus} className="btn btn-success">Change Password</button>
              {successMsgText}
              </div>
            {/* </center> */}
        </div>
    </div>);
    }
  }

module.exports = ChangePassword;
