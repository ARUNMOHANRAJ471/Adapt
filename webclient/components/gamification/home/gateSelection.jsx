import React from 'react';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import {Card, Dimmer, Icon, Form, Radio} from 'semantic-ui-react';
class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true
    };
    this.closeDimmer = this.closeDimmer.bind(this);
  }
closeDimmer = () => {
      this.setState({active: false});
      this.props.closeActive();
}
  handleChange = (e, { value }) => this.setState({ value })
  render() {
    let gate;
    if (cookies.get('userType') == 'User') {
      gate = (
        <Dimmer active={this.state.active} page>
        <Card fluid style={{
          color: 'black',
          margin: '0 auto',
          width: '80%'
        }}>
          <h3>Gate</h3>
          <Icon name='cancel' onClick={this.closeDimmer} id='closeIconPosition'/>
          <Form>
          <Form.Field>
            Selected value: <b>{this.state.value}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label='Choose this'
              name='radioGroup'
              value='this'
              checked={this.state.value === 'this'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Or that'
              name='radioGroup'
              value='that'
              checked={this.state.value === 'that'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
        </Card>
      </Dimmer>
      );
    } else {
      hashHistory.push('/');
    }
    return (
      <div>
        {gate}
      </div>
    );
  }
}
module.exports = MainComponent;
