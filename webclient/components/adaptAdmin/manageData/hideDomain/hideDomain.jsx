import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
export default class HideDomain extends React.Component {
  constructor() {
    super();
    this.state = {
      domainArray: [],
      domainSelected: '',
      flagStatus: [],
      currentFlag: '',
      displayDomain: ''
    };
    this.toggleDomain = this.toggleDomain.bind(this);
  }
  //  @Mayanka : Loading all the Customer journeys from database
  componentWillMount() {
    let context = this;
    let arr = [];
    let domains = [];
    let status = [];
    $.ajax({
      url: '/admin/getAllDomain',
      type: 'GET',
      success: function(res) {
        for (let i = 0; i < res.records.length; i = i + 1) {
          arr.push({content: res.records[i]._fields[0].properties.name});
        }
        for (let j = 0; j < res.records.length; j = j + 1) {
          status.push({name: res.records[j]._fields[0].properties.name, flag: res.records[j]._fields[0].properties.flag.low});
        }
        for (let k = 0; k < arr.length; k = k + 1) {
          domains.push({key: arr[k].content, value: arr[k].content, text: arr[k].content});
        }
        context.setState({domainArray: domains});
        context.setState({flagStatus: status});
      },
      error: function(err) {
      }
    });
  }
  //  Mayanka : Archiving user selected customer journey
  updatesearchQueryDomain(e, a) {
    let res = a.value;
    this.setState({displayDomain: res});
    this.setState({domainSelected: res}, function() {
      for(let i in this.state.flagStatus) {
        if(this.state.domainSelected == this.state.flagStatus[i].name) {
          let selectedDomainFlag = this.state.flagStatus[i].flag;
          if(selectedDomainFlag == 1) {
            this.setState({currentFlag: 'Enabled'});
            break;
          }
          else if(selectedDomainFlag == 0) {
            this.setState({currentFlag: 'Disabled'});
            break;
          }
        }
      }
    });
  }
  //  Mayanka : Identifying the customer journey that the user has selected
  toggleDomain() {
    let context = this;
    let name = this.state.domainSelected;
    let flag = 0;
    if(this.state.currentFlag == 'Enabled') {
      flag = 0;
      context.setState({currentFlag: 'Disabled'});
    }
    else if(this.state.currentFlag == 'Disabled') {
      flag = 1;
      context.setState({currentFlag: 'Enabled'});
    }
    $.ajax({
      url: '/admin/toggleDomain',
      type: 'POST',
      data: {name: name, flag: flag},
      success: function(res) {
        context.setState({flagStatus: []});
        context.setState({domainSelected: ''});
      },
      error: function(err) {
      }
    });
  }
  render() {
    let FlagStatus = '';
    let statusFlag = '';
    if(this.state.currentFlag != '' && this.state.displayDomain != '') {
      FlagStatus = (<div><p style={{fontSize: '12px', fontFamily: 'arial'}}><strong>{this.state.displayDomain} : {this.state.currentFlag}</strong></p></div>);
      if(this.state.currentFlag == 'Enabled') {
        statusFlag = 'Disable';
      } else if(this.state.currentFlag == 'Disabled') {
        statusFlag = 'Enable';
      }
    }
    else{
      FlagStatus = '';
    }
    //  Mayanka : UI of Archieve customer journey
    return(
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Enable or Disable Customer journey</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Select Customer journey</p>
                  </label>
                  <Dropdown fluid onChange={this.updatesearchQueryDomain.bind(this)} placeholder='Select the Domain to be changed' fluid search selection options={this.state.domainArray} required/>
                </Form.Field>
                {FlagStatus}
                <p style={{fontSize: '12px', fontFamily: 'arial'}}>Press Toggle to enable/disable a Customer journey</p>
              </Form>
              {(this.state.currentFlag == '' ) ? <Grid.Column width={1}><Button style={{marginTop: '10px'}} fluid color='green'  onClick={this.toggleDomain}>Toggle</Button></Grid.Column>:
              <Grid.Column width={1}><Button style={{marginTop:'10px'}} fluid color='green'  onClick={this.toggleDomain}>{statusFlag}</Button></Grid.Column>}
              <Divider/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
