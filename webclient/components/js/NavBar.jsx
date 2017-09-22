import React, {Component} from 'react';
const {hashHistory} = require('react-router');
import {
  Button,
  Dimmer,
  Card,
  Grid,
  Loader,
  Header
} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
let logoSize = {
  width: '40%'
}
class MenuExampleContentProp extends Component {
  constructor() {
    super();
    this.state = {
      domain: '',
      deployCodeModal: false,
      sprint1DisabledStatus: true,
      sprint2DisabledStatus: true,
      sprint3DisabledStatus: true,
      sprint4DisabledStatus: true,
      pushed: [],
      theCheatCode: 'madhu',
      cheatCode: '',
      active: false,
      activeLoader: false
    }
    this.logOut = this.logOut.bind(this);
    this.changeDomain = this.changeDomain.bind(this);
    this.DeployCode = this.DeployCode.bind(this);
    this.checkforCodeDeployement = this.checkforCodeDeployement.bind(this);
    this.handlePressedKey = this.handlePressedKey.bind(this);
    this.handleOpenLoader = this.handleOpenLoader.bind(this);
    this.handleCloseLoader = this.handleCloseLoader.bind(this);
  }

  componentWillMount() {
    this.getSprintDetails();
    let loc = window.location.hash.substring(2);
    window.addEventListener('keypress', this.handlePressedKey);
  }
  handleOpenLoader() {
    this.setState({activeLoader: true});
  }
  // function to close loader after fetching data
  handleCloseLoader() {
    this.setState({activeLoader: false});
  }
  handleClose = () => {
    this.setState({active: false});
  }
  handlePressedKey(e) {
    let code = this.state.theCheatCode;
    let pushedArray = this.state.pushed;
    let val = this.state.cheatCode + e.key;
    this.setState({cheatCode: val})
    if (val == code) {
      let lastPushed = pushedArray.lastIndexOf(true);
      if (lastPushed == -1) {
        this.setState({sprint1DisabledStatus: false});
      }
      if (lastPushed == 0) {
        this.setState({sprint2DisabledStatus: false});
      }
      if (lastPushed == 1) {
        this.setState({sprint3DisabledStatus: false});
      }
      if (lastPushed == 2) {
        this.setState({sprint4DisabledStatus: false});
      }
      this.setState({cheatCode: ''});
    } else {
      this.setState({sprint1DisabledStatus: true, sprint2DisabledStatus: true, sprint3DisabledStatus: true, sprint4DisabledStatus: true});
    }
    if (e.key == 'z') {
      this.setState({cheatCode: ''});
    }
  }

