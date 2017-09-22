import React from 'react';
import DonutChart from 'react-donut-chart';
import {Segment} from 'semantic-ui-react';
export default class DomainsComplete extends React.Component {
  constructor() {
    super();
  }
  render() {
    // @Mayanka : Calculating the no. of completed Customer journeys
    let DomainsCompleted = 0;
    let Pending = this.props.Total;
    DomainsCompleted = DomainsCompleted + this.props.SavedCount;
    Pending = Pending - DomainsCompleted;
    // @Mayanka : Assigning the completed count to a donut chart
    return (
      <Segment compact>
        <h4>Customer journey</h4>
        <DonutChart height={220} width={330} colors={['#e67333', '#2ecc71']}
          data={[{
            label: 'Pending',
            value: Pending
          },
          {
            label: 'Completed',
            value: DomainsCompleted
          }]} />
        </Segment>
      );
    }
  }
