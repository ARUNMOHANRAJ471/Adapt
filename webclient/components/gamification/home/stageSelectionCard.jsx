import React from 'react';
const {hashHistory, Link} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { Card, Label, Menu, Segment, Popup, Icon} from 'semantic-ui-react';
import Main from './Main.jsx';
class stageSelectionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      value : 0
    };
    this.selectCorrectStage = this.selectCorrectStage.bind(this);
    this.loadGate = this.loadGate.bind(this);
  }
  selectCorrectStage() {
    let context = this;
    let data1 = context.props.stage.map((item) => {
      if (item.stage == 'stage1') {
        context.setState({stage1: item.material});
        this.props.selectedStage(item.material);
      }
    })
  }
  loadGate() {
    this.setState({value: 1});
  }
  closeActive() {
    this.setState({value: 0});
  }
  render() {
    // console.log(JSON.stringify(this.props.item));
    return (
      <div>
        <Card fluid onClick={this.selectCorrectStage} style={{
          textDecoration: 'none',
          marginLeft: '5%',
          marginRight: '10%',
          width: '80%',
          marginTop: '2%'
        }}>
          <Card.Content>
            <Popup trigger={< Label as = 'a' color = 'teal' ribbon style = {{width: '100%', marginTop: '-2%', position: 'absolute',marginLeft:'2%'}} > <p style={{
              marginLeft: '3%'
            }}>{this.props.i}
              <center style={{
                marginTop: '-4%'
              }}>{this.props.item.stage}</center>
            </p> < /Label>} position='popup' content='Work in Progress' id='popup'/>
            <Icon name='signup' style={{
              float: 'right',
              cursor: 'pointer',
              marginTop: '6%'
            }} size='large' color='orange' onClick={this.loadGate}/>
            <p style={{
              textAlign: 'left',
              marginLeft: '8%',
              marginTop: '5%'
            }}>{this.props.item.description}</p>
            <p style={{
              textAlign: 'left',
              marginLeft: '8%'
            }}>Score : 22</p>
            <p style={{
              textAlign: 'left',
              marginLeft: '8%'
            }}>Start Time : 10.00</p>
            <p style={{
              textAlign: 'left',
              marginLeft: '8%'
            }}>End Time : 12.00</p>
          </Card.Content>
        </Card>
        {this.state.value == 1
          ? <Main closeActive={this.closeActive} id={this.props.item.id}/>
          : null}
      </div>
    );
  }
}
module.exports = stageSelectionCard;
