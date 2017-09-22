import React, {Component} from 'react';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import Dustbin from './Dustbin';
import Box from './Box';
import {
  Grid,
  Accordion,
  Button,
  List,
  Divider,
  Form,
  Dropdown
} from 'semantic-ui-react';
import {Scrollbars} from 'react-custom-scrollbars';
import Compile from './compile';
var ind = 0;
const {hashHistory} = require('react-router');
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
let accordionTitle = {
  height: '30px',
  textAlign: 'center',
  border: '1px',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '2.0rem',
  fontSize: '15px',
  fontFamily: 'arial'
};
export default class Container extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      components: [],
      status: '',
      scenarioId: '',
      problemstatement: '',
      domain: [],
      scenario: [],
      statusForComp: false,
      toUpdateScenario:'',
      sequences:[],
      selectedSequence:''
    };
    this.getDomain = this.getDomain.bind(this);
    this.getDomainComponents = this.getDomainComponents.bind(this);
    this.updatesearchQueryScenario = this.updatesearchQueryScenario.bind(this);
    this.updateScenario = this.updateScenario.bind(this);
    this.updateSequence = this.updateSequence.bind(this);
    this.checkForSequenceAddedSuccessfullyAlert = this.checkForSequenceAddedSuccessfullyAlert.bind(this);
    this.checkForSequenceUpdatedSuccessfullyAlert = this.checkForSequenceUpdatedSuccessfullyAlert.bind(this);
  }
  checkForSequenceAddedSuccessfullyAlert() {
    let context = this;
    this.refs.asd.success(
      'Sequence added successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  checkForSequenceUpdatedSuccessfullyAlert() {
    let context = this;
    this.refs.asd.success(
      'Sequence updated successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  updateSequence(e, a) {
    if (a.value != null) {
      let res = a.value;
      if(res != this.state.selectedSequence){
        this.clearClick();
      }
      this.setState({selectedSequence:res});
      // this.updateStatus(res);
      this.setState({status:res},function(){this.getComponentById()});

    }}

  updateScenario(e, a) {
    if (a.value != null) {
      let res = a.value;
      if(res != this.state.toUpdateScenario){
        this.clearClick();
      }
      let context = this;
      this.setState({toUpdateScenario:res});
      $.ajax({
        url: "/users/findScenarioData",
        type: 'POST',
        data: {
          scenario: res
        },
        success: function(dataDB) {
          var data = dataDB.records[0]._fields[0].properties;
          //console.log('The data is :', data);
          let sequenceArray = [];
            for (let i in data.sequence) {
              //console.log(i);
                //console.log(data.sequence[i]);
              if (i !== null) {
                let a = parseInt(i) + 1;
                let aaa = 'Sequence '+a;
                sequenceArray.push({key: data.sequence[i], value: data.sequence[i], text: aaa});
              }
            }
            if(sequenceArray.length != 0){
                context.setState({scenarioId: dataDB.records[0]._fields[0].identity.low,sequences:sequenceArray},function(){
                  // this.getStatusInfo();
                });
              } else {
                context.setState({scenarioId: dataDB.records[0]._fields[0].identity.low});
              }
          //console.log('id', this.state.scenarioId);
          //console.log('sequences', this.state.sequences);
          // context.setState({probStmt:data.problemstatement,name:data.name,output:data.output,evalfun:data.evalfun,code:data.code});
        }.bind(this),
        error: function(err) {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
    }
  }
  componentWillMount() {
    //console.log('this.props.page',this.props.page);
    if(this.props.page == 'add'){
      this.setState({allCards:[]})
    }
    this.getDomain();
  }
  getDomain() {
    let domainArray = [];
    $.ajax({
      url: '/users/findDomain',
      type: 'GET',
      success: function(data) {
        for (let i in data) {
          // //console.log(data[i]);
          if (i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
          }
        }
        this.setState({domain: domainArray});
      }.bind(this),
      error: function(err) {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }

    updatesearchQueryScenario(e, a) {
      // //console.log("e ",e);
      // //console.log("a ", a);
      var empId = cookies.get('empId');
      let context = this;
      if (a.value != null) {
        let res = a.value;

        let scenarioArray = [];
        $.ajax({
          url: "/users/findScenarios",
          type: 'POST',
          data: {
            domain: res,empId:empId
          },
          success: function(data) {
            for (let i in data) {
              // //console.log(data[i]);
              if (i !== null) {
                scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
              }
            }
            // context.setState({scenario: scenarioArray});
            context.getDomainComponents(res, scenarioArray);
          }.bind(this),
          error: function(err) {
            //console.log('error occurred on AJAX');
          }.bind(this)
        });
      }
    }
  getDomainComponents(domainName, scenarioArray) {
    //console.log('inside get Domain components');
    var com = [];
    var components = [];
    var category = [];
    $.ajax({
      url: '/Components/categoryAdmin',
      type: 'GET',
      async: false,
      success: function(data) {
        //console.log('get category', data.records);
        for (var i of data.records) {
            // com[i] = {
            //   category: i._fields
            // };
          let categoryName = i._fields[0];
          // //console.log('categoryName: ', categoryName);
          // //console.log('i value is', i);
          let data = {
            category: categoryName,
            domain: domainName,
            loginType:'admin'
          };
          $.ajax({
            url: "/Components/getComponents",
            type: 'POST',
            data: data,
            async: false,
            success: function(data) {
              //console.log('data after getting components', data);
              var c = [];
              data.map(function(item) {
                c.push({
                  id: '' + item.componentId,
                  name: '' + item.componentName,
                  description: '' + item.componentDescription,
                  category: '' + item.category,
                  errorMsg: '' + item.errorMsg
                });
              })
              //  //console.log('cccccccccc',c);
              components.push({category: categoryName, components: c});
              // //console.log('com', components);
              // //console.log('components', this.state.components);
            }.bind(this),
            error: function(err) {
              //console.log('error occurred on AJAX' + err);
            }.bind(this)
          });
        }

        this.setState({components: components, scenario:scenarioArray}, function(){
          // this.setState({statusForComp:true});
        });

        // this.setState({category: category});
        //  //console.log('category',this.state.category);
        //  //console.log('com',com);

      }.bind(this),
      error: function(err) {
        //console.log("inside ajax error " + JSON.stringify(err));
      }
    });
  }

  getStatusInfo() {
    var a = cookies.get('empId');
    let context = this;
    $.ajax({
      url: '/dnd/getStatusInfo',
      type: 'POST',
      data: {
        userId: a,
        scenarioId: this.state.scenarioId
      },
      success: function(res) {
        // //console.log("******", res);
        context.updateStatus(res);
        context.getComponentById();
      },
      error: function(err) {
        //console.log(err);
      }
    });
  }

  getComponentById() {
    let context = this;
    let recover = [];
    var state = this.state.status.split('-');
    //console.log("inside component id ", state);
    if (state.length != 0) {
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
                category: item.category
              };
            })
            // var i = state.indexOf(item.id);
          }
        })
      })
      //console.log("recover: ", recover);
      context.setState({
        allCards: recover
      }, function() {});
    }
  }

  addCard(id, name, description, cardColor, category) {
    var cardArray = this.state.allCards;
    cardArray.push({
      id: id,
      name: name,
      description: description,
      cardColor: cardColor,
      category: category
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
    // //console.log('status' + stat);
  }


  changeCard(cards) {
    // //console.log('changeCard', cards);
    this.setState({allCards: cards});
    var stat = "";
    cards.map((item, index) => {
      stat += '-' + item.id;
    });
    this.updateStatus(stat.slice(1));
    return 'success';
  }

  exitScenarioClick() {
    let data = {
      userId: cookies.get('empId'),
      scenarioId: this.state.scenarioId
    };
    $.ajax({
      url: '/dnd/deleteStatus',
      type: 'PUT',
      data: data,
      success: function() {
        //console.log("Status deleted successfully");
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
    hashHistory.push('/home');
  }

  clearClick() {
    this.setState({allCards: []});
    this.updateStatus('');
    // backupId = '';
  }

addSeq() {
  // alert(this.state.status);
  let context = this;
  let data = {scenarioId: this.state.scenarioId, sequence: this.state.status};
  $.ajax({
    url: '/component/addSequence',
    type: 'POST',
    data: data,
    success: function(dataDB) {
      // alert("Sequence added successfully");
      context.checkForSequenceAddedSuccessfullyAlert();
    },
    error: function(err) {
      //console.log("Error occured", err);
    }
  });
  this.clearClick();
}
updateSeq() {
  let data = {scenarioId: this.state.scenarioId, sequence: this.state.status, selectedSequence: this.state.selectedSequence};
  let context = this;
  $.ajax({
    url: '/component/updateSequence',
    type: 'POST',
    data: data,
    success: function(dataDB) {
      // alert("Sequence updated successfully");
      context.checkForSequenceUpdatedSuccessfullyAlert();
    },
    error: function(err) {
      //console.log("Error occured", err);
    }
  });
  this.clearClick();
}
  render()
  {
    // //console.log('this.state.components',this.state.components);
    var code = '';
    var test = '';
    var infra = '';
    var devops = '';
    if (this.state.components.length != 0) {
      this.state.components.map((item, index) => {
        let x = item.components.map((item, index) =><div style={{
          padding: '5px'
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
    let theBackEnd = '';
    let b = false;
    //console.log("before sID",this.state.scenarioId);
    //console.log("before comp",this.state.components.length);
    if(this.props.page == 'add'){
    //console.log("inside sID",this.state.scenarioId);
    //console.log("inside comp",this.state.components.length);
      if(this.state.components.length != 0 && this.state.scenarioId != ''){
        b= true;
      }
    }
    else if(this.props.page == 'edit'){
      if(this.state.components.length != 0 && this.state.scenarioId != '' && this.state.selectedSequence != ''){
        b= true;
      }
    }
    let btnContent;
    let clearBtn;
    if(this.state.allCards.length == 0){
      clearBtn = <Button disabled color='orange' inverted className="clrBtnAdmin" onClick={this.clearClick.bind(this)}>Clear</Button>
      if(this.props.page == 'add'){
        btnContent = (<div><Button disabled color='orange' inverted className="actionInRightPane" onClick={this.addSeq.bind(this)}>Add</Button></div>);
      } else if(this.props.page == 'edit') {
        btnContent = (<div><Button disabled color='orange' inverted className="actionInRightPane" onClick={this.updateSeq.bind(this)}>Update</Button></div>);
      }
    }
    else{
      clearBtn = <Button color='orange' inverted className="clrBtnAdmin" onClick={this.clearClick.bind(this)}>Clear</Button>
    if(this.props.page == 'add'){
      btnContent = (<div><Button color='orange' inverted className="actionInRightPane" onClick={this.addSeq.bind(this)}>Add</Button></div>);
    } else if(this.props.page == 'edit') {
      btnContent = (<div><Button color='orange' inverted className="actionInRightPane" onClick={this.updateSeq.bind(this)}>Update</Button></div>);
    }
  }
    if(b){
      theBackEnd = (
      <DragDropContextProvider backend={HTML5Backend}>
        <div style={{fontFamily: 'arial'}}>

          <Grid celled>

            <Grid.Column width={4} style={{
              paddingLeft: '0px',
              paddingRight: '0px'
            }}>
              <div>
                <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
                  display: 'none',
                  position: 'right'
                }}></div>} autoHide autoHideTimeout={500} autoHeight autoHeightMin={300}>
                  <Accordion style={{fontFamily: 'arial'}}>
                    <Accordion.Title style={accordionTitle}>
                      <List>
                        <List.Item>
                            <List.Icon name='code' style={{color:'#ad4658'}} size='large'/>
                            <List.Content style={{color:'#ad4658',fontWeight:'bold'}}>Code</List.Content>
                        </List.Item>
                      </List>
                    </Accordion.Title>
                    <Accordion.Content>
                      {code}
                    </Accordion.Content>
                    <Divider/>
                    <Accordion.Title style={accordionTitle}>
                      <List>
                        <List.Item>
                          <List.Icon name='checkmark' style={{color:'#465a65'}} size='large'/>
                          <List.Content style={{color:'#465a65',fontWeight:'bold'}}>
                            Test
                          </List.Content>
                        </List.Item>
                      </List>
                    </Accordion.Title>
                    <Accordion.Content>
                      {test}
                    </Accordion.Content>
                    <Divider/>
                    <Accordion.Title style={accordionTitle}>
                      <List>
                        <List.Item>
                          <List.Icon name='settings' style={{color:'#6f781b'}} size='large'/>
                          <List.Content style={{color:'#6f781b',fontWeight:'bold'}}>
                            Devops Config
                          </List.Content>
                        </List.Item>
                      </List>
                    </Accordion.Title>
                    <Accordion.Content>
                      {devops}
                    </Accordion.Content>
                    <Divider/>
                    <Accordion.Title style={accordionTitle}>
                      <List>
                        <List.Item>
                          <List.Icon name='cloud download' style={{color:'#0097a8'}} size='large'/>
                          <List.Content style={{color:'#0097a8',fontWeight:'bold'}}>
                            Infra Config
                          </List.Content>
                        </List.Item>
                      </List>
                    </Accordion.Title>
                    <Accordion.Content>
                      {infra}
                    </Accordion.Content>

                  </Accordion>
                </Scrollbars>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <div>
                {clearBtn}
                {/* <Compile userId={cookies.get('empId')} scenarioId={this.state.scenarioId} seq={this.state.status} correctSeq={this.state.correctSeq}/> */}
                {btnContent}
                <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
                  display: 'none',
                  position: 'right'
                }}></div>} autoHeight autoHeightMin={400}>
                  <Dustbin allCards={this.state.allCards} changeCard={this.changeCard.bind(this)} style={{
                    minHeight: '550px'
                  }}/>
                </Scrollbars>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </DragDropContextProvider>);
    }
    let formData = '';
    if(this.props.page == 'add'){
      formData = (<div><Form>
        <Form.Field>
          <label>
            <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Select Customer journey of the User story</b></p>
          </label>
          <Dropdown onChange={this.updatesearchQueryScenario} placeholder='Select the Customer journey' fluid search selection options={this.state.domain}/>
        </Form.Field>
        <Form.Field>
          <label>
            <p style={{fontSize:"14px",fontFamily:"arial"}}>Select User story</p>
          </label>
          <Dropdown onChange={this.updateScenario} fluid placeholder='Select User story to Update' selection options={this.state.scenario}/>
        </Form.Field>
      </Form></div>);
    }

    if(this.props.page == 'edit'){
      // this.setState({domain:[]})
      formData = (<div><Form>
        <Form.Field>
          <label>
          <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Select Customer journey of the User story</b></p>
          </label>
          <Dropdown onChange={this.updatesearchQueryScenario} placeholder='Select the Customer journey' fluid search selection options={this.state.domain}/>
        </Form.Field>
        <Form.Field>
          <label>
            <p style={{fontSize:"14px",fontFamily:"arial"}}>Select User story</p>
          </label>
          <Dropdown onChange={this.updateScenario} fluid placeholder='Select User story to Update' selection options={this.state.scenario}/>
        </Form.Field>
        <Form.Field>
          <label>
            <p style={{fontSize:"14px",fontFamily:"arial"}}>Select Sequence</p>
          </label>
          <Dropdown onChange={this.updateSequence} fluid placeholder='Select Sequence' selection options={this.state.sequences}/>
        </Form.Field>
      </Form></div>);
    }

    return (
        <div>
          {formData}
        {theBackEnd}
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop:'8%'}}/>
        </div>


    );
  }
}
