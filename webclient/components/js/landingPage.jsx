import React from 'react';
import Domain from './domainSelection.jsx';
import Scenario from './scenario.jsx';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      buttonStatus: [],
      domainName2: '',
      resultall: []
    };
  }
  getScenarioDetails(domain) {
    let result2 = [];
    domain.map((item, index)=>{
      if(item.status != 'Completed') {
        result2.push(item);
      }
    })
    this.setState({resultall: domain});
    this.setState({result: result2});
  }

  getButtonstatus(data) {
    this.setState({buttonStatus: data});
  }
getdomainName(domainName) {
this.setState({domainName2: domainName});
}
  render() {
    let landingPage;
    if (cookies.get('userType') == 'User' || cookies.get('userType') == 'Pair') {
      landingPage = (
        <div>
          {/* Call for Customer Journey */}
          <Domain search={this.getScenarioDetails.bind(this)} buttonStatus={this.getButtonstatus.bind(this)} domainName2={this.getdomainName.bind(this)}/>
          {/* Call for User story */}
          <Scenario result={this.state.result} resultall={this.state.resultall} buttonStatus={this.state.buttonStatus} domainName={this.state.domainName2}/></div>
      );
    } else {
      hashHistory.push('/');
    }
    return (
      <div>
        {landingPage}
      </div>
    );
  }
}
module.exports = MainComponent;
