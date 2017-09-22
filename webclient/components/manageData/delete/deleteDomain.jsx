import React from 'react';
import {Form, Grid, Button, Icon, Divider, TextArea, Dropdown} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
export default class DeletetDomain extends React.Component {
  constructor(props) {
    super();
  };
  render() {//console.log('in add Scenario');
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}/>
          <Grid.Column width={14}>
            <h4>Delete Customer journey</h4>
            <Form>
              <Form.Field>
                <label>
                  <h4>Select Customer journey</h4>
                </label>
                <Dropdown fluid placeholder='Select Domain'  selection options={defaultOption}/>
              </Form.Field>
            </Form>
            <Divider/>
            <Grid.Column width={8}><Button color='green' fluid onClick={this.createNewConcept}>Delete</Button></Grid.Column>
            <Divider/>
          </Grid.Column>
          <Grid.Column width={1}/>
        </Grid.Row>
      </Grid>
    </div>
  );
}
}
