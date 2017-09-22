import React, {Component} from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import {Grid, Button, Divider, Form, Dropdown, Dimmer, Header, Icon} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
let accordionTitle = {
  height: '30px',
  textAlign: 'center',
  border: '1px',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '2.0rem',
  fontSize: '15px'
};
export default class Container extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      components: [],
      status: '',
      scenarioId: '',
      problemstatement: '',
      domain: [],
      scenario: [],
      statusForComp: false,
      toUpdateScenario: '',
      sequences: [],
      selectedSequence: '',
      selectedDomain: '',
      dseqModal: false
    };
    this.getDomain = this.getDomain.bind(this);
    this.updatesearchQueryScenario = this.updatesearchQueryScenario.bind(this);
    this.updateScenario = this.updateScenario.bind(this);
    this.updateSequence = this.updateSequence.bind(this);
    this.deleteSequence = this.deleteSequence.bind(this);
    this.checkForDeletedSuccessfullyAlert = this.checkForDeletedSuccessfullyAlert.bind(this);
  }
  checkForDeletedSuccessfullyAlert() {
    this.refs.asd.success(
      'Removed successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  deleteSequence() {
    this.setState({dseqModal: true});
  }
  handleNoDeleteSequenceClick() {
    this.setState({dseqModal: false});
  }
  handleYesDeleteSequenceClick() {
    let context = this;
    context.setState({dseqModal: false});
    $.ajax({
      url: '/component/deleteSequence',
      type: 'POST',
      data: {
        sequence: this.state.selectedSequence,
        scenarioId: this.state.scenarioId
      },
      success: function(dataDB) {
        context.checkForDeletedSuccessfullyAlert();
        context.setState({scenario: [], sequences: []});
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
  }
  updateSequence(e, a) {
    if (a.value != null) {
      let res = a.value;
      this.setState({selectedSequence: res});
    }}
    updateScenario(e, a) {
      if (a.value != null) {
        let res = a.value;
        let context = this;
        this.setState({toUpdateScenario: res});
        $.ajax({
          url: '/users/findScenarioData',
          type: 'POST',
          data: {
            scenario: res
          },
          success: function(dataDB) {
            let data = dataDB.records[0]._fields[0].properties;
            let sequenceArray = [];
            for (let i in data.sequence) {
              if (i !== null) {
                let a = parseInt(i) + 1;
                let aaa = 'Sequence ' + a;
                sequenceArray.push({key: data.sequence[i], value: data.sequence[i], text: aaa});
              }
            }
            if(sequenceArray.length != 0) {
              context.setState({scenarioId: dataDB.records[0]._fields[0].identity.low, sequences: sequenceArray}, function() {
              });
            }
          }.bind(this),
          error: function(err) {
          }.bind(this)
        });
      }
    }
    componentWillMount() {
      this.getDomain();
    }
    getDomain() {
      let domainArray = [];
      $.ajax({
        url: '/users/findDomain',
        type: 'GET',
        success: function(data) {
          for (let i in data) {
            if (i !== null) {
              domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
            }
          }
          this.setState({domain: domainArray});
        }.bind(this),
        error: function(err) {
        }.bind(this)
      });
    }
    updatesearchQueryScenario(e, a) {
      let empId = cookies.get('empId');
      let context = this;
      if (a.value != null) {
        let res = a.value;
        let scenarioArray = [];
        $.ajax({
          url: '/users/findScenarios',
          type: 'POST',
          data: {
            domain: res, empId: empId
          },
          success: function(data) {
            for (let i in data) {
              if (i !== null) {
                scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
              }
            }
            context.setState({selectedDomain: res, scenario: scenarioArray});
          }.bind(this),
          error: function(err) {
          }.bind(this)
        });
      }
    }
    render() {
      let selectedSequenceValue = '';
      if(this.state.selectedSequence != '') {
        selectedSequenceValue = (<p style={{fontSize: '12px', fontFamily: 'arial'}}>The selected sequence is : {this.state.selectedSequence}</p>)
      }
      return (
        <div>
          <Dimmer active={this.state.dseqModal} onClickOutside={this.handleNoDeleteSequenceClick.bind(this)} page style={{fontSize: '130%'}}>
            <Header icon='trash outline' content='Delete Sequence' style={{color: 'white', marginLeft: '35%'}}/>
            <p style={{marginRight: '3.2%'}}>Are you sure you want to delete the selected sequence?</p>
            <Button color='red' inverted onClick={this.handleNoDeleteSequenceClick.bind(this)} style={{marginLeft: '10%', marginRight: '1%'}}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={this.handleYesDeleteSequenceClick.bind(this)}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Dimmer>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1}/>
              <Grid.Column width={14} className=''>
                <Form>
                  <Form.Field>
                    <label>
                      <p style={{fontSize: '14px', fontFamily: 'arial'}}><b>Customer journey </b></p>
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
                      <p style={{fontSize: '14px', fontFamily: 'arial'}}>Sequence</p>
                    </label>
                    <Dropdown onChange={this.updateSequence} fluid placeholder='Select Sequence' selection options={this.state.sequences} required/>
                  </Form.Field>
                  {selectedSequenceValue}
                </Form>
                <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.deleteSequence}>Delete sequence</Button></Grid.Column>
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
