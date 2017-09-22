import React from 'react';
import {
  Form,
  Grid,
  Button,
  Icon,
  Divider,
  TextArea,
  Dropdown
} from 'semantic-ui-react';
export default class AddForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scenarioId: '',
      domain: [],
      scenario: [],
      statusForComp: false,
      toUpdateScenario:''
    };
    this.updatesearchQueryScenario = this.updatesearchQueryScenario.bind(this);
    this.updateScenario = this.updateScenario.bind(this);
    this.getDomain = this.getDomain.bind(this);
  };

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
          //console.log(data[i]);
          if (i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
          }
        }
        this.setState({domain: domainArray});
      }.bind(this),
      error: function(err) {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }

  updatesearchQueryScenario(e, a) {
    // //console.log("e ",e);
    //console.log("a ", a);
    let context = this;
    if (a.value != null) {
      let res = a.value;

      let scenarioArray = [];
      $.ajax({
        url: "/users/findScenarios",
        type: 'POST',
        data: {
          domain: res
        },
        success: function(data) {
          for (let i in data) {
            // //console.log(data[i]);
            if (i !== null) {
              scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
            }
          }
          context.setState({scenario: scenarioArray});
          // context.getDomainComponents(res, scenarioArray);
        }.bind(this),
        error: function(err) {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
    }
  }

  updateScenario(e, a) {
    if (a.value != null) {
      let res = a.value;
      // if (res != this.state.toUpdateScenario) {
      //   this.clearClick();
      // }
      let context = this;
      this.setState({toUpdateScenario: res});
      $.ajax({
        url: "/users/findScenarioData",
        type: 'POST',
        data: {
          scenario: res
        },
        success: function(dataDB) {
          var data = dataDB.records[0]._fields[0].properties;
          //console.log('The data is :', data);
          context.setState({scenarioId: dataDB.records[0]._fields[0].identity.low});
          //console.log('id', this.state.scenarioId);
          // context.setState({probStmt:data.problemstatement,name:data.name,output:data.output,evalfun:data.evalfun,code:data.code});
        }.bind(this),
        error: function(err) {
          //console.log('error occurred on AJAX');
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
              <h4>Add Correct Sequence</h4>
              <Form>
                <Form.Field>
                  <label>
                    <h4>Select Customer journey of the User story</h4>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario} placeholder='Select the Customer journey' fluid search selection options={this.state.domain}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <h4>Select User story</h4>
                  </label>
                  <Dropdown onChange={this.updateScenario} fluid placeholder='Select User story to Update' selection options={this.state.scenario}/>
                </Form.Field>
              </Form>
              <Divider/>
              <Grid.Column width={6}>
                {/* <Button fluid color='green' onClick={this.validateData}>Add</Button> */}
              </Grid.Column>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
