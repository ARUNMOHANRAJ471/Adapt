import React from 'react';
import Cookies from 'universal-cookie';
// import Cookie from 'react-cookie';

const cookies = new Cookies();

class userDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: 'nnn',
      teamName: 'indi',
      score: '88',
      teamMembers:[]
    }
  }
  componentWillMount() {
    let a = cookies.get('empId');
    let context = this;
    //console.log(this.state.userName);
    $.ajax({
      url: '/userDashboard/viewTeamName',
      type: 'POST',
      data: {
        empId: a
      },
      success: function(data) {
        //console.log("data" + JSON.stringify(data));
        context.setState({
          userName: data[0].userName,
          teamName: data[0].teamName
        })
        $.ajax({
          url:'userDashboard/getTeamMembers',
          type:'post',
          data:{
            teamName:data[0].teamName
          },
          success:function(data){
            context.setState({
              teamMembers:data,
              score:data
            })
          },
          error:function(err){
          //console.log("error", err);
          }
        });
        //console.log("success");
      },
      error: function(err) {
        //console.log("error", err);
      }
    });
  }
  render() {
    return (
      <div>
        {/* <span className="page-header dashboard-header">DASHBOARD</span> */}

        <div className="row">
          <div className="col-xs-8 col-md-8"></div>

          <div className="col-xs-4 col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="glyphicon glyphicon-bookmark"></span>
                  Team Members
                  <span className="pull-right">{this.state.teamName}</span>
                </h3>
              </div>
              <div className="panel-body">

                <table className="table table-inverse">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>{this.state.userName}</td>
                      <td>{this.state.score}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>jagdeesh</td>
                      <td>34</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>kumar</td>
                      <td>20</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}
module.exports = userDashboard;
