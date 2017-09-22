import React from 'react';
import { Line, Circle } from 'rc-progress';
export default class TeamStats extends React.Component{
  constructor(props) {
    super(props);
  };
  render() {
    //console.log("++++++++++++++++inside teamstats",this.props.domainStatsLogic);
    let domainTotal = [];
    for (var i = 0; i < this.props.domainTotal; i++) {
        domainTotal.push(this.props.domainTotal);
    }
    let Stats = [];
    if(this.props.Stats != ''){
      for(let i in this.props.Stats){
        Stats.push(this.props.Stats[i]);
      }
    }
    let domainProgress = this.props.domainStatsLogic.map(function(item,key) {
      let a = (item.completedScenarios/item.actualScenarios)*100;
      return(<div><h4>{item.domainName} : {parseInt(a)}%</h4>
      <Line percent={a} strokeWidth="1.5" strokeColor="#2ecc71" />
      </div>);
    })
    //console.log("Domain Progress is: ",domainProgress);
    if(domainProgress.length == 0){
      domainProgress = (<div><p style={{textAlign:"center",marginTop:"2%"}}>No Customer Journey Data available</p></div>);
    }
    return(
      <div>
        <h3>Customer Journey Stats</h3>
        {domainProgress}
      </div>
    );
  }
}
