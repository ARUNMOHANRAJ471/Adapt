import React from 'react';
import { Segment } from 'semantic-ui-react'
import DonutChart from 'react-donut-chart';
export default class ScenariosCompleted extends React.Component {
  constructor(props) {
    super();
  };
  render() {
    let ScenariosCompleted = this.props.Count;
    let totalScenariosTouched = this.props.Total;
    let Pending;
    //console.log('scenarios 0'+ScenariosCompleted);
    // if(this.props.ScenariosCompleted != ''){
    //   //console.log('scenarios completed'+this.props.ScenariosCompleted);
      // ScenariosCompleted += this.props.ScenariosCompleted;
      Pending = totalScenariosTouched - ScenariosCompleted;
    // }

    return(
      <Segment>
        <h3>User Stories</h3>
        <DonutChart height={220} width={330} colors={['#e67333','#2ecc71']}
          data={[{
            label: 'Pending',
            value: Pending,
          },
          {
            label: 'Completed',
            value: ScenariosCompleted,
          }]} />
      </Segment>
    )
    }
  }
