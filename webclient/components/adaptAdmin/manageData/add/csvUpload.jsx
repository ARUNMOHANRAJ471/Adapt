import React from 'react';
const {hashHistory} = require('react-router');
import {Card, Button} from 'semantic-ui-react';
class CsvUploadSuccess extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    hashHistory.push('/adminHome');
  }
  render() {
    return (
      <Card>
      <Card.Content description ="Added successfully"/>
      <Card.Content extra>
        <Button onClick={this.handleSubmit}>Home</Button>
     </Card.Content>
     </Card>
        );
    }
}
module.exports = CsvUploadSuccess;
