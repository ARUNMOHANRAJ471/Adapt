import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const {hashHistory} = require('react-router');
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import {
  Button,
  Icon,
  Modal,
  Confirm,
  Popup,
  Dimmer,
  Header
} from 'semantic-ui-react';
var ind = 0;
const cookies = new Cookies();

class compile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      seqMsg: "WRONG",
      score:0,
      domainName:props.domainName,
      scenarioslength: 0,
      currentScenarioLength: 0
    };
    this.getScore = this.getScore.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
    this.checkForErrorAlert = this.checkForErrorAlert.bind(this);
  }
  componentDidMount(){
    this.getScore();
  }
  checkForSuccessAlert() {
    //console.log("inside check for Success alert");
    let context = this;
    this.refs.asd.success(
      'Code pushed successfully',
      '', {
      timeOut: 50000,
      extendedTimeOut: 3000
    }
  );
  setTimeout(this.pushtohome, 3000);
  }
  pushtohome() {
    //console.log("Inside push to home func");
    hashHistory.push('/home');
  }
  checkForErrorAlert() {
    //console.log("inside check for Error alert");
    let context = this;
    this.refs.asd.error(
      'Error',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }

  handleOpen = () => {

    this.loops();
    this.setState({active: true});
  }

  getScenarioLength = () => {
    //console.log("inside getScenarioLength functionsssss" + this.props.domainName);
    // let data = {
    //           domainName: this.state.domainName
    // };
    var a = this.props.domainName;
    let context;
    context = this;
    $.ajax({
      url: '/users/allScenariosLength/' + a,
      type: 'GET',
      // data: data,
      // async: false,
      success: function(data) {
        var aa = parseInt(data);
        //console.log("Status updated successfully ssssss"+typeof aa);
        context.setState({scenarioslength: aa});
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }

  loops = () => {
    //console.log("Inside condition loop");
    // if(this.props.seq === this.props.correctSeq) {
    if (this.props.correctSeq.includes(this.props.seq)) {
      //console.log("inside if loop");
      this.setState({seqMsg: "RIGHT"});
    /*  let socket = io();
      socket.emit('userScenarioStatus', {
        scenarioName: this.props.currentScenarioName,
        userId: this.props.userId,
        domainName:this.props.domainName,
        status:'Completed',
        teamName:cookies.get('teamName')
      });*/
    } else {
      let s = this.state.score+this.props.negativescore;
      this.setState({score:s},function(){
        this.updateScore(this.state.score);
      });
      //console.log("Inside Else loop");
      var errorComp = [];
      var correctSeq = [];
      var userSeq = this.props.seq.split('-');
      var userLen = userSeq.length;
      for (var i of this.props.correctSeq) {
        var seq = i.split('-');
        correctSeq.push(seq);
      }
      //console.log('userSeq', userSeq);
      //console.log('correctSeq', correctSeq);
      for (var i of correctSeq) {
        for (var j = 0; j < Math.min(userLen, i.length); j++) {
          if (i[j] != userSeq[j]) {
            errorComp.push(j);
            //console.log('eeeee' + i + '....' + j);
            break;
          }
        }
      }
      this.props.changeColor(Math.max.apply(null, errorComp));
    }
  }

  getScore()
  {
    let a = cookies.get('empId');
    let context = this;
    $.ajax({
      url: '/profile/view',
      type: 'POST',
      data: {
        empId: a
      },
      success: function(data) {
        context.setState({score: data[0].score},function(){
          //console.log('ssssscore',this.state.score);
          this.getScenarioLength();
        });

        //console.log("success");
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }

  updateScore(score){
    //console.log('Inside updateScore');
    let a = cookies.get('empId');
    let context = this;
    $.ajax({
      url: '/users/updateScore',
      type: 'POST',
      data: {
        empId: a,
        score:score
      },
      success: function() {
        //console.log("success");
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }

  handleClose = () => {
    this.setState({active: false, seqMsg: "WRONG"});
  }


  checkin(){
    //console.log("inside check button ajax"+this.props.currentScenarioName);

    var scenarioName1 = this.props.currentScenarioName;
    let context = this;
    //console.log(scenarioName1)
    $.ajax({
      url:`/trial/submit/${scenarioName1}`,
      type: 'GET',
      success: function(res)
      {
        //console.log('success');
        // alert('Successfully pushed to your Repository')
        // hashHistory.push('/home');
        context.checkForSuccessAlert();
        let s = this.state.score+ this.props.score;
        this.updateScore(s);
        this.completedScenarioFunction();
      }.bind(this),
      error: function(err)
      {
        context.checkForErrorAlert();
        // alert("error");

      }.bind(this)
    });
  }
  completedScenarioFunction = () => {
    let context;
    context = this;
    let data = {
      userId: this.props.userId,
      scenarioId: this.props.scenarioId
    };
    $.ajax({
      url: '/dnd/completedScenarios',
      type: 'PUT',
      data: data,
      success: function() {
        //console.log("Status updated successfully");
        context.completedScenarioslength();
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });

  }

  completedScenarioslength() {
    //console.log("Inside Competed scenarios length function" + this.props.userId + "##" + this.props.domainName);
    let context = this;
    let data = {
      empId: this.props.userId,
      domainName: this.props.domainName
    };
    $.ajax({
      url: '/users/completedScenarioslength',
      type: 'POST',
      data: data,
      success: function(data) {
        //console.log("completed scenarios length in compile");
        //console.log(typeof parseInt(data), data);
        var bb = parseInt(data);
        // context.setState({allScenariosLength: bb}, function() {
        //   //console.log("Inside set state eeeeeeeeee");
        //   // context.scenarioLengthCheck();
        //console.log("Inside scenario length check");
        //console.log(typeof bb, bb);
        //console.log(typeof context.state.scenarioslength, context.state.scenarioslength);
        if(bb == context.state.scenarioslength) {
          //console.log("Both are equal");
          context.completedDomain();
        }

      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }

  completedDomain() {
  /*  socket.emit('userDomainStatus', {
      domainName:this.props.domainName,
      status:'Completed'
    }); */
    let data = {
      userId: this.props.userId,
      domainName: this.props.domainName
    };
    $.ajax({
      url: '/users/completedDomain',
      type: 'POST',
      data: data,
      success: function(data) {
        //console.log("completed scenarios length in compile");
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });

  }

  render() {
    //console.log("props domainName"  + this.props.domainName+ ''+cookies.get('teamName'));
    //console.log("state domainName" + this.state.domainName);
    // this.getScenarioLength();
    const {active} = this.state
    let checkin = '';
    if(this.state.seqMsg == 'RIGHT'){
      checkin = <div>
        <p>To checkin the code</p>
        <Button positive onClick={this.checkin.bind(this)}>Checkin</Button>
      </div>
    }
    return (
      <div style={{
        width: '9%',
        float: 'right'
      }}>
        <Button positive onClick={this.handleOpen}>Compile</Button>
        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
          >
            <Header as='h2' icon inverted>
              <p>You have created the {this.state.seqMsg} workflow</p>
              {checkin}
            </Header>
          </Dimmer>
          <ToastContainer ref='asd'
            toastMessageFactory={ToastMessageFactory}
            className='toast-top-center' style={{marginTop:'8%'}}/>
        </div>
      );
    }
  }
  module.exports = compile;



// WEBPACK FOOTER //
// ./webclient/components/dnd/compile.jsx


// WEBPACK FOOTER //
// ./webclient/components/dnd/compile.jsx
