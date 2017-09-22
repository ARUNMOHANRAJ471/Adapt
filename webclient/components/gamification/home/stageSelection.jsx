import React from 'react';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import {
  Grid,
  Card
} from 'semantic-ui-react';
import StageSelectionCard from './stageSelectionCard.jsx';
import Material from './Material.jsx';
class StageComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      stage: [],
      stageName: [],
      material: [],
      value: 0,
      sequence: []
    };
    this.saveTheme = this.saveTheme.bind(this);
    this.loadStage = this.loadStage.bind(this);
  }
  componentWillMount() {
    this.saveTheme();
    this.loadStage();
  }
  saveTheme() {
    // let context = this;
    let theme = window.location.hash.split('theme=')[1];
    let loginId = cookies.get('loginId');
    $.ajax({
      url: '/userGame/saveTheme',
      type: 'POST',
      data: {
        theme: theme,
        loginId: loginId
      },
      success: function(data) {
        // // // console.log('data');
      },
      error: function(err) {
        // // // console.log('error', err);
      }
    });
  }
  loadStage() {
    let context = this;
    let theme = window.location.hash.split('theme=')[1];
    $.ajax({
      url: '/userGame/loadStage',
      type: 'POST',
      data: {
        theme: theme
      },
      success: function(data) {
        // // // console.log(JSON.stringify(data));
        context.setState({sequence: data[0].sequence});
        context.setState({stage: data});
      },
      error: function(err) {
        // // // console.log('error', err);
      }
    });
  }
material(material) {
  this.setState({material:material});
}
  render() {
    let landing;
    let cards = [];
    let aaa = '';
    let i = 0;
        aaa = this.state.material.map((item) => {
        return (
          <Material item = {item}/>
        )
      });
    if (this.state.stage.length != 0) {
      // // // console.log("inside stage");
       this.state.sequence.map((item1) => {
           // // // console.log(item1.low);
        this.state.stage.map((item) => {
            // // // console.log("inside stage2",item.id);
          if(item.id == item1.low) {
            // // // console.log("kjbhdgfjshdg");
            cards.push(item);
          }
        })
      })
    }
    if (cookies.get('userType') == 'User') {
      landing = (
        <div style={{
          marginTop: '5%',
          marginLeft: '5%',
          marginRight: '5%'
        }}>
          <Grid>
            <Grid.Column width={9}>
              <Card.Group>{cards.map((item)=>{
                i = i + 1;
                return (
                <StageSelectionCard item = {item} i={i} stage={this.state.stage} selectedStage={this.material.bind(this)}/>
                )
              })}</Card.Group>
            </Grid.Column>
            <Grid.Column width={7}>
                {aaa}
            </Grid.Column>
          </Grid>
        </div>
      );
    } else {
      hashHistory.push('/');
    }
    return (
      <div>
        {landing}
      </div>
    );
  }
}
module.exports = StageComponent;
