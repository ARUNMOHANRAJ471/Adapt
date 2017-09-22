import React from 'react'
import {Grid, Card, Dimmer} from 'semantic-ui-react'
import ViewAll from './viewAllScenario.jsx';
import ColoredScrollbars from '../dnd/ColoredScrollbars';
class Component3 extends React.Component {
  constructor() {
    super();
    this.state = {
      scenarioName: '',
      scenarioDescription: '',
      active: true,
      value: 0
    }
  }
  handleOpen = () => this.setState({active: true})
  handleClose = () => {
    this.setState({active: false});
    this.props.closeViewAllScenariodata();
  }
  abc() {
    this.setState({value: 1})
  }

  render() {
    const {active} = this.state
    let context = this;
    let cards = context.props.resultall.map((item, index) => {
      return (<ViewAll domainName={context.props.domainName} scenarioName={item.scenarioName} scenarioId={item.scenarioId} scenarioDescription={item.scenarioDescription} video={item.video} status={item.status} name={item.name} loginid={item.loginid}/>);
    });
    return (
      <Dimmer active={active} onClickOutside={this.handleClose} page>
        <Grid>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            <ColoredScrollbars>
              <Card.Group itemsPerRow={4} style={{
                marginLeft: '3%'
              }}>
                {cards}
              </Card.Group>
            </ColoredScrollbars>
          </Grid.Column>
          <Grid.Column width={3}/>
        </Grid>
      </Dimmer>
    )
  }
}
module.exports = Component3
