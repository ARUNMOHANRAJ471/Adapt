import React, {Component} from 'react';
const ReactDOM = require('react-dom');
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
const {Link} = require('react-router');
import { Dropdown} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import Dustbin from './Dustbin';
import Box from './Box';
import Sequence from '../adaptAdmin/manageData/viewData/SequenceAccordion';
import ComponentDimmer from './ComponentDimmer';
import {
  Grid,
  Accordion,
  Button,
  List,
  Divider,
  Progress,
  Dimmer,
  Card,
  Label,
  Segment,
  Icon,
  Modal,
  Header
} from 'semantic-ui-react';
import {Scrollbars} from 'react-custom-scrollbars';
import Compile from './compile';
var ind = 0;
var code = '';
var test = '';
var infra = '';
var devops = '';
// var dimmer = '';
const {hashHistory} = require('react-router');
// var components=[];
var backupId = '';
let accordionTitle = {
  height: '30px',
  textAlign: 'center',
  fontFamily: 'arial',
  border: '1px',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '2.0rem',
  fontSize: '15px',
  marginBottom: '10px'
};
export default class Container extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      components: [],
      status: '',
      correctSeq: [],
      progress: 0,
      scenarioId: '',
      domainName: '',
      problemstatement: '',
      currentScenarioName: '',
      preConditions: '',
      active: true,
      score: 0,
      negativescore: 0,
      actualScore: 0,
      preconditionNames: [],
      esModal:false,
      clearModal:false,
      dimmer: '',
      componentDimmer:'',
      selected: [],
      selectedComponents: [],
      cheatCode:'',
      sequenceAcc: [[]],
      activeForCheatCode:false,
      clearStatus: false,
      theCheatCode: '',
      newDependencies:[],
      teamName:'',
      demoVideo:false
    };
    this.updateStatus = this.updateStatus.bind(this);
    this.componentDimmer = this.componentDimmer.bind(this);
    this.codeDimmer = this.codeDimmer.bind(this);
    this.testDimmer = this.testDimmer.bind(this);
    this.infraDimmer = this.infraDimmer.bind(this);
    this.devopsDimmer = this.devopsDimmer.bind(this);
    this.handlePressedKey = this.handlePressedKey.bind(this);
    this.sequenceMapping = this.sequenceMapping.bind(this);
  }

  componentWillMount() {
    var today = new Date();
    var month = today.getMonth() + 1;
    if(month<10) {
      month = "0"+month;
    }
    var date = today.getDate();
    if(date<10) {
      date = "0"+date;
    }
    var year = today.getFullYear() - 2000;
    var theCode = ""+month+date+year;
    this.setState({theCheatCode:theCode})

  var b = cookies.get('loginStatus');
    if(b == 'true'){
      this.setState({dimmer:<Dimmer style={{textAlign:'left'}} active={this.state.active} onClickOutside={this.handleClose} page>
        <div style={{margin:'10%'}}>
          <h3>Instructions</h3>

        <h4><li>Required suitable components can either be selected from the components library or by clicking on the individual headers.</li></h4>
        <h4><li>To select the components, click on the specific card from the pop-up screen.</li></h4>
        <h4><li>Once selected & confirmed, the cards will be available in the corresponding headers.</li></h4>
        <h4><li>These cards can now be dragged and dropped in the middle pane.</li></h4>
        <h4><li>Click the compile button once you create your workflow. Check in your code to the repository upon successful compilation.</li></h4>
        <h4><li>For any wrong compilation, you can re-order your sequence, add new components, delete existing components and compile again.</li></h4>

        <h3>Nota Bene:</h3>

        <h4><li> Components & their positions can be changed at any point.</li></h4>
        <h4><li> Compilation of the wrong sequence/components will result in negative score.</li></h4>
        <h4><li> The right side pane displays all the details about the user story.</li></h4>
        <h4/>
        <Button color='blue' style={{float:'right'}} inverted onClick={this.openDemoVideo.bind(this)}>Demo Video</Button>
        </div>
      </Dimmer>})
    }
    this.getScenarioId();
  }

  handlePressedKey(e) {
    let code = this.state.theCheatCode;
    //console.log(code,"    ddddd");
    let val = this.state.cheatCode + e.key;
      this.setState({cheatCode: val})
      //console.log(this.state.cheatCode);
    if(val == code) {
      this.setState({activeForCheatCode:true});
      this.setState({cheatCode: ''});
    }
    if(e.key == 'x'){
      this.setState({cheatCode:''});
    }
  }
  componentDidMount(){
    cookies.set('loginStatus', false);
    window.addEventListener("keypress", this.handlePressedKey);
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
  const node = ReactDOM.findDOMNode(this.messagesEnd);
  node.scrollIntoView({ behavior: "smooth" });
}
  sequenceMapping() {
    let seqs = this.state.correctSeq;
    let cats = this.state.components;
    let output = [];
    seqs.map(function(seq, seqKey) {
      let compNameArray = [];
      let numbers = seq.split('-');
      numbers.map(function(number) {
        cats.map(function(cat, catKey) {
          cat.components.map(function(component, componentKey) {
            if(component.id == number) {
              compNameArray.push({header:component.name});
            }
          });
        });
      });
      output.push(compNameArray);
    });
   //  //console.log('seq: ', seq);
   //  //console.log('comp: ', comp);
   //console.log('$$$$$$$$$$ ', output);
   this.setState({sequenceAcc:output});
  }

  handleClose = () => {
    this.setState({active: false,dimmer:'', activeForCheatCode:false,demoVideo:false});
  }
  getScenarioId() {
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
        context.setState({teamName:data[0].teamName})
        var currentScenarioName = data[0].currentScenarioName;
        var si = data[0].statusInformation;
        si.map((item,index)=>{
          if(item.scenarioId == data[0].currentScenario){
            selected = item.componentState;
            context.getComponents(data[0].currentDomain, data[0].currentScenario,selected);
          //   context.setState({selected:item.componentState},function(){
          //   context.getComponents(data[0].currentDomain, data[0].currentScenario);
          // });
          }
        })
        context.setState({currentScenarioName: currentScenarioName.toString()});
      },
      error: function(err) {
        //console.log("error", err);
      }
    })
  }

  getComponents(domainName, scenarioId,selected) {
    let context = this;
    var com = [];
    var components = [];
    var category = [];
    this.setState({
      domainName: domainName,
      scenarioId: scenarioId
    }, function() {
      //console.log("_______scenario ID________", this.state.scenarioId);
      this.getScenarioDetails();
      this.getStatusInfo();
      this.getNewDependencies();
    })
    $.ajax({
      url: '/Components/category',
      type: 'GET',
      async: false,
      success: function(data) {
        let count = data.records.length;
        for (var i in data.records) {
          com[i] = {
            category: data.records[i]._fields[0]
          };
          var category = data.records[i]._fields[0];
          $.ajax({
            url: "/Components/getComponents/",
            type: 'POST',
            data: {
              category: data.records[i]._fields[0],
              domain: domainName,
              loginType: 'user'
            },
            async: false,
            success: function(data) {
              var c = [];
              data.map(function(item) {
                c.push({
                  id: '' + item.componentId,
                  name: '' + item.componentName,
                  description: '' + item.componentDescription,
                  category: '' + item.category,
                  errorMsg: '' + item.errorMsg,
                  checked: false
                });
              })
              components.push({category: category, components: c});
              context.setState({components:components});
            }.bind(this),
            error: function(err) {
              //console.log('error occurred on AJAX' + err);
            }.bind(this)
          });
        }
        context.getLeftPane(components,selected);
      }.bind(this),
      error: function(err) {
        //console.log("inside ajax error " + JSON.stringify(err));
      }
    });
  }

  getStatusInfo() {
    var a = cookies.get('empId');
    if (this.state.scenarioId == '') {
      hashHistory.push('/home');
    } else {
      let context = this;
      $.ajax({
        url: '/dnd/getStatusInfo',
        type: 'POST',
        data: {
          userId: a,
          scenarioId: this.state.scenarioId
        },
        success: function(res) {
          context.updateStatus(res.state);
          context.setState({actualScore: res.score});
          context.getComponentById();
        },
        error: function(err) {
          //console.log(err);
        }
      });
    }
  }

  getLeftPane(components,selected){
    let context = this;
    let recover = [
      {category:'code',components:[]},
      {category:'test',components:[]},
      {category:'infra',components:[]},
      {category:'devops',components:[]}
    ];
    if (selected) {
      let count = 0;
      components.map((item, index) => {
        item.components.map((item, index1) => {
          if (selected.includes(item.id)) {
            var i;
            if(item.category == 'code'){
              i = 0;
            }
            else if(item.category == 'test'){
              i = 1;
            }
            else if(item.category == 'infra'){
              i = 2;
            }
            else if(item.category == 'devops'){
              i = 3;
            }
            recover[i].components.push({
              id: item.id,
              name: item.name,
              description: item.description,
              category: item.category,
              errorMsg: item.errorMsg,
              checked:true
            })
            components[index].components[index1].checked = true;
          }
        })
        count++;
      })
      if(count == components.length){
        this.setState({selectedComponents: recover,components:components,selected:selected});
      }
    }
  }

  getComponentById() {
    let context = this;
    let recover = [];
    if (this.state.status.length != 0) {
      var state = this.state.status.split('-');
      this.state.components.map((item, index) => {
          item.components.map((item, index) => {
            if (state.includes(item.id)) {
              //console.log("matched :", item.id);
              var indexes = [];
              var i = -1;
              while ((i = state.indexOf(item.id, i + 1)) != -1) {
                indexes.push(i);
              }
              indexes.map((item1,index)=>{
                //console.log("item1",item1);
                recover[item1] = {
                id: item.id,
                name: item.name,
                description: item.description,
                cardColor: '',
                category: item.category,
                errorMsg: item.errorMsg,
                checked: true
                };
              })
            }
          })
      })
      context.setState({
        allCards: recover
      }, function() {
        //console.log('allCards', this.state.allCards);
      });
    }
  }

  getScenarioDetails() {
    let context;
    context = this;
    // //console.log("in get scenario details");
    $.ajax({
      url: '/dnd/getScenarioDetails/' + context.state.scenarioId,
      type: 'GET',
      success: function(res) {

        context.setState({
          correctSeq: res.sequence,
          problemstatement: res.problemstatement,
          score: res.score.low,
          negativescore: res.negativescore.low,
          preConditions: res.precondition
        },
        function() {
          // //console.log("precondition datas in getPreconditionNames",preConditions);
          context.getPreconditionNames();
          context.sequenceMapping();
        });
        context.progressCheck(context.state.correctSeq);
      },
      error: function(err) {
        //console.log(err);
      }
    });
  }

  getPreconditionNames() {
    let preconditionData = this.state.preConditions;
    let context = this;
    let result1 = [];
    //console.log("precondition datas in getPreconditionNames",context.state.preConditions);
    let datax = {
      preconditionData: context.state.preConditions
    };
    $.ajax({
      url: '/dnd/getPreconditionNames',
      type: 'POST',
      traditional:true,
      data: datax,
      success: function(res) {
        //console.log("container precondition names  ", res);
        res.map(function(item){
          result1.push(item.properties.name);
        })
        //console.log("array of precondition names ",result1);
        context.setState({
          preconditionNames: result1
        }, function() {
        });
      }.bind(this),
      error: function(err) {}.bind(this)
    });
  }

  addCard(id, name, description, cardColor, category, errorMsg) {
    if (backupId != '') {
      if (this.state.allCards.length != 0) {
        var cards = this.state.allCards;
        var i = cards.findIndex(this.check.bind(this));
        cards[i].cardColor = '';
      }
      backupId = '';
    }
    var cardArray = this.state.allCards;
    cardArray.push({
      id: id,
      name: name,
      description: description,
      cardColor: cardColor,
      category: category,
      errorMsg: errorMsg,
      checked:true
    });
    this.setState({allCards: cardArray});
    var stat = "";
    cardArray.map((item, index) => {
      stat += '-' + item.id;
    });
    this.updateStatus(stat.slice(1));
  }

  updateStatus(stat) {
    this.setState({status: stat});
    let data = {
      userId: cookies.get('empId'),
      scenarioId: this.state.scenarioId,
      status: stat,
      scenarioName: this.state.currentScenarioName,
      userName: cookies.get('username'),
      userType: cookies.get('userType'),
      clearStatus: this.state.clearStatus
    };
    let context = this;
    $.ajax({
      url: '/dnd/updateStatus',
      type: 'PUT',
      data: data,
      success: function() {
        context.progressCheck(context.state.correctSeq);
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }

  check(elements) {
    return elements.id == backupId;
  }

  changeCard(cards) {
    if (backupId != '') {
      var i = cards.findIndex(this.check.bind(this));
      if (i >= 0) {
        cards[i].cardColor = '';
      }
      backupId = '';
    }
    this.setState({allCards: cards});
    var stat = "";
    cards.map((item, index) => {
      stat += '-' + item.id;
    });
    this.updateStatus(stat.slice(1));
    return 'success';
  }

  changeColor(index) {
    var card = this.state.allCards;
    card[index].cardColor = '#f76a6a';
    this.setState({allCards: card});
    backupId = card[index].id;
  }

  progressCheck(correctSeq) {
    this.setState({correctSeq: correctSeq});
    var correctSeqLen = [];
    for (var i of correctSeq) {
      i = i.split('-');
      correctSeqLen.push(i.length);
    }
    correctSeqLen.sort(function(a, b){return a - b});
    //console.log('correctSeqLen',correctSeqLen);
    if (ind < correctSeqLen.length) {
      if (this.state.status.length != 0) {
        if (this.state.status.split('-').length <= correctSeqLen[ind]) {
          var p = Math.round((this.state.status.split('-').length / correctSeqLen[ind]) * 100);
          //console.log('pppp',p);
          this.setState({progress: p})
        } else {
          ind++;
        }
      } else {
        this.setState({progress: 0});
      }
    }
  }
  exitScenarioClick() {
    this.setState({esModal: true});

  }
  handleNoExitScenarioClick(){
    this.setState({esModal: false});
  }
  handleYesExitScenarioClick(){
    let context = this;
    //console.log("login ",cookies.get('loginId'));
    let data = {
      userId: cookies.get('loginId'),
      scenarioId: this.state.scenarioId,
      scenarioName: this.state.currentScenarioName,
      userName: cookies.get('username'),
      userType: cookies.get('userType')
    };
    $.ajax({
      url: '/dnd/deleteStatus',
      type: 'PUT',
      data: data,
      success: function() {
        context.setState({status: '', scenarioId: '', domainName: ''});
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
    hashHistory.push('/home');
  }

  clearClick() {
    this.setState({clearModal: true});
  }
  handleNoClearClick(){
    this.setState({clearModal: false});
  }
  handleYesClearClick() {
    this.setState({allCards: [], clearModal: false, clearStatus:true},function(){
    this.updateStatus('');
    });
    backupId = '';
  }
  openDemoVideo(){
    this.setState({active:false},function(){
      this.setState({demoVideo:true})
    });
  }
  readInstructionButtonClick() {
    this.setState({active: true},function(){
      this.setState({dimmer:<Dimmer style={{textAlign:'left'}} active={this.state.active} onClickOutside={this.handleClose} >
        <div style={{margin:'10%'}}>
          <h3>Instructions:</h3>

        <h4><li>Required suitable components can either be selected from the components library or by clicking on the individual headers.</li></h4>
        <h4><li>To select the components, click on the specific card from the pop-up screen.</li></h4>
        <h4><li>Once selected & confirmed, the cards will be available in the corresponding headers.</li></h4>
        <h4><li>These cards can now be dragged and dropped in the middle pane.</li></h4>
        <h4><li>Click the compile button once you create your workflow. Check in your code to the repository upon successful compilation.</li></h4>
        <h4><li>For any wrong compilation, you can re-order your sequence, add new components, delete existing components and compile again.</li></h4>

        <h3>Nota Bene:</h3>

        <h4><li> Components & their positions can be changed at any point.</li></h4>
        <h4><li> Compilation of the wrong sequence/components will result in negative score.</li></h4>
        <h4><li> The right side pane displays all the details about the user story.</li></h4>
        <h4/>
        <Button color='blue' style={{float:'right'}} inverted onClick={this.openDemoVideo.bind(this)}>Demo Video</Button>
        </div>
      </Dimmer>})
    });
  }

  scoreState(actualScore) {
    this.setState({actualScore: actualScore});
  }

  closeComponentDimmer() {
    this.setState({componentDimmer: ''})
  }

  componentDimmer() {
    this.setState({componentDimmer: <ComponentDimmer selected={this.state.selected} scenarioId={this.state.scenarioId} ele='all' closeComponentDimmer={this.closeComponentDimmer.bind(this)} components={this.state.components}/>});
  }

  codeDimmer() {
    let code = [];
    this.state.components.map((item, index) => {
      if (item.category == 'code') {
        code.push(item);
      }
    })
    this.setState({componentDimmer: <ComponentDimmer selected={this.state.selected} scenarioId={this.state.scenarioId} ele='code' closeComponentDimmer={this.closeComponentDimmer.bind(this)} components={code}/>});
  }

  testDimmer() {
    let test = [];
    this.state.components.map((item, index) => {
      if (item.category == 'test') {
        test.push(item);
      }
    })
    this.setState({componentDimmer: <ComponentDimmer selected={this.state.selected} scenarioId={this.state.scenarioId} ele='test' closeComponentDimmer={this.closeComponentDimmer.bind(this)} components={test}/>});
  }

  infraDimmer() {
    let infra = [];
    this.state.components.map((item, index) => {
      if (item.category == 'infra') {
        infra.push(item);
      }
    })
    this.setState({componentDimmer: <ComponentDimmer selected={this.state.selected} scenarioId={this.state.scenarioId} ele='infra' closeComponentDimmer={this.closeComponentDimmer.bind(this)} components={infra}/>});
  }

  devopsDimmer() {
    let devops = [];
    this.state.components.map((item, index) => {
      if (item.category == 'devops') {
        devops.push(item);
      }
    })
    this.setState({componentDimmer: <ComponentDimmer selected={this.state.selected} scenarioId={this.state.scenarioId} ele='devops' closeComponentDimmer={this.closeComponentDimmer.bind(this)} components={devops}/>});
  }
  getNewDependencies(){
    let context = this;
    //console.log("inside get new dependencies", this.state.scenarioId);
    let data={
      scenarioId: this.state.scenarioId
    };
    $.ajax({
      url: '/dnd/getNewDependencies',
      type: 'POST',
      data: data,
      success: function(res) {
          context.setState({newDependencies:res});
      },
      error: function(err) {
        //console.log(err);
      }
    });
  }

  render()
  {
    const {active} = this.state
    var code = '';
    var test = '';
    var infra = '';
    var devops = '';
    var clear = '';
    var compile;
    if(this.state.allCards.length == 0){
      clear = <Button disabled inverted color='orange' onClick={this.clearClick.bind(this)}>Clear</Button>;
      compile = false;
    }
    else{
      clear = <Button inverted color='orange' onClick={this.clearClick.bind(this)}>Clear</Button>;
      compile = true;
    }
    if (this.state.selectedComponents.length != 0) {
      this.state.selectedComponents.map((item, index) => {
        let x = item.components.map((item, index) =><div style={{
          padding: '10px'
        }}><Box id = {
          item.id
        }
        name = {
          item.name
        }
        description = {
          item.description
        }
        category = {
          item.category
        }
        errorMsg = {
          item.errorMsg
        }
        cardColor = '' addCard = {
          this.addCard.bind(this)
        }
        checked = {item.checked}
        place = 'left' /></div>)
        if (item.category == 'code') {
          code = x;
        } else if (item.category == 'test') {
          test = x;
        } else if (item.category == 'infra') {
          infra = x;
        } else if (item.category == 'devops') {
          devops = x;
        }
      })
    }

    let pc = <p style={{textAlign:"center",fontWeight:'bold'}}>No dependencies</p>;
    // if(this.state.preconditionNames.length != 0){
    // pc = this.state.preconditionNames.map((item,index)=>{
    //   return <b><li>{item}</li></b>
    // })
    if(this.state.newDependencies.length != 0){
    pc = this.state.newDependencies.map((item,index)=>{
      //console.log("@@@@",item);
      return <b><li>{item}</li></b>
    })
    }
    let mainPage = '';
    if(this.state.scenarioId != ''){
      mainPage = (<div>
        <div style={{backgroundColor:'white',marginTop:"2%"}}>
          {this.state.componentDimmer}
          {this.state.dimmer}
            <Dimmer active={this.state.esModal} onClickOutside={this.handleNoExitScenarioClick.bind(this)} page style={{fontSize:'130%'}}>
              <Header icon='reply' content='Exit user story' style={{color:'white',marginLeft:'35%'}}/>
              <p style={{marginRight:'3.2%'}}>Do you want to exit the user story?</p>
              <Button color='red' inverted onClick={this.handleNoExitScenarioClick.bind(this)} style={{marginLeft:'10%',marginRight:'1%'}}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' inverted onClick={this.handleYesExitScenarioClick.bind(this)}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Dimmer>
            <Dimmer active={this.state.clearModal} onClickOutside={this.handleNoClearClick.bind(this)} page style={{fontSize:'130%'}}>
              <Header icon='eraser' content='Clear work flow' style={{color:'white',marginLeft:'35%'}}/>
              <p style={{marginRight:'1.3%'}}>Do you want to clear the work flow?</p>
              <Button color='red' inverted onClick={this.handleNoClearClick.bind(this)} style={{marginLeft:'10%',marginRight:'1%'}}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' inverted onClick={this.handleYesClearClick.bind(this)}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Dimmer>
          <DragDropContextProvider backend={HTML5Backend}>
            <div style={{
              fontFamily: 'arial',
              marginBottom : '0%'
            }}>
              <Grid celled style={{
                marginBottom : '0%'
              }}>

                <Grid.Column width={3} style={{
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  fontFamily: 'arial',
                  // backgroundColor:'lightblue'
                }}>
                  <div>
                    <h4 style={{
                      marginTop: "3%",
                      marginLeft: "17%",
                      fontFamily: 'arial'
                    }}>
                      <b style={{
                        marginLeft: '-15%'
                      }}>Component Library</b>
                      <Button icon inverted onClick={this.componentDimmer} style={{
                        float: 'right',
                        marginTop:'-4%'
                      }}>
                        <Icon size='large' name='add' color='teal'/>
                      </Button>
                    </h4><hr/>
                    <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
                      display: 'none',
                      position: 'right'
                    }}/>} autoHide autoHeight autoHeightMin={450}>
                      <Accordion style={{
                        fontFamily: 'arial'
                      }}>
                        <Accordion.Title style={accordionTitle}>
                          <List>
                            <List.Item>
                              <List.Icon name='code' style={{color:'#127fdc'}} size='large'/>
                              <List.Content style={{color:'#127fdc',fontWeight:'bold'}}>Code</List.Content>
                              <Button icon inverted onClick={this.codeDimmer} style={{
                                float: 'right',
                                marginTop: '-15%',
                                marginRight: '-14%'
                              }}>
                                <Icon name='add' size='large' color='teal'/>
                              </Button>
                            </List.Item>
                          </List>
                        </Accordion.Title>
                        <Accordion.Content style={{
                          fontFamily: 'arial'
                        }}>
                          {code}
                        </Accordion.Content>
                        <Accordion.Title style={accordionTitle}>
                          <List>
                            <List.Item>
                              <List.Icon name='checkmark' style={{color:'#465a65'}} size='large'/>
                              <List.Content style={{color:'#465a65',fontWeight:'bold'}}>
                                Test
                              </List.Content>
                              <Button icon inverted onClick={this.testDimmer} style={{
                                float: 'right',
                                marginTop: '-15%',
                                marginRight: '-14%'
                              }}>
                                <Icon name='add' size='large' color='teal'/>
                              </Button>
                            </List.Item>
                          </List>
                        </Accordion.Title>
                        <Accordion.Content>
                          {test}
                        </Accordion.Content>
                        <Accordion.Title style={accordionTitle}>
                          <List>
                            <List.Item>
                              <List.Icon name='settings' style={{color:'#00a872'}} size='large'/>
                              <List.Content style={{color:'#00a872',fontWeight:'bold'}}>
                                Devops Config
                              </List.Content>
                              <Button icon inverted onClick={this.devopsDimmer} style={{
                                float: 'right',
                                marginTop: '-15%',
                                marginRight: '-14%'
                              }}>
                                <Icon name='add' size='large' color='teal'/>
                              </Button>
                            </List.Item>
                          </List>
                        </Accordion.Title>
                        <Accordion.Content style={{
                          fontFamily: 'arial'
                        }}>
                          {devops}
                        </Accordion.Content>
                        <Accordion.Title style={accordionTitle}>
                          <List>
                            <List.Item>
                              <List.Icon name='cloud download' style={{color:'#b76602'}} size='large'/>
                              <List.Content style={{color:'#b76602',fontWeight:'bold'}}>
                                Infra Config
                              </List.Content>
                              <Button icon inverted onClick={this.infraDimmer} style={{
                                float: 'right',
                                marginTop: '-15%',
                                marginRight: '-14%'
                              }}>
                                <Icon name='add' size='large' color='teal'/>
                              </Button>
                            </List.Item>
                          </List>
                        </Accordion.Title>
                        <Accordion.Content style={{
                          fontFamily: 'arial'
                        }}>
                          {infra}
                        </Accordion.Content>

                      </Accordion>
                    </Scrollbars>
                  </div>
                </Grid.Column>
                <Grid.Column width={9} style={{backgroundColor:'#f0eff4'}}>
                  <div>
                    <Button inverted color='orange' style={{
                      float: 'left'
                    }} onClick={this.exitScenarioClick.bind(this)}>Exit user story</Button>
                    {clear}
                    <Compile teamName={this.state.teamName} compile={compile} scoreState={this.scoreState.bind(this)}
                      actualScore={this.state.actualScore} negativescore={this.state.negativescore} score={this.state.score} progressCheck={this.progressCheck.bind(this)} userId={cookies.get('empId')} scenarioId={this.state.scenarioId} domainName={this.state.domainName}
                      seq={this.state.status} correctSeq={this.state.correctSeq} changeColor={this.changeColor.bind(this)} currentScenarioName={this.state.currentScenarioName} preConditions={this.state.preConditions}/>
                    <Button inverted color='blue' onClick={this.readInstructionButtonClick.bind(this)} style={{
                      float: 'right'
                    }}>Instructions</Button>
                    <hr/>
                    <h5 style={{
                      marginTop: "0%",
                      marginLeft: "1%",
                      fontFamily: 'arial'
                    }}>
                      <b>{this.state.problemstatement}</b>
                    </h5><br/>

                    {(this.state.progress == 0)?null:<div><p style={{float:'left',marginRight:'5px',marginTop:'-7px'}}>{this.state.progress}%</p><Progress size='tiny' percent={this.state.progress} color='green'/></div>}
                    <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
                      display: 'none',
                      position: 'right'
                    }}/>} autoHeight autoHide autoHeightMin={300}>
                    <div>
                      <Dustbin allCards={this.state.allCards} changeCard={this.changeCard.bind(this)} style={{
                        minHeight: '250px'
                      }}/>
                      <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                      </div>
                    </div>
                    </Scrollbars>
                  </div>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4 style={{
                    marginTop: "2%",
                    marginLeft: "3%",
                    fontFamily: 'arial'
                  }}>
                    <b>User Story Details</b>
                  </h4><hr/>
                  <div style={{
                    marginLeft: '5%'
                  }}>
                  <Card>
                    <Label style={{
                      marginLeft: "4%",
                      marginRight: "-10%",
                      backgroundColor:'#015a82',
                      borderColor:'#015a82'
                    }} ribbon>Customer Journey Name</Label>
                    <p style={{
                      marginTop: "2%",
                      textAlign: 'center',
                      fontFamily: 'arial',
                      marginBottom: '2%'
                    }}>
                      <b>{this.state.domainName}</b>
                    </p>
                  </Card>
                    <Card>
                      <Label style={{
                        marginLeft: "4%",
                        marginRight: "-10%",
                        backgroundColor:'#015a82',
                        borderColor:'#015a82'
                      }} ribbon>User Story Id</Label>
                      <p style={{
                        marginTop: "2%",
                        textAlign: 'center',
                        fontFamily: 'arial',
                        marginBottom: '2%'
                      }}>
                        <b>{this.state.scenarioId}</b>
                      </p>
                    </Card>
                    <Card>
                      <Label style={{
                        marginLeft: "4%",
                        marginRight: "-10%",
                        backgroundColor:'#015a82',
                        borderColor:'#015a82'
                      }} ribbon>User Story Name</Label>
                      <p style={{
                        marginTop: "2%",
                        textAlign: 'center',
                        fontFamily: 'arial',
                        marginBottom: '2%'
                      }}>
                        <b>{this.state.currentScenarioName}</b>
                      </p>
                    </Card>
                    <Card>
                      <Label style={{
                        marginLeft: "4%",
                        marginRight: "-10%",
                        backgroundColor:'#015a82',
                        borderColor:'#015a82'
                      }} ribbon>User Story max score</Label>
                      <p style={{
                        marginTop: "2%",
                        textAlign: 'center',
                        fontFamily: 'arial',
                        marginBottom: '2%'
                      }}>
                        <b>{this.state.score}</b>
                      </p>
                    </Card>
                    <Card>
                      <Label style={{
                        marginLeft: "4%",
                        marginRight: "-10%",
                        backgroundColor:'#015a82',
                        borderColor:'#015a82'
                      }} ribbon>User Story negative score</Label>
                      <p style={{
                        marginTop: "2%",
                        textAlign: 'center',
                        fontFamily: 'arial',
                        marginBottom: '2%'
                      }}>
                        <b>{this.state.negativescore}</b>
                      </p>
                    </Card>
                    <Card>
                      <Label style={{
                        marginLeft: "4%",
                        marginRight: "-10%",
                        backgroundColor:'#015a82',
                        borderColor:'#015a82'
                      }} ribbon>User Story dependencies</Label>
                      <p style={{
                        marginTop: "2%",
                        fontFamily: 'arial',
                        marginBottom: '2%',
                        marginLeft:'11%'
                      }}>
                      {pc}
                      </p>
                    </Card>
                  </div>
                </Grid.Column>
              </Grid>
            </div>
          </DragDropContextProvider>
          <nav className="navbar navbar-fixed-bottom" id="footer" >
           <div id = "ribbon" className="row footer-brand-colour">
                 <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
                 <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
                 <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
             </div>
                <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
              <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
            </nav>
            <Dimmer active={this.state.activeForCheatCode} onClickOutside={this.handleClose} page>
              <h2 style={{margin:"auto"}}>The Correct Sequence is: </h2>
              <div style={{width:500,margin:"auto"}}><Sequence className="seqContent" correctSequence = {this.state.sequenceAcc}/></div>
            </Dimmer>
        </div>
      </div>);
    } else {
      mainPage = (<div><Card  color="red" style = {{margin:"auto",marginTop:'100px'}}>
         <Card.Content>
        <Card.Header>Loading content... </Card.Header>
        <Card.Description>If not loaded in 5 seconds Please Reload to continue...</Card.Description>
      </Card.Content>
    </Card></div>);
    }
    return (
      <div>
        {mainPage}
          <Dimmer active={this.state.demoVideo} onClickOutside={this.handleClose} ><iframe width="560" height="315" src="https://www.youtube.com/embed/rdlYGRijMUg?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
          </Dimmer>
      </div>
    );
  }
}
