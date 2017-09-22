import React from 'react';
import {Grid} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import DomainCompleted from '../domainsCompleted/domainsCompleted';
import ScenarioCompleted from '../scenariosCompleted/scenariosCompleted';
import TopScorers from '../topscorers/topscorers';
import UserScenarioStatus from '../userScenarioStatus/userScenarioStatus';
import TeamStats from '../teamStats/teamStats';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const cookies = new Cookies();
import {Component} from 'react';
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import {Dropdown} from 'semantic-ui-react';
export default class userDashboard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      LiveUserStats: [],
      count:0,
      Total:0,
      SavedUserStats:[],
      DomainTotal:0,
      DomainCompleted:0,
      Scores:[],
      TeamStats:[],
      completedScenariosForDomain: 0,
      domainNames:[],
      domainStatsLogic:[]
    };
  };
  componentWillMount(){
    ////console.log('inside userDashboard');
    let dataContent = [];
    let context = this;
      $.ajax({
        url:'/userDashboard/userDashboardScenarioStatus',
        type:'POST',
        data:{teamName:cookies.get('teamName'),
        userName: cookies.get('username'),
        userType: cookies.get('userType')},
        success: function(data)
        {
          //console.log('scenario status :'+data);
            //console.log('scenario status :'+JSON.stringify(data));
          for(let i = 0; i < data.length ; i++){
                dataContent.push({scenario_name:data[i].scenarioName,domain_name:data[i].domainName,
                  status:data[i].status,assigned_to:data[i].userId});
                }
                //console.log("dataContent", dataContent);
          this.setState({
            SavedUserStats: dataContent
          });
        }.bind(this),
        error: function(err)
        {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
      // scenario total for a team
      $.ajax({
        url:'/userDashboard/userDashboardTotalScenario',
        type:'POST',
        data:{teamName:cookies.get('teamName')},
        success: function(data)
        {
          // ////console.log('data from total scenario',data);
          // ////console.log(data.records[0]._fields[0].low);
          this.setState({
            Total: data.records[0]._fields[0].low
          });
        }.bind(this),
        error: function(err)
        {
          ////console.log('error occurred on AJAX');
        }.bind(this)
      });

      // scenario completed by a team
      $.ajax({
        url:'/userDashboard/userDashboardCompletedScenario',
        type:'POST',
        data:{teamName:cookies.get('teamName')},
        success: function(data)
        {
          ////console.log('data from completed scenario'+data);
          ////console.log(data.records[0]._fields[0].low);
          this.setState({
            count: data.records[0]._fields[0].low
          });
        }.bind(this),
        error: function(err)
        {
          ////console.log('error occurred on AJAX');
        }.bind(this)
      });

      // scores of the team
      $.ajax({
        url:'/userDashboard/teamScores',
        type:'GET',
        success: function(data)
        {
          $.ajax({
            url:'/userDashboard/getTeamScores',
            type:'POST',
            traditional:true,
            data:{teamName:cookies.get('teamName'),teamNames:data},
            success: function(data1)
            {
              ////console.log('team scores with score',data1);
              this.setState({
                Scores: data1
              });

            }.bind(this),
            error: function(err)
            {
              ////console.log('error occurred on AJAX');
            }.bind(this)
          });
        }.bind(this),
        error: function(err)
        {
          ////console.log('error occurred on AJAX');
        }.bind(this)
      });
      // progress over domain of the team
      $.ajax({
        url:'/userDashboard/totalDomain',
        type:'POST',
        data:{teamName:cookies.get('teamName')},
        success: function(data)
        {
          //console.log('total domain data: ',JSON.stringify(data));
          // ////console.log(data.records[0]._fields[0].low);
          let aa = JSON.stringify(data);
          //console.log("^^^^^^^^^^^",aa,"************",data.length);
          this.setState({
            DomainTotal: data.length,
            domainNames:aa
          });
          //console.log('data domain array: ',this.state.domainNames);
          // progress over domain of the team
          $.ajax({
            url:'/userDashboard/teamProgress',
            type:'POST',
            traditional:true,
            data:{teamName:cookies.get('teamName'),domainNames:data},
            success: function(data)
            {
              //console.log('Team progress data: ',JSON.stringify(data));
              // ////console.log(data.records[0]._fields[0].low);
              context.setState({
                domainStatsLogic: data
              }, function() {
                let a = 0;
                if(data.length == 1){
                  ////console.log('data value: ', data);
                  if(data[0].completedScenarios == data[0].actualScenarios){
                    a = a + 1;
                    ////console.log('the value of a is:',a);
                    context.setState({DomainCompleted:a});
                  }
                }
                if(data.length>1) {
                  for (var i = 0; i < data.length; i++) {
                    if(data[i].completedScenarios == data[i].actualScenarios){
                      a = a + 1;
                    }
                  }
                  context.setState({DomainCompleted:a});
                }
              });
            }.bind(this),
            error: function(err)
            {
              ////console.log('error occurred on AJAX');
            }.bind(this)
          });
        }.bind(this),
        error: function(err)
        {
          ////console.log('error occurred on AJAX');
        }.bind(this)
      });
    }
    componentDidMount(){
      //let socket = io();
      let data     = [];
      let context = this;
      let ScoreData = [];
      let Tstats = [];
      /*socket.on('userStats', function(result){
        context.setState({LiveUserStats:[]});
        data.push({scenario_name:result.scenarioName,domain_name:result.domainName,
          status:result.status,assigned_to:result.userId,team_name:result.teamName,score:result.score});
          ScoreData.push({userID:result.userId,score:result.score});
          Tstats.push({scenario_name:result.scenarioName,team_name:result.teamName});
          ////console.log('scoredata'+ScoreData);
          context.setState({LiveUserStats: data});
          // context.setState({Scores:ScoreData});
          // context.setState({TeamStats:Tstats});
        });
        socket.on('domainStats', function(result){
          // context.setState({DomainCompleted:result.length});
          ////console.log('got data from socket'+JSON.stringify(result));
        });*/
      }
      render() {
        let userDashBoardPage;
        if(cookies.get('userType') == "User" || cookies.get('userType') == "Pair") {
          userDashBoardPage =(<div style = {{height:"100%",marginTop:"10%",backgroundColor:'white'}} >
            <Grid>
   <Grid.Row columns={3}>
     <Grid.Column width={1}></Grid.Column>
     <Grid.Column width={5}>
      <DomainCompleted Total={this.state.DomainTotal} Count={this.state.DomainCompleted}/>
     </Grid.Column>
     <Grid.Column width={5}>
       <ScenarioCompleted ScenariosCompleted={this.state.LiveUserStats.length} Count={this.state.count} Total={this.state.Total}/>
     </Grid.Column>
     <Grid.Column width={4}>
         <TopScorers Scores={this.state.Scores}/>
     </Grid.Column>
     <Grid.Column width={1}></Grid.Column>
   </Grid.Row>
   <Grid.Row columns={2}>
     <Grid.Column width={1}></Grid.Column>
     <Grid.Column width={8}>
       <UserScenarioStatus LiveUserStats={this.state.LiveUserStats} SavedUserStats={this.state.SavedUserStats}/>
     </Grid.Column>
     <Grid.Column width={6}>
     <TeamStats domainStatsLogic = {this.state.domainStatsLogic}/>
     </Grid.Column>
     <Grid.Column width={1}></Grid.Column>
   </Grid.Row>
 </Grid>
 <nav className="navbar" id="footer" style={{marginBottom:'0px'}}>
  <div id = "ribbon" className="row footer-brand-colour">
        <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
        <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
        <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
    </div>
       <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
     <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
   </nav>
          </div>)
        }
        else{
          hashHistory.push('/');
        }
        return (
          <div>
            {userDashBoardPage}
          </div>
        )
      }
    }
