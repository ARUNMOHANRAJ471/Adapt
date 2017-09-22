import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class LinkScenario extends React.Component {
  constructor() {
    super();
    this.state = {
      domain: [],
      scenario: [],
      searchQueryDomain: '',
      searchQueryScenario: [],
      domainNameandDescription: [],
      selectedAccount: []
    };
    this.AddDomainScenarioLink = this.AddDomainScenarioLink.bind(this);
    this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
  }
  componentWillMount() {
    this.getDomainAndScenario();
  }
  getDomainAndScenario() {
    let domainArray = [];
    let domainNameandDescriptionArr = [];
    $.ajax({
      url: '/users/findDomain',
      type: 'GET',
      success: function(data) {
        for (let i in data) {
          domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
          domainNameandDescriptionArr.push({name: data[i].name, description: data[i].description});
        }
        this.setState({domain: domainArray});
        this.setState({domainNameandDescription: domainNameandDescriptionArr});
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
    let scenarioArray = [];
    $.ajax({
      url: '/admin/findDomainScenario',
      type: 'POST',
      success: function(data) {
        for (let i in data) {
          if (i !== null) {
            scenarioArray.push({key: data[i].scenarioId, value: data[i].scenarioId, text: data[i].scenarioName});
          }
        }
        this.setState({scenario: scenarioArray}, function() {
        });
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
  }
  updatesearchQueryDomain(e, a) {
    let res = a.value;
    let arr = Object.keys(res).map(function(key) {
      return res[key];
    });
    this.setState({searchQueryDomain: res});
  }
  updatesearchQueryScenario(e, a) {
    let res = a.value;
    let arr = Object.keys(res).map(function(key) {
      return parseInt(res[key]);
    });
    this.setState({searchQueryScenarios: arr, selectedAccount: arr}, function() {
    });
  }
  checkForSuccessAlert() {
    this.refs.asd.success(
      'User story linked successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  AddDomainScenarioLink() {
    let description = '';
    let context = this;
    let scenarios = this.state.searchQueryScenarios;
    for (let i in this.state.domainNameandDescription) {
      if (this.state.searchQueryDomain === this.state.domainNameandDescription[i].name) {
        description = this.state.domainNameandDescription[i].description;
        break;
      }
    }
    let data = {
      scenarioName: scenarios,
      domainName: this.state.searchQueryDomain,
      domainDescription: description
    };
    $.ajax({
      url: '/admin/linkScenario',
      type: 'POST',
      traditional: true,
      data: data,
      success: function(data) {
        // alert('sucess');
        context.checkForSuccessAlert();
        context.setState({domain: [], searchQueryDomain: '', searchQueryScenarios: []}, function() {
        });
        context.setState({scenario: [], selectedAccount: []});
        context.getDomainAndScenario();
      }.bind(this),
      error: function(err) {
        this.setState({domainNameandDescription: []});
        this.setState({searchQueryDomain: ''});
        this.setState({searchQueryScenarios: []});
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
              <p style={{fontSize: '14px', fontFamily: 'arial'}}><b>Add customer journey-User story Link</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Customer journey</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} placeholder='Select the Customer journey to be modified' fluid search selection options={this.state.domain} required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>User story</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} value={this.state.selectedAccount} placeholder='Select User story to be linked to Customer journey' fluid multiple search selection options={this.state.scenario} required/>
                </Form.Field>
              </Form>
              <Grid.Column width={8}>
                <Button style={{marginTop: '10px'}} color='green' fluid onClick={this.AddDomainScenarioLink}>Add</Button>
              </Grid.Column>
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
