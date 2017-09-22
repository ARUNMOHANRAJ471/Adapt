import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const {hashHistory} = require('react-router');
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
var scoreMsg = '';
import {
  Button,
  Icon,
  Modal,
  Confirm,
  Popup,
  Dimmer,
  Header,
  Loader,
  Image
} from 'semantic-ui-react';
var ind = 0;
const cookies = new Cookies();

class compile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active:false,
      seqMsg: "WRONG",
      score:0,
      teamScore:0,
      domainName:props.domainName,
      scenarioslength: 0,
      currentScenarioLength: 0,
      dashboardScenarioId:'',
      preconditionNames:'',
      activeLoader:false,
      actualScore:0
    };
    this.getScore = this.getScore.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.getDashboardScenarioId = this.getDashboardScenarioId.bind(this);
    this.completedScenarioFunction = this.completedScenarioFunction.bind(this);
    this.getPreconditionNames = this.getPreconditionNames.bind(this);
    this.handleOpenLoader = this.handleOpenLoader.bind(this);
    this.handleCloseLoader = this.handleCloseLoader.bind(this);
    this.checkin = this.checkin.bind(this);
    this.checkForPreConditionsAlert = this.checkForPreConditionsAlert.bind(this);
    this.checkForErrorAlert = this.checkForErrorAlert.bind(this);
    this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);

  }

  checkForPreConditionsAlert() {
    this.setState({activeLoader: false});
    //console.log("inside check for preconditions alert");
    let context = this;
    this.refs.asd.warning(
      '',
      'Kindly complete the following dependencies to CheckIn',
       {
        timeOut: 5000,
        extendedTimeOut: 10000,
        allowHtml: true
      }
    );
    setTimeout(this.pushtohome, 5000);
  }
  pushtohome() {
    //console.log("Inside push to home func");
    hashHistory.push('/home');
  }

    checkForErrorAlert() {
      this.setState({activeLoader: false});
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

    checkForSuccessAlert(actualScore) {
      this.setState({activeLoader: false});
      //console.log("inside check for Success alert");
      let context = this;
      this.refs.asd.success(
        'Successfully pushed to your Repository\nYour score for this User story is '+actualScore,
        '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
    setTimeout(this.pushtohome, 3000);
  }


  // function to open loader initially
  handleOpenLoader() {
    this.setState({activeLoader: true});
  }
  // function to close loader after fetching data
  handleCloseLoader(a) {
    let context = this;
    //console.log('close loader called',a);
    this.setState({activeLoader: false}, function(){
      if(a == "preconditions") {
        context.checkForPreConditionsAlert();
        // hashHistory.push('/home');
      }
    });
  }
  checkForPreConditions(seqState) {
    // this.handleOpenLoader();
    //console.log('seqStateeeeeeeeeeee',seqState);
    //console.log('inside check for preconditions',this.props.preConditions);
    //console.log('inside check for scenarioId',this.props.scenarioId);
    let scenarioId = this.props.scenarioId;
    let preconditionData = this.props.preConditions;
    let loginId = cookies.get('loginId');
    let teamName = cookies.get('teamName');
    let context = this;
    //console.log('pre data is', preconditionData.length);
    //console.log( typeof preconditionData);
    if(this.props.preConditions != 0){
      $.ajax({
        url:'/dnd/checkForPreConditions',
        type: 'POST',
        traditional:true,
        data:{scenarioId:scenarioId, preconditionData:preconditionData, loginId:loginId, teamName:teamName},
        success: function(res)
        {
          //console.log('inside success pf preconditons');
          //console.log('response is :', res);
          //console.log('length of response is: ',res.records.length);
          if(res.records.length != 0 ) {
            if(preconditionData.length == res.records.length) {
            context.checkin(seqState);
          }else{
            let inProgressArray = [];
            for (var i = 0; i < res.records.length; i++) {
              //console.log("first for res.records ",res.records[i]._fields[0]);
            for (var j = 0; j < preconditionData.length; j++) {
              //console.log("second for res.records ",preconditionData[j]);
              if(preconditionData[j] != res.records[i]._fields[0]){
                //console.log("in the preconditionData[j]  condition",preconditionData[j] != res.records[i]._fields[0]);
                if(!inProgressArray.includes(preconditionData[j])){
                  //console.log("inProgressArray.includes ",inProgressArray);
                  inProgressArray.push(preconditionData[j]);
                  //console.log(" inProgressArray ",inProgressArray);
                  context.setState({preconditionNames:inProgressArray})
                  context.handleCloseLoader('preconditions');
                }
              }
            }
            }
            //console.log("lllllllllllllll",inProgressArray);
          }
          } else{
            context.getPreconditionNames();
            //console.log(preconditionData);
          }
        }.bind(this),
        error: function(err)
        {
          context.checkForErrorAlert();

        }.bind(this)
      });
    } else{
      context.checkin(seqState);
    }
  }
  getPreconditionNames() {
    //console.log('precondition data is :',this.props.preConditions);
    if(this.props.preConditions !=0){
      let preconditionData = this.props.preConditions;
      let result1 = [];
      let context = this;
      $.ajax({
        url:'/dnd/getPreconditionNames',
        type: 'POST',
        traditional:true,
        data:{preconditionData:preconditionData},
        success: function(res)
        {
          //console.log('names are ',res);
          res.map(function(item){
            result1.push(item.properties.name);
          })
          //console.log("array of precondition names ",result1);
          context.setState({preconditionNames:result1},function(){
            if(this.state.preconditionNames.length != 0){
              context.handleCloseLoader('preconditions');
            }
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }

  componentDidMount(){
    this.getScore();
  }

  handleOpen = () => {
    this.loops();
    this.setState({active: true});
  }

  scoreState(){
    let data = {
      userId: cookies.get('empId'),
      scenarioId: this.props.scenarioId,
      score: this.state.actualScore
    };
    let context = this;
    $.ajax({
      url: '/dnd/scoreState',
      type: 'PUT',
      data: data,
      success: function() {
        context.props.scoreState(context.state.actualScore);
        //console.log("Score posted successfully");
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }

  getScenarioLength = () => {
    var a = this.props.domainName;
    let context;
    context = this;
    $.ajax({
      url: '/users/allScenariosLength/' + a,
      type: 'GET',
      success: function(data) {
        var aa = parseInt(data);
        context.setState({scenarioslength: aa});
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }

  loops = () => {
    if (this.props.correctSeq.includes(this.props.seq)) {
      let ind = this.props.correctSeq.indexOf(this.props.seq);
      //console.log('indddddddddddddddd',ind);
      if(ind == 0){
      this.setState({seqMsg: "RIGHT"});

      //console.log('props',this.props.actualScore);
      //console.log('aScore',this.state.actualScore);
      //console.log('nScore',this.props.score);
      //console.log('pscore',this.state.actualScore + this.props.score);
      scoreMsg = <p>Your score for this User story after checkin would be {this.props.actualScore + this.props.score}/{this.props.score}</p>;
      //console.log('scoreMsg',scoreMsg);
    }
    else if(ind == 1){
    this.setState({seqMsg: "HALF-RIGHT"});
      scoreMsg = <p>Your sequence is one of the correct sequences, but not the best.<br/>
    Do you still want to continue?<br/>
  If you continue to checkin your code, you will be awarded only half the maximum score.<br/><br/>
Your score for this User story after checkin would be {this.props.actualScore + (this.props.score/2)}/{this.props.score}</p>;
    }
    }
    else {
      let s = this.state.score + this.props.negativescore;
      //console.log('ttttttttttttt',this.state.teamScore,this.props.negativescore);
      let ts = this.state.teamScore + this.props.negativescore;
      let actualScore = this.props.actualScore + this.props.negativescore;
      scoreMsg = <p>Your score for this User story is {actualScore}/{this.props.score}</p>;
      //console.log('scoreMsg',scoreMsg);
      this.setState({score:s,actualScore:actualScore,teamScore:ts},function(){
        //console.log('score',this.state.score);
        //console.log('teamScore',this.state.teamScore);
        //console.log('failure');
        this.updateScore(this.state.score,this.state.teamScore,"failure");
        this.scoreState();
        //console.log('actualScore',actualScore);
      });
      var errorComp = [];
      var correctSeq = [];
      var userSeq = this.props.seq.split('-');
      var userLen = userSeq.length;
      for (var i of this.props.correctSeq) {
        var seq = i.split('-');
        correctSeq.push(seq);
      }
      for (var i of correctSeq) {
        for (var j = 0; j < Math.min(userLen, i.length); j++) {
          if (i[j] != userSeq[j]) {
            errorComp.push(j);
            break;
          }
        }
      }
      var index = 0;
      if(errorComp.length == 0){
        index = userSeq.length - 1;
        //console.log('errorComp',errorComp);
        //console.log('max',index);
      }
      else{
        index = Math.max.apply(null, errorComp);
        //console.log('errorComp',errorComp);
        //console.log('max',index);
      }
      this.props.changeColor(index);
    }
  }

  getScore()
  {
    let a = cookies.get('empId');
    let context = this;
    $.ajax({
      url: '/users/getTeamScore',
      type: 'POST',
      data: {
        teamName: this.props.teamName
      },
      success: function(data) {
        //console.log('dddddddddddddddd',data.records[0]._fields[0].low);
        context.setState({teamScore:data.records[0]._fields[0].low})
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
    $.ajax({
      url: '/profile/view',
      type: 'POST',
      data: {
        empId: a
      },
      success: function(data) {
        context.setState({score: data[0].score},function(){
          this.getScenarioLength();
        });

      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }

  updateScore(score, teamScore, statusOfScore){
    //console.log('uuuuuuuuuuuu',teamScore);
    let a = cookies.get('empId');
    let context = this;
    $.ajax({
      url: '/users/updateScore',
      type: 'POST',
      data: {
        empId: a,
        score:score,
        loginId:cookies.get('loginId'),
        userName: cookies.get('username'),
        userType: cookies.get('userType'),
        status: statusOfScore,
        currentScenarioName: this.props.currentScenarioName,
        teamName: this.props.teamName,
        teamScore: teamScore
      },
      success: function() {
        // //console.log("success");
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }

  handleClose = () => {
    this.setState({active: false, seqMsg: "WRONG"});
  }


  checkin(seqState){
      this.handleOpenLoader();
    var scenarioName1 = this.props.currentScenarioName;
    let context;
    context = this;
    $.ajax({
      url:`/trial/submit/${scenarioName1}`,
      type: 'GET',
      success: function(res)
      {
        let actualScore = context.props.actualScore + context.props.score;
        //console.log('success');
        //console.log('aaaaaaaaaaaaaaaaaaaaaa',this.state.teamScore,actualScore);
          let ts = this.state.teamScore + actualScore;
        if(seqState == 'RIGHT'){
        let s = this.state.score+ this.props.score;
          //console.log('score',s);
          //console.log('teamScore',ts);
          //console.log('success');
          this.updateScore(s,ts,"success");
          context.checkForSuccessAlert(s);
      }
      else if(seqState == 'HALF-RIGHT'){
        let s = this.state.score + (this.props.score/2);
          //console.log('score',s);
          //console.log('teamScore',ts);
          //console.log('success');
          this.updateScore(s,ts,"success");
          context.checkForSuccessAlert(s);
      }
        this.getDashboardScenarioId(actualScore);
        // let socket = io();
        // socket.emit('userScenarioStatus', {
        //   scenarioName: this.props.currentScenarioName,
        //   userID: this.props.userId,
        //   domainName:this.props.domainName,
        //   status:'completed',
        //   teamName:cookies.get('teamName'),
        //   score:this.state.score
        // });
      }.bind(this),
      error: function(err)
      {
        context.checkForErrorAlert();

      }.bind(this)
    });
  }

  getDashboardScenarioId(actualScore) {
    let data = {
      actualId: this.props.scenarioId,
      loginId: cookies.get('loginId')
    };
    let context = this;
    //console.log('data given to find scenarioid', data);
    $.ajax({
      url: '/dnd/getDashboardScenarioId',
      type: 'POST',
      data: data,
      success: function(res) {
        //console.log("getting scenario data id", res);
        context.completedScenarioFunction(res.low,actualScore);
        // context.setState({dashboardScenarioId: res.low}, function() {
        // context.completedScenarioFunction();
        // });
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }


  completedScenarioFunction(dashboardScenarioId,actualScore) {
    //console.log('inside completed scenario function');
    let loginId = cookies.get('loginId');
    let preconditionData = dashboardScenarioId;
    let context;
    context = this;
    let data = {
      userId: this.props.userId,
      scenarioId: this.props.scenarioId,
      loginId: loginId,
      preconditionData:preconditionData,
      scenarioName:this.props.currentScenarioName,
      maxScore:this.props.score,
      actualScore:actualScore
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
        var bb = parseInt(data);
        // context.setState({allScenariosLength: bb}, function() {
        // context.scenarioLengthCheck();
        if(bb === context.state.scenarioslength) {
          context.completedDomain();
        }

      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }

  completedDomain() {
    let data = {
      userId: this.props.userId,
      domainName: this.props.domainName,
      teamName:cookies.get('teamName')
    };
    // let socket = io();
    // socket.emit('userDomainStatus', {
    //   domainName:this.props.domainName,
    //   teamName:cookies.get('teamName'),
    // });
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
    $.ajax({
      url: '/admin/domainsCompletedByUser',
      type: 'POST',
      data: data,
      success: function(data) {
        //console.log("  domainsCompletedByUser done");
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }
  reload(){
    location.reload();
  }

  render() {
    // this.getScenarioLength();
    const {active} = this.state
    const {activeLoader} = this.state;
    let compile = '';
    if(this.props.compile){
      compile = <Button inverted color='green' onClick={this.handleOpen}>Compile</Button>;
    }
    else{
      compile = <Button disabled inverted color='green' onClick={this.handleOpen}>Compile</Button>
    }
    let checkin = '';
    if(this.state.seqMsg == 'RIGHT'){
      checkin = <div>
        <p>To checkin the code</p>
        <Button positive onClick={this.checkForPreConditions.bind(this,'RIGHT')}>CheckIn</Button>
      </div>
    }
    if(this.state.seqMsg == 'HALF-RIGHT'){
      checkin = <div>
        <Button positive onClick={this.checkForPreConditions.bind(this,'HALF-RIGHT')}>CheckIn anyways</Button>
        <Button positive onClick={this.reload.bind(this)}>Go back</Button>
      </div>
    }
    return (
      <div style={{
        width: '9%',
        float: 'right'
      }}>
    <Dimmer active = {activeLoader} page>
      <Loader>Pushing your code to Git</Loader>
    </Dimmer>
    {compile}
    <Dimmer
      active={active}
      onClickOutside={this.handleClose}
      page>
      <Header as='h2' icon inverted>
        {(this.state.seqMsg == 'WRONG')?<p>You have created the {this.state.seqMsg} workflow</p>:null}
        {scoreMsg}
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
