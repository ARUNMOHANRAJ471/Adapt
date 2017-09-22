import React from 'react';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
import {Grid, Card, Dimmer, Icon, Button} from 'semantic-ui-react';
const {Link} = require('react-router');
const cookies = new Cookies();
class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      allDetails: {},
      picture: 'default_profile.jpg'
    };
    this.loadHome = this.loadHome.bind(this);
    this.getallData = this.getallData.bind(this);
    this.loadGameHome = this.loadGameHome.bind(this);
  }
  handleShow = () => this.setState({active: true})
  handleHide = () => this.setState({active: false})
  handleShow1 = () => this.setState({active1: true})
  handleHide1 = () => this.setState({active1: false})
  componentWillMount() {
    this.getallData();
  }
  // Loading all the data about that user
  getallData() {
    let a = cookies.get('empId');
    let context = this;
    $.ajax({
      url: '/profile/view',
      type: 'POST',
      data: {
        empId: a,
        userName: cookies.get('username'),
        userType: cookies.get('userType')
      },
      success: function(data) {
        context.setState({allDetails: data[0], picture: data[0].picture})
      },
      error: function(err) {
        // console.log('error',err);
      }
    });
  }
  // Load home page of simulation
  loadHome() {
    hashHistory.push('/home');
  }
  // Load home page of gamification
  loadGameHome() {
    hashHistory.push('/gameHomePage')
  }
  render() {
    const {active} = this.state
    const content = (
      <div>
        <Icon name='lock' size='huge'/>
      </div>
    )
    let landing;
    if (cookies.get('userType') == 'User' || cookies.get('userType') == 'Pair') {
      landing = (
        <div>
          <Grid style={{
            marginTop: '3%',
            marginLeft: '4%'
          }}>
            <Grid.Row>
              {/* Side Bar - Basic Information about that user */}
              <Grid.Column width={3} style={{
                marginTop: '1%'
              }}>
                {/* <Image style={{
                  borderRadius: '8%'
                }} src={require('./../../../webserver/pictures/' + this.state.picture)}/> */}
                <h5>
                  <b>Emp Id :</b>
                  {this.state.allDetails.empId}</h5>
                <h5>
                  <b>Team :</b>
                  {this.state.allDetails.teamName}</h5>
                <h5>
                  <b>Rank :</b>
                  Novice</h5>
              </Grid.Column>
              <Grid.Column width={7} style={{
                marginLeft: '3%'
              }}>
                <span>Welcome&nbsp;&nbsp;</span>
                <b>{cookies.get('username')}</b><br/><br/> {/* aDapt description */}
                <p style={{
                  textAlign: 'justify',
                  lineHeight: '1.8em'
                }}>aDapt is a unique program for enabling your transformation to a world-class Digital Delivery Leader. The program will help you keep pace with Digital Transformation demands and partner with clients in their transformation journey. In line with Wipro’s investments in the Digital space through acquisitions, aDapt is an investment aimed at transforming the Delivery ecosystem.</p>
                <p style={{
                  textAlign: 'justify',
                  lineHeight: '1.8em'
                }}>Unlike traditional skill building programs, aDapt is a 2 phased experiential learning and transformation program. It starts with a 30 day immersion program and is followed by a 6-8 month internship program. The focus is on behaviour, methods and processes, learning & unlearning, customer value delivery and latest technology trends. As a part of aDapt, you will learn through simulations, role-plays, one-one-coaching and masterclasses. As an aDapt graduate you will mandatorily be a part of a Digital transformation engagement.</p>
                <Card.Group itemsPerRow={3} style={{
                  marginTop: '2%'
                }}>
                  <Card style={{
                    textDecoration: 'none',
                    width: '25%',
                    marginLeft: '4%',
                    marginRight: '2%',
                    paddingTop: '4%'
                  }} color='teal' raised={true}
                  // onClick={this.loadHome.bind(this)}
                  >
                    {/* Different role - Card */}
                    <Card.Content style={{
                      textAlign: 'left'
                    }}>
                      <Card.Header style={{
                        fontSize: '98%',
                        marginRight: '13%'
                      }}>
                        <div>Digital Delivery Manager</div>
                      </Card.Header>
                    </Card.Content>
                    <Button color='blue' onClick={this.loadGameHome.bind(this)}>Unlock</Button>
                  </Card>
                  <Card onMouseEnter ={this.handleShow} onMouseLeave={this.handleHide} style={{
                    textDecoration: 'none',
                    width: '25%',
                    paddingTop: '4%',
                    paddingBottom: '4%'
                  }} color='teal' raised={true}>
                    <Card.Content style={{
                      textAlign: 'left'
                    }}>
                      <Card.Header style={{
                        fontSize: '98%',
                        marginRight: '13%'
                      }}>
                        <div>Digital Delivery Lead</div>
                      </Card.Header>
                    </Card.Content>
                    <Dimmer active={this.state.active}>
                      <Icon name='lock' size='huge'/>
                    </Dimmer>
                  </Card>
                  <Card onMouseEnter ={this.handleShow1} onMouseLeave={this.handleHide1} style={{
                    textDecoration: 'none',
                    width: '25%',
                    paddingTop: '4%',
                    paddingBottom: '4%'
                  }} color='teal' raised={true}>
                    <Card.Content style={{
                      textAlign: 'left'
                    }}>
                      <Card.Header style={{
                        fontSize: '98%',
                        marginRight: '13%'
                      }}>
                        <div>Digital Principal</div>
                      </Card.Header>
                    </Card.Content>
                    <Dimmer active={this.state.active1}>
                      <Icon name='lock' size='huge'/>
                    </Dimmer>
                  </Card>
                </Card.Group>
              </Grid.Column>
              <Grid.Column>
                {/* adapt Video */}
                <div className='checking'><iframe style={{
          width: '273px',
          marginTop: '26%',
          marginLeft: '7%'
        }} src='https://www.youtube.com/embed/dM_KbsCVqzo?rel=0&amp;showinfo=0' frameBorder='0' allowFullScreen/></div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* footer */}
          <nav className='navbar navbar-fixed-bottom' id='footer'>
            <div id='ribbon' className='row footer-brand-colour'>
              <div className='fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
              <div className='fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
              <div className='fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
            </div>
            <p id='footerTextAllignment'>All Rights Reserved. &copy; Wipro Digital
              <Link to='/credits'>
                <a id='creditPage'>Credits</a>
              </Link>
            </p>
          </nav>
        </div>
      );
    } else {
      hashHistory.push('/');
    }
    return (
      <div>
        {landing}
      </div>
    );
  }
}
module.exports = MainComponent;
