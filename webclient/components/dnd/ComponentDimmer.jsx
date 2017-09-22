import React, {Component} from 'react';
import {
  Button,
  Dimmer,
  Header,
  Image,
  Segment,
  Card,
  Grid,
  Loader
} from 'semantic-ui-react';
import ComponentCard from './ComponentCard';
import ColoredScrollbars from './ColoredScrollbars';
import {Scrollbars} from 'react-custom-scrollbars';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class DimmerExampleDimmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      cards:'',
      selected:[],
      componentState: props.selected,
      activeLoader:false
    };
  }

  componentWillMount(){
    var com = [];
    if (this.props.components.length != 0) {
      this.props.components.map((item)=>{
        item.components.map((item)=>{
          com.push(item);
        })
      });
      if(com.length != 0){let x = com.map((item)=>{
        return (
          <ComponentCard selectComponent={this.selectComponent.bind(this)} card={item}/>
      )
      })
      this.setState({cards: x},function(){
      });
      }
    }
  }

  getComponentState(){
    var a = cookies.get('empId');
    var selected;
    let context = this;
    $.ajax({
      url: '/profile/view',
      type: 'POST',
      async: false,
      data: {
        empId: a
      },
      success: function(data) {
        var currentScenarioName = data[0].currentScenarioName;
        var si = data[0].statusInformation;
        si.map((item,index)=>{
          if(item.scenarioId == data[0].currentScenario){
            context.setState({})
            selected = item.componentState;
          }
        })
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }

  selectComponent(c,checked){
    var componentState = this.state.componentState;
    if(checked){
      componentState.push(c.id);
      this.setState({componentState:componentState},function(){
      })
    }
    else if(!checked){

      componentState.splice(componentState.indexOf(c.id),1);
      this.setState({componentState:componentState},function(){
      })
    }
    var com = this.props.components;
    var sel = [];
    com.map((item,index)=>{
      if(c.category == item.category){
        com[index].components[item.components.indexOf(c)].checked = checked;
      }
    })
    this.setState({selected:com},function(){
      this.state.selected.map((item)=>{
        item.components.map((item)=>{
          sel.push(item);
        })
      })
      if(sel.length != 0){let x = sel.map((item)=>{
        return (
          <ComponentCard selectComponent={this.selectComponent.bind(this)} card={item}/>
      )
      })
      this.setState({cards: x},function(){
      });
    }
    })
  }

  addComponents(){
    this.setState({activeLoader: true});
    let data = {
      userId: cookies.get('empId'),
      scenarioId: this.props.scenarioId,
      componentState: this.state.componentState
    };
    let context = this;
    $.ajax({
      url: '/dnd/updateComponentStatus',
      type: 'PUT',
      traditional:true,
      data: {
        userId: cookies.get('empId'),
        scenarioId: this.props.scenarioId,
        componentState: this.state.componentState,
        userName: cookies.get('username'),
        userType: cookies.get('userType')
      },
      success: function() {
        //console.log("Status posted successfully");
        location.reload();
      },
      error: function(err) {
        //console.log("Error occured", err);
        location.reload();
      }
    });
  }

  handleHide = () => {this.setState({active: false});
  this.props.closeComponentDimmer();
}

selectAll(){
  let x = this.props.components.map((item)=>{
    item.components.map((item)=>{
      this.selectComponent(item,true);
    })
  })
}

deselectAll(){
  let x = this.props.components.map((item)=>{
    item.components.map((item)=>{
      this.selectComponent(item,false);
    })
  })
}

  render() {
    var componentCard = '';
    const {active} = this.state
    const {activeLoader} = this.state
    return (
      <div>
        <Dimmer active = {activeLoader} page>
          <Loader>Loading your components</Loader>
        </Dimmer>
        <Dimmer active={active} onClickOutside={this.handleHide.bind(this)}>
              <Grid>
                <Grid.Column width={16} style={{marginRight:'4%'}}>
                  <h3 style={{marginTop:'5%',marginRight:'-3%'}}>Component Library</h3>
                <ColoredScrollbars>
                <Card.Group itemsPerRow={3} style={{marginLeft:'3%'}}>
                {this.state.cards}
              </Card.Group>
            </ColoredScrollbars>
            <Button inverted color='blue' style={{margin:'1%',float:'left',marginLeft:'5%'}} onClick={this.selectAll.bind(this)}>Select all</Button>
            <Button inverted color='orange' style={{margin:'1%',float:'left'}} onClick={this.deselectAll.bind(this)}>Deselect all</Button>
              <h4 style={{width:'570px',marginLeft:'30%',paddingTop:'0.5%'}}>Number of selected components{' : '+this.state.componentState.length}</h4>
          <Button inverted color='blue' style={{margin:'-2.5% 1%',float:'right'}} onClick={this.addComponents.bind(this)}>Confirm</Button>
          <Button inverted color='orange' style={{margin:'-2.5% 8%',float:'right'}} onClick={this.handleHide.bind(this)}>Cancel</Button>
        </Grid.Column>
        </Grid>
        </Dimmer>
      </div>
    )
  }
}
