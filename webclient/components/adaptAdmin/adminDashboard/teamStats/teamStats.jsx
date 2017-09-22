import React from 'react';
import { Line } from 'rc-progress';
export default class TeamStats extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // @Mayanka : Calculating the Team level stats of user stories
    let TeamStatus = [];
    let Temp = [];
    let finalData = {};
    let ProgressCount = 0;
    let CompletedCount = 0;
    let Teams = [];
    let FinalArray = [];
    for(let i in this.props.SavedTeamStats) {
      if(this.props.SavedTeamStats !== '') {
        TeamStatus.push(this.props.SavedTeamStats[i]);
      }
    }
    for(let i = 0; i < TeamStatus.length; i = i + 1) {
      for(let j = 0; j < TeamStatus.length; j = j + 1) {
        if(TeamStatus[i].team_name === TeamStatus[j].team_name) {
          Temp.push(TeamStatus[j].scenario_name, TeamStatus[j].status);
          Teams[i] = TeamStatus[i].team_name;
        }
      }
      finalData[TeamStatus[i].team_name] = Temp;
      Temp = [];
    }
    const uniqueTeams = Teams.filter((val, id, array) => array.indexOf(val) === id);
    let arr = [];
    let dummy = [];
    let percentage = 0;
    for(let i in finalData) {
      if(finalData !== '') {
        FinalArray.push(finalData[i]);
      }
    }
    for(let i in FinalArray) {
      if(FinalArray !== '') {
        arr = FinalArray[i];
        for(let j in arr) {
          if(arr[j] === 'Completed') {
            CompletedCount = CompletedCount + 1;
          }
          else if(arr[j] === 'In progress') {
            ProgressCount = ProgressCount + 1;
          }
          percentage = (CompletedCount / (ProgressCount+CompletedCount)) * 100;
        }
        dummy.push({'team_name': uniqueTeams[i], 'percent':parseInt(percentage)});
        CompletedCount = 0;
        ProgressCount = 0;
        percentage = 0;
      }
    }
    // @Mayanka : Team-wise mapping of  the values to progress bar
    return(
      <div style={{fontSize: '13px'}}>
        <h4>Team Stats</h4>
        {dummy.map(function(item) {
          return (
            <div style={{marginTop: '2%'}}>
              {item.team_name}: {item.percent}%
              <Line percent={item.percent} strokeWidth='1.5' strokeColor='#2ecc71' />
            </div>
          );
        })}
      </div>
    );
  }
}
