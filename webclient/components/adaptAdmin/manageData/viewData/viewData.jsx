import React from 'react';
import {Form, Grid, Dropdown, Card} from 'semantic-ui-react';
import Sequence from './SequenceAccordion';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class ViewData extends React.Component {
  constructor() {
    super();
    this.state = {
      domain: [],
      scenarioDropdown: [],
      searchQueryDomain: '',
      searchQueryScenario: '',
      domainNameandDescription: [],
      displayScenario: [],
      compArray: [],
      correctSequence: [[]],
      precondition: []
    };
    this.findScenarios = this.findScenarios.bind(this);
    this.getCorrectSequence = this.getCorrectSequence.bind(this);
    this.getPreConditions = this.getPreConditions.bind(this);
  }
  //  @Mayanka : Loading all the customer journeys from database
  componentWillMount() {
    let domainArray = [];
    let domainNameandDescriptionArr = [];
    $.ajax({
      url: '/users/findDomain',
      type: 'GET',
      success: function(data)
      {
        for(let i in data) {
          if(i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
            domainNameandDescriptionArr.push({name: data[i].name, description: data[i].description});
          }
        }
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
    this.setState({
      domain: domainArray
    });
  }
  //  @Mayanka : Loading the user stories of the domain
  findScenarios(e, a) {
    this.setState({scenario: []});
    let empId = cookies.get('empId');
    let scenarioArray = [];
    let displayScenario = [];
    $.ajax({
      url: '/users/findScenarios',
      type: 'POST',
      data: {domain: a.value, empId: empId},
      success: function(data)
      {
        for(let i in data) {
          if(i !== null) {
            scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
            displayScenario.push({name: data[i].scenarioName, sequence: data[i].sequence, description: data[i].scenarioDescription});
          }
        }
        this.setState({scenarioDropdown: scenarioArray});
        this.setState({displayScenario: displayScenario});
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  //  @Mayanka : finding the customer journey selected by the user
  updatesearchQueryDomain(e, a) {
    this.findScenarios(e, a);
  }
  //  @Mayanka : finding the user story selected by the user
  updatesearchQueryScenario(e, a) {
    let res = a.value;
    this.setState({
      searchQueryScenario: res
    }, function() {
      this.getCorrectSequence();
    });
  }
  //  @Mayanka : getting the sequences related to the user story from database
  getCorrectSequence() {console.log('in get coo sew\e');
    this.setState({
      compArray: []
    });
    let sequence = [];
    let a = [];
    let arr1 = [[]];
    if (this.state.displayScenario != undefined) {
      for(let i in this.state.displayScenario) {
        if(this.state.searchQueryScenario === this.state.displayScenario[i].name) {
          sequence = this.state.displayScenario[i].sequence;
          break;
        }
      }
    }
    for(let i in sequence) {
      if(a != undefined) {
        a = sequence[i].split('-');
        arr1.push(a);
      }
    }
    arr1.shift();
    let components = arr1;
    let oneArr = [];
    let corrSeq = [];
    let twoD = [[]];
    if(components.length == 1) {
      oneArr.push(components[0]);
      $.ajax({
        url: '/admin/getCorrectSequence',
        type: 'POST',
        data: {components: oneArr, length: 1},
        traditional: true,
        success: function(data)
        {
          for(let i in data) {
            corrSeq.push(data[i]);
          }
          twoD.push(corrSeq);
          this.setState({
            correctSequence: twoD
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
    else{console.log('in get coo sew\e',components);
      $.ajax({
        url: '/admin/getCorrectSequence',
        type: 'POST',
        data: {components: components, length: components.length},
        traditional: true,
        success: function(data)
        {console.log('corr sequence data',data);
          for(let i in data){
            this.setState({
              compArray: data[i]
            });
          }
          let dataArray = [];
          dataArray = this.state.compArray;
          let tempArray = [];
          let finalArray = [[]];
          let m = 0;
          for(let i = 0; i < components.length && components != undefined ; i++) {
            tempArray = [];
            for(let j = 0; j < components[i].length && components[i] != undefined  ; j++) {
              tempArray[j] = dataArray[m];
              m++;
            }
            if(tempArray != undefined && tempArray != ''){
              finalArray.push(tempArray);
            }
          }
          this.setState({
            correctSequence: finalArray
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
    this.getPreConditions();
  }
  //  @Mayanka : getting the dependencies related to the user story
  getPreConditions() {
    let context = this;
    $.ajax({
      url: '/users/findScenarioData',
      type: 'POST',
      data: {scenario: this.state.searchQueryScenario},
      success: function(dataDB)
      {
        let data = dataDB.records[0]._fields[0].properties;
        context.setState({precondition: data.precondition});
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  render() {
    let Name = '';
    if(this.state.searchQueryScenario != '') {
      Name = (<div>{this.state.searchQueryScenario}</div>);
    }
    let dependencies = '';
    if(this.state.precondition != '') {
      dependencies = (<div>Dependency</div>);
    }
    let bb = <p style={{textAlign:'center',fontWeight:'bold'}}>No dependencies</p>;
    bb = this.state.precondition.map((item)=>{
      return <b><li style={{marginLeft:'7%'}}>{item}</li></b>
    });
    let description = '';
    let displayScenario = '';
    if (this.state.searchQueryScenario != undefined) {
      for(let i in this.state.displayScenario) {
        if(this.state.searchQueryScenario === this.state.displayScenario[i].name) {
          description = this.state.displayScenario[i].description;
          displayScenario = (<div><p><strong>Description</strong></p>{description}</div>);
          break;
        }
      }
    }
    let j = 0;
    let sequence = '';
    let displaySequence = '';
    let a = [];
    let arr = [[]];
    if (this.state.displayScenario != undefined) {
      for(let i in this.state.displayScenario) {
        if(this.state.searchQueryScenario === this.state.displayScenario[i].name) {
          sequence = this.state.displayScenario[i].sequence;
          displaySequence = (<div>{ sequence }</div>);
          break;
        }
      }
    }
    let cardItems = '';
    for(let i in this.state.correctSequence) {
      if(this.state.correctSequence[i] != '') {
        cardItems = (<Card.Group items={this.state.correctSequence[i]}/>);
      }
    }
console.log("correct seq in view data: ", this.state.correctSequence);
    //  @Mayanka : UI for showing sequence information
    return (
      <div>
        <Grid style={{marginLeft: '5%'}}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div style={{fontSize: '16px', fontFamily: 'arial', marginBottom: '10px'}}><b>View Data</b></div>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Select customer journey</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} placeholder='Select the Customer journey to be modified' fluid search selection options={this.state.domain}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Select user story</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} placeholder='Select User story to view data' fluid search selection options={this.state.scenarioDropdown}/>
                </Form.Field>
              </Form>
              <Grid.Column width={2}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={6}>
              <h3 style={{marginLeft: '20%'}} style={{fontSize: '16px', fontFamily: 'arial'}}><b>{Name}</b></h3>
              <Sequence correctSequence = {this.state.correctSequence}/>
              <h3 style={{marginLeft: '20%'}} style={{fontSize: '16px', fontFamily: 'arial', marginBottom: '2%'}}><b>{dependencies}</b></h3>
              {bb}
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
module.exports = ViewData;