  checkforCodeDeployement() {
    let context = this;
    this.refs.asd.success('Your code will get deployed in some time. Please check Git and Jenkins to see the deployment process.', '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    });
  }

  getSprintDetails() {
    let context = this;
    $.ajax({
      url: '/users/getSprintDetails',
      type: 'GET',
      success: function(data) {
        context.setState({pushed: data.records[0]._fields[0].properties.pushed});
      },
      error: function(err) {
        // console.log('error occurred on AJAX');
      }
    });
  }
  changeDomain(e) {
    this.setState({domain: e.target.value});
  }
  // logOut
  logOut() {
    cookies.remove('username');
    cookies.remove('userType');
    cookies.remove('empId');
    cookies.remove('loginId');
    hashHistory.push('/');
  }
  profile() {
    hashHistory.push('/profile');
  }
  tools() {
    hashHistory.push('/tools');
  }
  userDashboard() {
    hashHistory.push('/userDashboard');
  }
  clickChange() {
    this.props.restaurantData(this.state.domain);
  }
  DeployCode() {
    let context = this;
    $.ajax({
      url: '/users/getAllSprints',
      type: 'GET',
      success: function(data) {
        data.map((item, index) => {
          if (index == 0) {
            if (item.length == 12 && !context.state.pushed[0]) {
              context.setState({sprint1DisabledStatus: false});
            } else {
              context.setState({sprint1DisabledStatus: true});
            }
          } else if (index == 1) {
            if (item.length == 13 && context.state.pushed[0] && !context.state.pushed[1]) {
              context.setState({sprint2DisabledStatus: false});
            } else {
              context.setState({sprint2D2sabledStatus: true});
            }
          }
          if (index == 2) {
            if (item.length == 12 && context.state.pushed[0] && context.state.pushed[1] && !context.state.pushed[2]) {
              context.setState({sprint3DisabledStatus: false});
            } else {
              context.setState({sprint3DisabledStatus: true});
            }
          }
          if (index == 3) {
            if (item.length == 11 && context.state.pushed[0] && context.state.pushed[1] && context.state.pushed[2] && !context.state.pushed[3]) {
              context.setState({sprint4DisabledStatus: false});
            } else {
              context.setState({sprint4DisabledStatus: true});
            }
          }
        });
      },
      error: function(err) {
        // console.log('Error occured', err);
      }
    });
    this.setState({
      deployCodeModal: !this.state.deployCodeModal
    });
  }
  handleNodeployCodeModalClick() {
    this.setState({deployCodeModal: false});
  }
  handleOpen = () => {
    this.setState({active: true});
  }
  sprintDeploy(sprint) {
    this.setState({deployCodeModal: false});
    this.handleOpenLoader();
    let context = this;
    let url;
    if (sprint == 'Sprint1') {
      url = '/trial/sprintOneDeploy';
    } else if (sprint == 'Sprint2') {
      url = '/trial/sprintTwoDeploy';
    } else if (sprint == 'Sprint3') {
      url = '/trial/sprintThreeDeploy';
    } else if (sprint == 'Sprint4') {
      url = '/trial/sprintFourDeploy';
    }
    $.ajax({
      url: url,
      type: 'GET',
      success: function(data) {
        context.handleCloseLoader();
        context.handleOpen();
      },
      error: function(err) {
        // console.log('Error occured', err);
      }
    });
  }
  redirectToTools() {
    this.setState({active: false, deployCodeModal: false});
    hashHistory.push('/tools');
  }
  render() {
    let welcomeUser = '';
    let landingPage;
    let profileLink;
    let userDashboardLink;
    let logOutLink;
    let greeting = '';
    let toolsLink;
    let DeployCodeLink;
    const {activeLoader} = this.state
    const {active} = this.state
    if (cookies.get('userType') == 'User' || cookies.get('userType') == 'Pair') {
      welcomeUser = '';
      greeting = <p id='welcomecolor' className='navbar-text'>
        <span>Welcome&nbsp;&nbsp;</span>
        <b>{cookies.get('username') + welcomeUser}</b>
      </p>
      profileLink = (
        <li id='profilelink'>
          <button id='pro' type='button' className='btn btn-link b1' onClick={this.profile}>Profile</button>
        </li>
      );
      toolsLink = (
        <li id='toolslink'>
          <button id='pro' type='button' className='btn btn-link b1' onClick={this.tools}>Tools</button>
        </li>
      );
      DeployCodeLink = (
        <li>
          <button id='pro' type='button' className='btn btn-link b1' onClick={this.DeployCode}>DeployCode</button>
        </li>
      );
    } else if (cookies.get('userType') == 'Admin') {
      welcomeUser = ' (Admin)';
      greeting = <p id='welcomecolor' className='navbar-text'>
        <span>Welcome&nbsp;&nbsp;</span>
        <b>{cookies.get('username') + welcomeUser}</b>
      </p>
      profileLink = '';
    }
    //User Dashboard Link
    if (cookies.get('userType') == 'User' || cookies.get('userType') == 'Pair') {
      userDashboardLink = (
        <li id='dashboard'>
          <button id='pro' type='button' className='btn btn-link b1' onClick={this.userDashboard}>Dashboard</button>
        </li>
      );
    }

    // Logout Link
    if (cookies.get('userType') == 'User' || cookies.get('userType') == 'Pair' || cookies.get('userType') == 'Admin') {
      logOutLink = (
        <li id='logout'>
          <button id='pro' type='button' className='btn btn-link b1' onClick={this.logOut}>Logout</button>
        </li>
      );
    }
    let navInLanding = '';
    let headerLogo = (
      <div>
        <a className='navbar-brand' href='#'>
          <img src='./img/adapt.png' id='logoSize'/></a>
        <a className='nav navbar-nav navbar-right' href='#'>
          <img src='./img/wipro_digital.png' id='digitallogoSize'/></a>
      </div>
    );
    if (window.location.hash.substring(2) == 'landingPage') {
      headerLogo = (
        <div>
          <span className='navbar-brand' href='#'>
            <img src='./img/adapt.png' id='logoSize'/></span>
          <span className='nav navbar-nav navbar-right' href='#'>
            <img src='./img/wipro_digital.png' id='digitallogoSize'/></span>
        </div>
      );

      navInLanding = (
        <div>
          <ul className='nav navbar-nav' id='position'>
            <li id='logout'>
              {logOutLink}
            </li>
          </ul>
        </div>
      );
    }else if (window.location.hash.substring(2) == 'gameHomePage') {
      headerLogo = (
        <div>
          <span className='navbar-brand' href='#'>
            <img src='./img/adapt.png' id='logoSize'/></span>
          <span className='nav navbar-nav navbar-right' href='#'>
            <img src='./img/wipro_digital.png' id='digitallogoSize'/></span>
        </div>
      );

      navInLanding = (
        <div>
          <ul className='nav navbar-nav' id='position'>
            <li id='welcome'>
              {greeting}
            </li>
            <li id='logout'>
              {logOutLink}
            </li>
          </ul>
        </div>
      );
    } else {
      navInLanding = (
        <div>
          <ul className='nav navbar-nav' id='position'>
            <li id='welcome'>
              {greeting}
            </li>
            <li id='logout'>
              {logOutLink}
            </li>
            <li id='profilelink'>
              {profileLink}
            </li>
            <li id='dashboard'>
              {userDashboardLink}
            </li>
            <li id='tools'>
              {toolsLink}
            </li>
            <li id='deploycode'>
              {DeployCodeLink}
            </li>
          </ul>
        </div>
      );
    }
    landingPage = (
      <div>
        <Dimmer active={this.state.deployCodeModal} onClickOutside={this.handleNodeployCodeModalClick.bind(this)} page>
          <Grid>
            <Grid.Column width={5}/>
            <Grid.Column width={6}>
              <Card style={{
                color: 'black',
                width: '100%'
              }}>
                <table style={{
                  width: '100%',
                  marginTop: '4%',
                  marginBottom: '4%'
                }}>
                  <tr>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint1DisabledStatus} onClick={this.sprintDeploy.bind(this, 'Sprint1')} color='green'>Sprint1</Button>
                    </td>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint2DisabledStatus} onClick={this.sprintDeploy.bind(this, 'Sprint2')} color='green'>Sprint2</Button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint3DisabledStatus} onClick={this.sprintDeploy.bind(this, 'Sprint3')} color='green'>Sprint3</Button>
                    </td>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint4DisabledStatus} onClick={this.sprintDeploy.bind(this, 'Sprint4')} color='green'>Sprint4</Button>
                    </td>
                  </tr>
                </table>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}/>
          </Grid>
        </Dimmer>
        <nav className='navbar navbar-fixed-top' id='headerfixed'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
                <span className='icon-bar'/>
                <span className='icon-bar'/>
                <span className='icon-bar'/>
              </button>
              {headerLogo}
            </div>
          </div>
        </nav>
        <nav className='navbar navbar-inverse  navbar-fixed-top' id='welcomecontainer'>
          <div className='container-fluid'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <div>
              <div className='collapse navbar-collapse' id='myNavbar'>
                {navInLanding}
              </div>
            </div>
          </div>
        </nav>
        <img className='navbar-fixed-bottom navbar-inverse' src='./img/backgroundland.jpg' id='backgroundland'/>
      </div>
    );

    return (
      <div>
        <Dimmer active={activeLoader} page>
          <Loader>We're deploying your code. Please Wait.</Loader>
        </Dimmer>
        <Dimmer active={active} page>
          <Header as='h2' icon inverted>
            <p style={{
              textAlign: 'center'
            }}>Your code has been successfully deployed.
              <a onClick={this.redirectToTools.bind(this)}><br/><br/>Click here</a>
              to view the deployment in Tools</p>
          </Header>
        </Dimmer>
        {landingPage}
      </div>
    )
  }
}

module.exports = MenuExampleContentProp;
