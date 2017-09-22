import React from 'react';
import DonutChart from 'react-donut-chart';
import {Segment} from 'semantic-ui-react';
export default class ScenariosCompleted extends React.Component {
  constructor() {
    super();
  }
  render() {
    // @Mayanka : Calculating the no. of completed user stories
    let ScenariosCompleted = 0;
    if(this.props.DBCompletedCount !== '') {
      ScenariosCompleted = this.props.DBCompletedCount.length;
    }
    let Pending = Math.abs(this.props.TotalScenarios - ScenariosCompleted);
    // @Mayanka : Assigning the completed count to a donut chart
    return (
      <Segment compact>
        <h4>User story</h4>
        <DonutChart height={220} width={330} colors={['#e67333', '#2ecc71']}
          data={[{
            label: 'Pending',
            value: Pending
          },
          {
            label: 'Completed',
            value: ScenariosCompleted
          }]} />
        </Segment>
      );
    }
  }
