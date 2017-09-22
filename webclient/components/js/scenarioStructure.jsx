import React from 'react'
import {Card} from 'semantic-ui-react'
import ModalComponent from './ModalComponent.jsx';
import {Scrollbars} from 'react-custom-scrollbars';
class Component3 extends React.Component {
  constructor() {
    super();
    this.state = {
      scenarioName: '',
      scenarioDescription: ''
    }
  }

  render() {
    let context = this;
    let cards = '';
  if(context.props.result.length != 0) {
    // Display not completed cards
     cards =  context.props.result.map((item, index) => {
      return (<ModalComponent scenarioName={item.scenarioName} scenarioId={item.scenarioId} scenarioDescription={item.scenarioDescription} video={item.video} name={item.name} status={item.status} domainName={context.props.domainName} loginid={item.loginid}/>);
    });}else{
     cards = <p style={{marginTop: '5%', marginLeft: '3%'}}><b>Who-hoo!! </b>All the user stories are completed</p>;
    }
    return (
      <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
        display: 'none',
        position: 'right',
        backgroundColor: '#5a5151',
        paddingLeft: '20%'
      }}/>} autoHide autoHeight autoHeightMin={250}>
        <Card.Group itemsPerRow={3}>
          {cards}
        </Card.Group>
      </Scrollbars>

    )
  }
}
module.exports = Component3
