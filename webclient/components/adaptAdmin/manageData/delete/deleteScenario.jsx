import React from 'react';
import {Form, Grid, Button, Icon, Divider, Dropdown, Dimmer, Header} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class DeleteScenario extends React.Component {
  constructor() {
    super();
    this.state = {
      domain: [],
      scenario: [],
      toDeleteScenario: '',
      selectedDomain: '',
      probStmt: '',
      dsModal: false
    };
    this.updatesearchQueryScenario = this.updatesearchQueryScenario.bind(this);
    this.deleteScenario = this.deleteScenario.bind(this);
    this.updateScenario = this.updateScenario.bind(this);
    this.validateData = this.validateData.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForScenarioDeleteAlert = this.checkForScenarioDeleteAlert.bind(this);
  }
  componentWillMount() {
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
  checkForEmptyAlert() {
    this.refs.asd.error(
      'Empty fields',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForScenarioDeleteAlert(scenarioToDelete) {
    this.refs.asd.success(
      scenarioToDelete + ' scenario is deleted successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
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
          this.setState({
            scenario: scenarioArray
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }
  updateScenario(e, a) {
    if(a.value != null) {
      let res = a.value;
      this.setState({toDeleteScenario: res});
      let context = this;
      $.ajax({
        url: '/users/findScenarioData',
        type: 'POST',
        data: {scenario: res},
        success: function(dataDB)
        {
          let data = dataDB.records[0]._fields[0].properties;
          context.setState({probStmt: data.problemstatement});
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }
  deleteScenario() {
    this.setState({dsModal: true});
  }
  handleNoDeleteScenarioClick() {
    this.setState({dsModal: false});
  }
  handleYesDeleteScenarioClick() {
    this.setState({dsModal: false});
    let context = this;
    let scenarioToDelete = this.state.toDeleteScenario;
    $.ajax({
      url: '/scenario/deleteScenario',
      type: 'POST',
      data: {scenario: scenarioToDelete},
      success: function(data)
      {
        context.checkForScenarioDeleteAlert(scenarioToDelete);
        this.setState({
          probStmt: ''
        });
        let dummyObj = {};
        dummyObj.value = context.state.selectedDomain;
        context.updatesearchQueryScenario('e', dummyObj);
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }

  validateData(e) {
    e.preventDefault();
    let selectedDomain = this.state.selectedDomain;
    let toDeleteScenario = this.state.toDeleteScenario;
    if(selectedDomain === '' || toDeleteScenario === '') {
      this.checkForEmptyAlert();
    }
    else{
      this.deleteScenario();
    }
  }
  render() {
    let desc = '';
    if(this.state.probStmt != '') {
      desc = (<div><p><strong>Problem Statement:</strong></p>{this.state.probStmt}</div>);
    }
    return (
      <div>
        <Dimmer active={this.state.dsModal} onClickOutside={this.handleNoDeleteScenarioClick.bind(this)} page style={{fontSize: '130%'}}>
          <Header icon='trash outline' content='Delete user story' style={{color: 'white', marginLeft: '35%'}}/>
          <p style={{marginRight: '3.2%'}}>Are you sure you want to delete the selected user story?</p>
          <Button color='red' inverted onClick={this.handleNoDeleteScenarioClick.bind(this)} style={{marginLeft: '10%', marginRight: '1%'}}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.handleYesDeleteScenarioClick.bind(this)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Dimmer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Delete user story</b></p>
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
                  <Dropdown onChange={this.updateScenario} fluid placeholder='Select User story to Delete' selection options={this.state.scenario}/>
                </Form.Field>
                {desc}
              </Form>
              <Grid.Column width={7}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.validateData}>Delete</Button></Grid.Column>
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
