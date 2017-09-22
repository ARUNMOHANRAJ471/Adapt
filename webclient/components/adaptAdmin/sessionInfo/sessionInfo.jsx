import React from 'react';
import ReactTable from 'react-table';
import { Table, Segment, Grid, Button, Dropdown, Form} from 'semantic-ui-react';
import 'react-table/react-table.css';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const cookies = new Cookies();
export default class UserScenarioStatus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Scores: [],
      WhodidWhat: [],
      Sessions: [],
      SessionFlag: 0,
      SessionSelected: ''
    };
    this.pdfToHTML=this.pdfToHTML.bind(this);
    this.sessionWiseData=this.sessionWiseData.bind(this);
  }
  //  @Mayanka : Getting the session names for dropdown
  componentWillMount(){
    let SessioNames = [];
    let context = this;
    context.setState({
      Scores: []
    });
    context.setState({
      WhodidWhat: []
    });
    $.ajax({
      url: '/admin/sessionNames',
      type: 'GET',
      success: function(data)
      {
        for(let i in data) {
          SessioNames.push({key: data[i], value: data[i], text: data[i]});
        }
        context.setState({
          Session: SessioNames
        });
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  //  @Mayanka : Getting Team names of the session selected and their scores
  sessionWiseData(){
    let KnowHow = [];
    let context = this;
    let Scores = [];
    $.ajax({
      url: '/admin/sessionWiseTeams',
      type: 'POST',
      data: {session:this.state.SessionSelected},
      success: function(data)
      {
        $.ajax({
          url:'/admin/sessionWiseTeamScores',
          type:'POST',
          traditional:true,
          data:{teams:JSON.stringify(data)},
          success: function(data1)
          {
            for(let i in data1){
              Scores.push({'team': data1[i].team, 'score': data1[i].score.low })
            }
            this.setState({
              Scores: Scores
            });

          }.bind(this),
          error: function(err)
          {
          }.bind(this)
        });
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
    //  @Mayanka : Getting the overall session information of a user
    $.ajax({
      url: '/admin/UserPickedScenarios',
      type: 'POST',
      data: {session: this.state.SessionSelected},
      traditional:true,
      success: function(data)
      {
        for(let i in data){
          KnowHow.push({EmployeeID: data[i]._fields[2], 'name': data[i]._fields[0], 'userstory': data[i]._fields[1], team: data[i]._fields[3],});
        }
        context.setState({
          WhodidWhat: KnowHow
        });
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });

  }
  //  @Mayanka : Converting the react UI to a pdf
  pdfToHTML(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = $('#HTMLtoPDF')[0];
    var specialElementHandlers = {
      '#bypassme': function(element, renderer) {
        return true
      }
    };

    var margins = {
      top: 40,
      left: 60,
      width: 545
    };

    pdf.fromHTML (
      source // HTML string or DOM elem ref.
      , margins.left // x coord
      , margins.top // y coord
      , {
        'width': margins.width // max width of content on PDF
        , 'elementHandlers': specialElementHandlers
      },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        // this allow the insertion of new lines after html
        pdf.save('sessionInfo.pdf');
      }
    )
  }
  //  @Mayanka : Getting the session name selected by the user
  updatesearchQuerySession(e, a)
  {
    this.setState({SessionFlag: 0});
    let res = a.value;
    this.setState({SessionFlag: 1});
    this.setState({SessionSelected: res}, function() {
      this.sessionWiseData();
    });
  }
  render() {
    let Table1 = '';
    let Table2 = '';
    let DownloadButton = '';
    let SessionHeader = '';
    //  @Mayanka : Scores of the team
    let scoreTable = this.state.Scores.map(function(item, key) {
      if(key<3){
        return (
          <Table.Row key = {key}>
            <Table.Cell>{item.team} </Table.Cell>
            <Table.Cell>{item.score}</Table.Cell>
          </Table.Row>
        )
      }
    });
    //  @Mayanka : Session Information of a user
    let WhodidWhat = '';
    if(this.state.WhodidWhat !== ''){
      WhodidWhat = this.state.WhodidWhat.map(function(item, key) {
        return (
          <Table.Row key = {key}>
            <Table.Cell>{item.EmployeeID} </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.userstory} </Table.Cell>
            <Table.Cell>{item.team}</Table.Cell>
          </Table.Row>
        )
      });
    }
    if(this.state.SessionFlag === 1){
      Table1 = (<Table celled padded >
        <Table.Header>
          {/* <h3>Team Score Status</h3> */}
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body> {scoreTable}
        </Table.Body>
      </Table>);
      Table2 = (<Table celled padded>
        <Table.Header>
          {/* <h3 style={{textAlign: 'center'}}>User Status</h3> */}
          <Table.Row>
            <Table.HeaderCell>EmployeeID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Worked on</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body> {WhodidWhat}
        </Table.Body>
      </Table>);
      DownloadButton = (<Button style={{marginLeft: '20%'}} onClick={this.pdfToHTML}>Download Info</Button>);
      SessionHeader = (<h3>Session Information : {this.state.SessionSelected}</h3>);
    }
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="2"/>
            <Grid.Column width="8">
              <Form style={{marginTop: '5%', marginLeft: '30%', width: '40%'}}>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Select Session</p>
                  </label>
                  <Dropdown fluid onChange={this.updatesearchQuerySession.bind(this)} placeholder='Select Session to display Info' fluid search selection options={this.state.Session} required/>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div id='HTMLtoPDF' style={{marginLeft: '22%'}}>
          <Grid style={{marginTop: '10%', marginLeft: '2%'}}>
            {SessionHeader}
            <Grid.Column width='5'/>
            <Grid.Row>
              <Grid.Column width="6">
                {Table1}
              </Grid.Column>
            </Grid.Row>
            <Grid.Column width='5'/>
            <Grid.Row>
              <Grid.Column width="10">
                {Table2}
              </Grid.Column>
            </Grid.Row>
            <Grid.Column width='2'/>
            <Grid.Column width='2'/>
            <Grid.Row>
              {DownloadButton}
            </Grid.Row>
            <Grid.Column width='2'/>
            <Grid.Column width='2'/>
          </Grid>
        </div>
      </div>
    );
  }
}
