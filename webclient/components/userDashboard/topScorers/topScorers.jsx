import React from 'react';
import ReactTable from 'react-table';
import { Table, Segment } from 'semantic-ui-react';
import 'react-table/react-table.css';
// import Progress from 'react-progressbar';
export default class UserScenarioStatus extends React.Component{
  constructor(props) {
    super(props);

  };
  render() {
        let scoreTable = this.props.Scores.map(function(item, key) {
        if(key<3){
      return (
        <Table.Row key = {key}>
          <Table.Cell>{item.teamName} </Table.Cell>
          <Table.Cell>{item.score}</Table.Cell>
        </Table.Row>
      )
    }
    });
      return (
    <Segment id="topscoreposition" style={{marginTop:"-31%",paddingLeft:'10%'}}>
        <Table basic='very' celled collapsing >
          <Table.Header><h3>Team Score Status</h3>
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body> {scoreTable}
      </Table.Body>
    </Table>
  </Segment>
);
}
}
