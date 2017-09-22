import React from 'react';
import { Table } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import 'react-table/react-table.css';
export default class TopScorers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // @Mayanka : Calculating the Top Scorers across all the teams
    let TopScorers = [];
    for(let i in this.props.SavedScores) {
      if(this.props.SavedScores !== '') {
        TopScorers.push(this.props.SavedScores[i]);
      }
    }
    let temp = {};
    for(let i = 0; i < TopScorers.length; i = i + 1) {
      for(let j = 0; j < TopScorers.length; j = j + 1) {
        if(TopScorers[i].score > TopScorers[j].score) {
          temp = TopScorers[i];
          TopScorers[i] = TopScorers[j];
          TopScorers[j] = temp;
        }
      }
    }
    TopScorers = TopScorers.slice(0, 3);
    // @Mayanka : Displaying the Top Scorers in a table
    return (
      <Segment>
        <Table basic='very' celled collapsing style={{paddingLeft: '10%'}}>
          <Table.Header><h4>Top Scorers</h4>
          <Table.Row>
            <Table.HeaderCell>Topper</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body> {TopScorers.map(function(item, key) {
          if(item.score !== 0) {
            return (
              <Table.Row key = {key}>
                <Table.Cell>{item.userID} </Table.Cell>
                <Table.Cell>{item.score}</Table.Cell>
              </Table.Row>
            )}
          })}
        </Table.Body>
      </Table>
    </Segment>
  );
}
}
