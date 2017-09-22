import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class DelinkStage extends React.Component {
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
    this.DeleteDomainScenarioLink = this.DeleteDomainScenarioLink.bind(this);
    this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
  }
  componentWillMount() {
    this.getDomainAndScenario();
  }
  checkForSuccessAlert() {
    this.refs.asd.success(
      'Stage delinked successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  getDomainAndScenario() {
    let domainArray = [];
    let domainNameArr = [];
    $.ajax({
      url: '/gameadmin/findTheme',
      type: 'GET',
      success: function(data) {
        for (let i in data) {
          if (i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
            domainNameArr.push({name: data[i].name});
          }
        }
        this.setState({domain: domainArray});
        this.setState({domainNameArr: domainNameArr});
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
  }
  updatesearchQueryDomain(e, a) {
    let res = a.value;
    let scenarioArray = [];
    this.setState({searchQueryDomain: res});
    $.ajax({
      url: '/gameadmin/findDelinkStage',
      type: 'POST',
      data: {
        domain: res
      },
      success: function(data) {
        for (let i in data) {
          if (i !== null) {
            scenarioArray.push({key: data[i].scenarioId, value: data[i].scenarioId, text: data[i].scenarioName});
          }
        }
        this.setState({scenario: scenarioArray});
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
  }
  updatesearchQueryScenario(e, a) {
    let res = a.value;
    let arr = Object.keys(res).map(function(key) {
      return res[key];
    });
    this.setState({searchQueryScenarios: arr,selectedAccount: arr});
  }
  DeleteDomainScenarioLink() {
    let description = '';
    let context = this;
    let scenarios = this.state.searchQueryScenarios;
    for (let i in this.state.domainNameandDescription) {
      if (this.state.searchQueryDomain === this.state.domainNameandDescription[i].name) {
        description = this.state.domainNameandDescription[i].description;
        break;
      }
    }
    $.ajax({
      url: '/gameadmin/delinkStage',
      type: 'POST',
      traditional: true,
      data: {
        scenarioName: scenarios,
        domainName: this.state.searchQueryDomain,
        domainDescription: description
      },
      success: function(data) {
        context.checkForSuccessAlert();
        context.setState({domain: []});
        context.setState({scenario: []});
        context.getDomainAndScenario();
      }.bind(this),
      error: function(err) {
        this.setState({domainNameandDescription: []});
        this.setState({searchQueryDomain: ''});
        this.setState({searchQueryScenarios: [], selectedAccount: []});
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
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Remove Theme-Stage Link</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Theme</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} placeholder='Select the Theme to be modified' fluid search selection options={this.state.domain} />
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Stage</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} value={this.state.selectedAccount} placeholder='Select Stage to be delinked to Theme' fluid multiple search selection options={this.state.scenario}/>
                </Form.Field>
              </Form>
              <Grid.Column width={8}>
                <Button style={{marginTop: '10px'}} color='green' fluid onClick={this.DeleteDomainScenarioLink}>Remove</Button>
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