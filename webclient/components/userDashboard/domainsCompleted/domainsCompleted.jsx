import React from 'react';
import { Segment } from 'semantic-ui-react'
import DonutChart from 'react-donut-chart';
export default class DomainsCompleted extends React.Component {
  constructor(props) {
    super();
  };
  render() {
    let Completed = this.props.Count;
    let total =  this.props.Total;
    let Pending = total - Completed;
    //console.log('domainsCompleted'+Completed);
    return (
    <Segment>
        <h3>Customer Journey</h3>
        <DonutChart height={220} width={330} colors={['#e67333','#2ecc71']}
          data={[{
            label: 'Pending',
            value: Pending,
          },
          {
            label: 'completed',
            value: Completed,
          }]} />
        </Segment>
      )
    }
  }
