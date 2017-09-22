const React = require('react');
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import { Button, Checkbox, Form, Card,Input,Icon } from 'semantic-ui-react';
import Cookie from 'react-cookie';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username:'',
      password:'',
      alertMsg:false
    };
    this.checkCredentials = this.checkCredentials.bind(this);
    this.redirectingToCorrectPage = this.redirectingToCorrectPage.bind(this);
    this.LoginUser = this.LoginUser.bind(this);
    this.checkforPasswordMismatch = this.checkforPasswordMismatch.bind(this);
  }
  checkforPasswordMismatch() {
    //console.log("inside check for password mismatch alert");
    let context = this;
    this.refs.asd.warning(
      'Password mismatch',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  handleUserName = (e) => {
    this.setState({username: e.target.value});
    //console.log("username ",this.state.username);
  }
  handlePassword = (e) => {
    this.setState({password: e.target.value});
  }

  checkCredentials() {
    //console.log("checking credentials");
    if(this.state.username == "" || this.state.password == "") {
      return "nodata";
    } else if(this.state.checkDataFromDb) {
      return "invalid";
    }else{
      return "success";
    }
  }
  redirectingToCorrectPage(res){

    //   if(res == "mismatch" || res == "invalid_data"){
    //     //console.log("mismatch found");
    //     hashHistory.push('/contactAdmin');
    //   }else {
    //   if(res.userType=='Admin') {
    //       cookies.set('userType', res.userType);
    //      hashHistory.push('/home');
    //
    //   } else if(res.userType=='User'){
    //      cookies.set('username', res.userName,{ path: '/' });
    //         cookies.set('userType', res.userType,{ path: '/' });
    //        hashHistory.push('/adminHome');
    //   }
    // }

    if(res == "mismatch" || res == "invalid_data"){
      //console.log('mismatch found');
      cookies.set('username', 'dummyUser');
      cookies.set('userType', 'dummyType');
      cookies.set('empId', 'dummyid');
      cookies.set('loginId', 'loginId');
      cookies.set('loginStatus', 'dummyStatus');
      hashHistory.push('/contactAdmin');
    }
    if(res == "password_mismatch"){
      //console.log('pwd mismatch found');
      this.setState({alertMsg:true});
    }
    if(res.userType=='User' || res.userType=='Pair'){
      cookies.set('username', res.userName);
      cookies.set('userType', res.userType);
      cookies.set('empId', res.empId);
      cookies.set('teamName',res.teamName);
      cookies.set('loginId', res.loginId);
      cookies.set('loginStatus', true);
      hashHistory.push('/landingPage');
    }
    if(res.userType=='Admin') {
      //console.log(res.userType,"shown here");
      hashHistory.push('/adminLandingPage');
      cookies.set('username', res.userName);
      cookies.set('userType', res.userType);
      cookies.set('empId', res.empId);
      cookies.set('loginId', res.loginId);
      cookies.set('loginStatus', true);
    }
  }
  LoginUser() {
    //console.log("inside login  user");
    if(this.checkCredentials() == "nodata"){}else{
      //console.log("ajax calling");
      let context = this;
      $.ajax({
        url:"/users/login",
        type: 'POST',
        datatype: 'JSON',
        data:{username :this.state.username,password:this.state.password},
        success: function(res)
        {
          //console.log('inside success',res);
          if(res == 'password_mismatch'){
            context.checkforPasswordMismatch();
          }
          context.redirectingToCorrectPage(res);
          //  //console.log('cookie is', Cookie.load('username'));
        }.bind(this),
        error: function(err)
        {
          //console.log('inside failure');
          //console.log(err.responseText);
        }.bind(this)
      });
    }
  }
  render() {
    let loginPage;
    let alertMessages = "";
    if(this.state.alertMsg){
      // alertMessages = (<div> password mismatch</div>);
      // this.checkforPasswordMismatch();
    }
    if(cookies.get('userType') == "User" || cookies.get('userType') == "Pair"){
      hashHistory.push('/home');
    } else if(cookies.get('userType') == "Admin"){
      //console.log('enter');
      hashHistory.push('/adminLandingPage');
    }else {
      loginPage = (<div>
        <img className="loginImage" src="../img/newBG.jpg"/>
        <div id="headerfixed">

       {/* <div className="footer-brand-colour-container container">
            <div className="row footer-brand-colour">
                <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
                <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
                <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
            </div>
        </div> */}
       {/* <nav className="navbar navbar-inverse navbar-fixed-top">
         <div className="container-fluid">
           <div className="navbar-header">
             <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
               <span className="icon-bar"></span>
               <span className="icon-bar"></span>
               <span className="icon-bar"></span>
             </button>
             <div>
               <a className="navbar-brand" href="#">
                 <img src="./img/logo.png" id="logoSize"/></a>
               <a className="navbar-brand" href="#">
                 <img src="./img/Adapt_logo1.png" id="adaptlogoSize"/></a>
              </div>
           </div>
         </div>
       </nav> */}
       <nav className="navbar navbar-fixed-bottom" id="footer" >
         <div id = "ribbon" className="row footer-brand-colour">
               <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
               <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
               <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
           </div>
              <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
            <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
          </nav>
     </div>


<div className='formAlign'>
  {/* <Form>
    <Form.Field className="">
      <Input size="big" iconPosition='left' className='formwidth1'>
      <Icon name='user' inverted circular/>
        <input className='formwidth' onChange={this.handleUserName} placeholder="Login ID" type="text" required id="inputbox"/>
    </Input>
   </Form.Field><br/><br/><br/>
   <Form.Field className="">
     <Input size="big" iconPosition='left' placeholder='Loginid' className='formwidth1'>
     <Icon name='lock' inverted circular/>
      <input className='formwidth' onChange={this.handlePassword} placeholder="Password" type="password" required id="inputbox"/>
    </Input><br/><br/><br/>
    </Form.Field>
     <Form.Field className="">
    <Button size="big" className='formwidth' onClick={this.LoginUser} type="submit" value="Login" id="inputbox">Sign in</Button>
  </Form.Field>
    {alertMessages}
  </Form> */}
    <Form>
      <Form.Field className="">
        <label className="labelLogin">Login ID</label>
        <Input size="large" iconPosition='left' className='formwidth1'>
        <Icon name='user' transparent color='white'/>
        <input className='formwidth' onChange={this.handleUserName} placeholder="Login ID" type="text" required/>
          </Input>
      </Form.Field>
      <Form.Field style={{marginTop:'3%'}}className="">
        <label className="labelLogin">Password</label>
        <Input size="large" iconPosition='left' placeholder='Loginid' className='formwidth1'>
        <Icon name='lock' transparent/>
        <input className='formwidth' onChange={this.handlePassword} placeholder="Password" type="password" required/>
      </Input>
      </Form.Field>
        <Form.Field className="">
      <Button className="btnColor" onClick={this.LoginUser} type="submit" value="Login" id="inputbox">Sign in</Button>
    </Form.Field>
      {alertMessages}
    </Form>
  </div></div>);
}

return(
  <div>
    {loginPage}
    <ToastContainer ref='asd'
      toastMessageFactory={ToastMessageFactory}
      className='toast-top-center'/>
  </div>

);
}
}
module.exports = Login;
