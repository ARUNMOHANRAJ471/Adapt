import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddStage extends React.Component {
  constructor() {
    super();
    this.state = {
      scenario: [],
      correctSequence: [],
      selectedScenarios: [],
      selectedAccount: [],
      selectedGivenScenarios: [],
      selectedGivenAccount: []
    };
    this.getAllScenarios = this.getAllScenarios.bind(this);
    // this.getId = this.getId.bind(this);
    // this.supportChange = this.supportChange.bind(this);
    this.validateData = this.validateData.bind(this);
    this.addNewScenario = this.addNewScenario.bind(this);
    // this.updatesearchQueryScenario = this.updatesearchQueryScenario.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForonlyAlphabetsForNameAlert = this.checkForonlyAlphabetsForNameAlert.bind(this);
    this.checkForaddedNewScenarioAlert = this.checkForaddedNewScenarioAlert.bind(this);
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
  checkForonlyAlphabetsForNameAlert() {
    this.refs.asd.error(
      'Only alphabets allowed in Stage name',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForaddedNewScenarioAlert() {
    this.refs.asd.success(
      'New stage added successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }

  getAllScenarios() {
    let context = this;
    let scenarioArray = [];
    $.ajax({
      url: '/gameadmin/getAllStages',
      type: 'GET',
      success: function(data) {
        for (let i in data) {
          if (i !== null) {
            scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
          }
        }
        context.setState({scenario: scenarioArray});
      },
      error: function(err) {
      }
    });
  }
  componentDidMount() {
    this.getAllScenarios();
  }

  validateData(e) {
    e.preventDefault();
    let scenarioName = this.refs.scenarioName.value;
      let Video = this.refs.Video.value;

    if(scenarioName === '' || Video === '') {
      this.checkForEmptyAlert();
    }
    this.addNewScenario(scenarioName, Video);
  }
  addNewScenario(scenarioName, Video) {
    let context = this;

    $.ajax({
      url: '/gameadmin/addNewStage',
      type: 'POST',
      data:{scenarioName: scenarioName, Video: Video},
      success: function(response)
      {
        context.checkForaddedNewScenarioAlert();
        this.refs.scenarioName.value = '';
          this.refs.Video.value = '';

        context.getAllScenarios();
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Add new Stage</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Name</p>
                  </label>
                  <input autoComplete='off' type='text' ref='scenarioName' placeholder='Name of the stage' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Video path</p>
                  </label>
                  <input autoComplete='off' type='text' ref='Video' placeholder='Video path' required/>
                </Form.Field>

              </Form>
              <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.validateData}>Add</Button></Grid.Column>
              <Divider/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop: '8%'}}/>
        </div>
      );
    }
  }
