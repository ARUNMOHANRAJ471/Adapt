import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class EditScenario extends React.Component {
  constructor() {
    super();
    this.state = {
      domain: [],
      selectedDomain: '',
      scenario: [],
      scenario1: [],
      toUpdateScenario: '',
      probStmt: '',
      name: '',
      output: '',
      evalfun: '',
      scenarioId: '',
      code: '',
      score: '',
      negativescore: '',
      video: '',
      precondition: '',
      selectedScenarios: [],
      selectedAccount: [],
      selectedGivenScenarios: [],
      selectedGivenAccount: []
    };
    this.updatesearchQueryScenario = this.updatesearchQueryScenario.bind(this);
    this.updatesearchQueryScenario1 = this.updatesearchQueryScenario1.bind(this);
    this.updatesearchQueryScenario2 = this.updatesearchQueryScenario2.bind(this);
    this.updateScenario = this.updateScenario.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.probstmtChange = this.probstmtChange.bind(this);
    this.outputChange = this.outputChange.bind(this);
    this.evalChange = this.evalChange.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.score = this.score.bind(this);
    this.negativescore = this.negativescore.bind(this);
    this.video = this.video.bind(this);
    this.updateNewScenario = this.updateNewScenario.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForScenarioUpdatedSuccessfullyAlert = this.checkForScenarioUpdatedSuccessfullyAlert.bind(this);
  }
  nameChange(e) {
    this.setState({name: e.target.value});
  }
  probstmtChange(e) {
    this.setState({probStmt: e.target.value});
  }
  outputChange(e) {
    this.setState({output: e.target.value});
  }
  evalChange(e) {
    this.setState({evalfun: e.target.value});
  }
  codeChange(e) {
    this.setState({code: e.target.value});
  }
  score(e) {
    this.setState({score: e.target.value});
  }
  negativescore(e) {
    this.setState({negativescore: e.target.value});
  }
  video(e) {
    this.setState({video: e.target.value});
  }
  updatesearchQueryScenario1(e, a) {
    let res = a.value;
    let arr = Object.keys(res).map(function(key) {
      return res[key];
    });
    this.setState({selectedScenarios: arr,
      selectedAccount: arr});
    }
    updatesearchQueryScenario2(e, a) {
      let res = a.value;
      let arr = Object.keys(res).map(function(key) {
        return res[key];
      });
      this.setState({selectedGivenScenarios: arr,
        selectedGivenAccount: arr});
      }
      checkForEmptyAlert() {
        this.refs.asd.error(
          'Please fill all the fields',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
          }
        );
      }
      checkForScenarioUpdatedSuccessfullyAlert() {
        this.refs.asd.success(
          'User story updated successfully',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
          }
        );
      }
      updateNewScenario() {
        let scenarioName = this.refs.scenarioName.value;
        let probStmt = this.refs.probStmt.value;
        let outputValue = this.refs.outputValue.value;
        let evalFunc = this.refs.evalFunc.value;
        let code = this.refs.codeFunc.value;
        let score = this.refs.score.value;
        let negativescore = this.refs.negativescore.value;
        let video = this.refs.video.value;
        let precondition = this.state.selectedScenarios;
        let givenpreconditions = this.state.selectedGivenScenarios;
        if(scenarioName === '' || probStmt === '' || outputValue === '' || evalFunc === '' || code === '' || score === '' || negativescore === '' || video === '' || precondition === '') {
          this.checkForEmptyAlert();
        }
        else{
          let precondition = JSON.stringify(this.state.selectedScenarios);
          let givenpreconditions = JSON.stringify(this.state.selectedGivenScenarios);
          let x = this.state.negativescore;
          if(this.state.negativescore > 0) {
            x = x * (-1);
          }
          let data = {
            probStmt: this.state.probStmt,
            name: this.state.name,
            output: this.state.output,
            evalfun: this.state.evalfun,
            scenarioId: this.state.scenarioId,
            code: this.state.code,
            score: this.state.score,
            negativescore: x,
            video: this.state.video,
            precondition: precondition,
            givenpreconditions: givenpreconditions
          };
          let context = this;
          $.ajax({
            url: '/users/updateScenario',
            type: 'POST',
            data: data,
            success: function(data) {
              context.checkForScenarioUpdatedSuccessfullyAlert();
              context.setState({probStmt: '',
              name: '',
              output: '',
              evalfun: '',
              scenarioId: '',
              code: '',
              score: '',
              negativescore: '',
              video: '',
              selectedScenarios: [],
              selectedAccount: [],
              selectedGivenScenarios: [],
              selectedGivenAccount: []
            });
          }.bind(this),
          error: function(err)
          {
          }.bind(this)
        });
      }
    }
    componentWillMount() {
      this.component();
    }
    component() {
      let domainArray = [];
      $.ajax({
        url: '/users/findDomain',
        type: 'GET',
        success: function(data)
        {
          for(let i in data) {
            if(i !== null) {
              domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
            }
          }
          domainArray.push({key: 'unlinked_scenarios', value: 'unlinked_scenarios', text: 'unlinked_scenarios'});
          this.setState({
            domain: domainArray
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
    updateScenario(e, a) {
      if(a.value != null) {
        let res = a.value;
        let context = this;
        this.setState({toUpdateScenario: res});
        $.ajax({
          url: '/users/findScenarioData',
          type: 'POST',
          data: {scenario : res},
          success: function(dataDB)
          {
            let data = dataDB.records[0]._fields[0].properties;
            context.setState({scenarioId: dataDB.records[0]._fields[0].identity.low});
            context.setState({selectedScenarios: data.precondition, selectedAccount: data.precondition, selectedGivenScenarios: data.dependency, selectedGivenAccount: data.dependency, probStmt: data.problemstatement, name: data.name, output: data.output, evalfun: data.evalfun, code: data.code, score: data.score.low, negativescore: data.negativescore.low, video: data.video}, function() {
            });
          }.bind(this),
          error: function(err)
          {
          }.bind(this)
        });
      }
    }
    updatesearchQueryScenario(e, a) {
      let empId = cookies.get('empId');
      if(a.value != null) {
        let res = a.value;
        this.setState({selectedDomain: res});
        let scenarioArray = [];
        $.ajax({
          url: '/users/findScenarios',
          type: 'POST',
          data: {domain: res, empId: empId},
          success: function(data)
          {
            for(let i in data) {
              if(i !== null) {
                scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
              }
            }
            let context = this;
            let scenarioArray1 = [];
            $.ajax({
              url: '/component/getAllScenarios',
              type: 'GET',
              success: function(data) {
                for (let i in data) {
                  if (i !== null) {
                    scenarioArray1.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
                  }
                }
                context.setState({scenario1: scenarioArray1});
              },
              error: function(err) {
              }
            });
            context.setState({
              scenario: scenarioArray
            });
          }.bind(this),
          error: function(err)
          {
          }.bind(this)
        });
      }
    }
    render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Modify existing user story</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Customer journey</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario} placeholder='Select the Customer journey' fluid search selection options={this.state.domain}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>User story</p>
                  </label>
                  <Dropdown onChange={this.updateScenario} fluid placeholder='Select User story to Update' selection options={this.state.scenario}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Name</p>
                  </label>
                  <input autoComplete='off' type='text' ref='scenarioName' value={this.state.name} onChange={this.nameChange} placeholder='Name' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Problem Statement</p>
                    <textarea ref='probStmt' placeholder='Problem Statement' onChange={this.probstmtChange} value={this.state.probStmt} required/>
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Output</p>
                  </label>
                  <input autoComplete='off' type='text' ref='outputValue' onChange={this.outputChange} required value={this.state.output} placeholder='output' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>eval function</p>
                  </label>
                  <input autoComplete='off' type='text' ref='evalFunc' required onChange={this.evalChange} value={this.state.evalfun} placeholder='eval func' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Actual Dependencies</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario1} value={this.state.selectedAccount} placeholder='Dependencies' fluid multiple search selection options={this.state.scenario1} required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Given Dependencies</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario2} value={this.state.selectedGivenAccount} placeholder='Dependencies' fluid multiple search selection options={this.state.scenario1} required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Code</p>
                    <input autoComplete='off' type='text' ref='codeFunc' required onChange={this.codeChange} value={this.state.code} placeholder='code path' required/>
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Score</p>
                    <input autoComplete='off' type='number' ref='score' required onChange={this.score} value={this.state.score} placeholder='score' required/>
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Negative Score</p>
                    <input autoComplete='off' type='number' ref='negativescore' required onChange={this.negativescore} value={this.state.negativescore} placeholder='Negative score' required/>
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Video</p>
                    <input autoComplete='off' type='text' ref='video' required onChange={this.video} value={this.state.video} placeholder='video' required/>
                  </label>
                </Form.Field>
              </Form>
              <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.updateNewScenario}>Update  User story</Button></Grid.Column>
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
