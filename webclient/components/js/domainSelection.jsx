import React from 'react';
const {Link} = require('react-router');
import {Dropdown} from 'semantic-ui-react';
import {Button, Grid, Card} from 'semantic-ui-react';
import {Scrollbars} from 'react-custom-scrollbars';
import '../../../node_modules/react-html5video/dist/styles.css';
import VideoComponent from './videoComponent';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class childComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      domain: [],
      selectedConcepts: [],
      searchQuery: '',
      result: '',
      scenario: [],
      video: ''
    }
  }
// To get all customer journey
  componentWillMount() {
    let arr = [];
    $.ajax({
      url: '/users/findDomain',
      type: 'GET',
      success: function(data) {
        for (let i in data) {
          if (i !== null) {
            if (data[i].flag.low == 1) {
              arr.push({key: data[i].name, value: data[i].name, text: data[i].name});
            }
          }
        }
        this.setState({domain: arr});
        // console.log('inside mount of domain selection');
      }.bind(this),
      error: function(err) {
        // console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  // To get customer journey description and video
  updatesearchQuery(e, a) {
    let res = a.value;
    this.setState({searchQuery: res});
    this.props.search([]);
    $.ajax({
      url: '/users/findDomainDescription',
      type: 'POST',
      data: {
        userName: cookies.get('username'),
        userType: cookies.get('userType'),
        domain: res
      },
      success: function(data) {
        this.setState({video: data[0].video});
        this.setState({result: data[0].domainDescription});
      }.bind(this),
      error: function(err) {
        // console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  // To get all the user story based on customer journey
  handleSubmit() {
    var arr2 = [];
    var arr = [];
    var domainName1 = this.state.searchQuery;
      this.props.domainName2(this.state.searchQuery);
    $.ajax({
      url: '/users/findScenarios',
      type: 'POST',
      data: {
        empId: cookies.get('empId'),
        domain: this.state.searchQuery
      },
      success: function(data) {
        // console.log(JSON.stringify(',./,./'+data));
        data.map(function(item) {
          arr2.push(item);
        })
        this.setState({scenario: arr2});
        this.props.search(arr2);
      }.bind(this),
      error: function(err) {
        // console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  render() {
    let domainPage = '';
    if (this.state.domain.length != 0) {
      domainPage = (
        <div>
          <div>
            <center id='landing'>
              <div>
                <img src='./img/heading_new.jpg' id='headingadapt'/>
              </div>
              <div>
                {/* dropdown */}
                <Dropdown onChange={this.updatesearchQuery.bind(this)}
                   placeholder='Select Customer Journey'
                   style={{ fontFamily: 'Arial'
                }} search selection options={this.state.domain}/>
                <Button primary onClick={this.handleSubmit.bind(this)} style={{
                  marginLeft: '1%',
                  fontSize: '101%'
                }} content='Select'/> {this.state.result.length > 0
                  ? <div>
                      <Grid divided='vertically'>
                        <Grid.Row>
                          <Grid.Column width={4}/>
                          <Grid.Column width={7} style={{
                            marginTop: '11px',
                            marginBottom: '-3%'
                          }}>
                            <Scrollbars renderTrackHorizontal={props => <div {...props}
                               className='track-horizontal' style={{
                              display: 'none',
                              position: 'right'
                            }}/>} autoHeight autoHide>
                              <div style={{
                                height: '85px',
                                marginTop: '1%'
                              }} id='domainDescriptionHeight'>
                                {this.state.result}
                              </div>
                            </Scrollbars>
                          </Grid.Column>
                          <Grid.Column>
                            {/* video */}
                            <VideoComponent video={this.state.video}/>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>
                  : <Grid divided='vertically'>
                    <Grid.Row>
                      <Grid.Column width={4}/>
                      <Grid.Column width={7} style={{
                        marginTop: '2%',
                        textAlign: 'left',
                        lineHeight: '1.9em',
                        fontFamily: 'arial',
                        marginBottom: '-3%'
                      }}>
                        <p style={{
                          marginTop: '2%',
                          textAlign: 'justify',
                          lineHeight: '1.8em'
                        }}>
                          <b>Max Health app</b>
                          provides a portal that connects the patients and the phlebotomists
                           directly and make it easy for booking, tracking and recording of the
                            appointments. The application also provides managerial and
                             organizational facilities to the hospital. There are four types of
                              users for the app with different functionalities-
                          <b>Customer Care, Patient, Coordinator and Phlebotomist</b>.</p>
                        <p style={{
                          marginTop: '2%',
                          textAlign: 'justify',
                          lineHeight: '1.8em'
                        }}>Each of these users are inter-connected and are required to send
                         information to each other for completion of a successful transaction.
                          For example, a new user needs to call customer care for registration
                           and book an appointment. Once appointment is booked, the information
                            is sent to the coordinator. Coordinator then allocates a phlebotomist
                             to the appointment who will get the necessary data and the same will
                              be communicated to the patient.</p>
                      </Grid.Column>
                      <Grid.Column>
                        <div className='checking'>
                          <iframe style={{
                            width: '273px',
                            marginTop: '26%'
                          }} src='https://www.youtube.com/embed/NyfSE5NWMuM?rel=0&amp;showinfo=0'
                           frameBorder='0' allowFullScreen/>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                }
              </div>
            </center>
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
        </div>
      );
    } else {
      domainPage = (
      <div>
      <Card color='red' style={{
      margin: 'auto',
      marginTop: '100px'
    }
  } >
  {/* Loader */}
  <Card.Content>
    <Card.Header>Loading content...
    </Card.Header>
    <Card.Description>If not loaded in 5 seconds Please Reload to continue...</Card.Description>
  </Card.Content> < /Card> < /div >)
}
return (
  <div>{domainPage}</div>
);
}
}

module.exports = childComponent;
