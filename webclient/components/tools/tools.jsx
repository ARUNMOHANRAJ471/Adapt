import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class ToolsTab extends React.Component {
  constructor() {
    super();
  }

  render() {
    let toolsPage;
    if(cookies.get('userType') == "User" || cookies.get('userType') == "Pair") {
      toolsPage =(<div>
      <div className="container-fluid bg-3 text-center ">
        <div className="row " style = {{margin:'10% auto 10% 25%',width:'60%'}}>
          <div className="col-xs-9 col-sm-2" style = {{}}>
            <a href='http://agilenext.wipro.com:8100' target='_blank'>
              <button className="outline btn-circle-lg btn-success tabButtonProfile">Jira</button>
            </a>
          </div>
          <div className="col-xs-9 col-sm-2">
            <a href='http://wiproadapt.eastus.cloudapp.azure.com/' target='_blank'>
              <button className="outline btn-circle-lg btn-primary tabButtonProfile">Git</button>
            </a>
          </div>
          <div className="col-xs-9 col-sm-2">
            <a href='http://maxhealth.eastus.cloudapp.azure.com/jenkins/blue/organizations/jenkins/maxhealth_test/activity' target='_blank'>
              <button className="outline btn-circle-lg btn-danger tabButtonProfile">Jenkins</button>
            </a>
          </div>
          <div className="col-xs-9 col-sm-2">
            <a href='http://maxhealth.eastus.cloudapp.azure.com/sonar' target='_blank'>
              <button className="outline btn-circle-lg btn-warning  tabButtonProfile">Sonar</button>
            </a>
          </div>
          <div className="col-xs-9 col-sm-2">
            <a href='http://maxhealth.eastus.cloudapp.azure.com/' target='_blank'>
              <button className="outline btn-circle-lg tabButtonProfile" style={{backgroundColor:'#654098',color:'white'}}>Production</button>
            </a>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-fixed-bottom" id="footer" >
        <div id = "ribbon" className="row footer-brand-colour">
              <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
              <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
              <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
          </div>
             <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
           <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
         </nav></div>)
    }
    else{
      hashHistory.push('/');
    }
    return (
      <div>
        {toolsPage}
    </div>
    );
  }
}
module.exports = ToolsTab;
