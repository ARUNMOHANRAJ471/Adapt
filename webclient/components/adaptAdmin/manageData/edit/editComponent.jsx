import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class EditComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      componentArray: [],
      searchComponent: [],
      searchQuery: '',
      modifiedComponentN: '',
      category: '',
      errormsg: '',
      modifiedComponentD: '',
      componentId: '',
      flag: 0,
      categoryoption: [
        { key: 'code', text: 'code', value: 'code' },
        { key: 'test', text: 'test', value: 'test' },
        { key: 'infra', text: 'infra', value: 'infra' },
        { key: 'devops', text: 'devops', value: 'devops' }
      ],
      Category: ''
    };
    this.updateComponent = this.updateComponent.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateName = this.updateName.bind(this);
    this.category = this.category.bind(this);
    this.updateErrormsg = this.updateErrormsg.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.checkForComponentUpdatedSuccessfullyAlert = this.checkForComponentUpdatedSuccessfullyAlert.bind(this);
  }
  checkForComponentUpdatedSuccessfullyAlert() {
    this.refs.asd.success(
      'component updated successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  updateName(e) {
    this.setState({name: e.target.value});
  }
  category(e, a) {
    let res = a.value;
    this.setState({Category: res});
  }
  updateErrormsg(e) {
    this.setState({errormsg: e.target.value});
  }
  updateDescription(e) {
    this.setState({description: e.target.value});
  }
  updateProperty() {
    let data = {
      description: this.state.description,
      name: this.state.name,
      category: this.state.Category,
      errormsg: this.state.errormsg,
      componentId: this.state.componentId
    };
    let context = this;
    $.ajax({
      url: '/admin/updateComponent',
      type: 'POST',
      data: data,
      success: function(data) {
        context.checkForComponentUpdatedSuccessfullyAlert();
        context.setState({description: '',
        name: '',
        category: '',
        errormsg: '',
        componentId: ''});
        context.getAllComponents();
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  componentWillMount() {
    this.getAllComponents();
  }
  getAllComponents() {
    let context = this;
    let arrOfComponent = [];
    let arrayadd = [];
    $.ajax({
      url: '/component/getComponentsAll',
      type: 'GET',
      success: function(res) {
        for (let i = 0; i < res.records.length; i = i + 1) {
          arrOfComponent.push({content: res.records[i]._fields[0].properties.name});
        }
        for (let k = 0; k < arrOfComponent.length; k = k + 1) {
          arrayadd.push({key: arrOfComponent[k].content, value: arrOfComponent[k].content, text: arrOfComponent[k].content});
        }
        context.setState({componentArray: arrayadd});
      },
      error: function(err) {
      }
    });
  }
  updateComponent(e, a) {
    if (a.value != null) {
      let res = a.value;
      let context = this;
      this.setState({searchQuery: res});
      $.ajax({
        url: '/admin/viewComponentDetails',
        type: 'POST',
        data: {searchQuery: res},
        success: function(dataDB)
        {
          let data = dataDB.records[0]._fields[0].properties;
          context.setState({componentId: dataDB.records[0]._fields[0].identity.low});
          context.setState({name: data.name, Category: data.category, description: data.description, errormsg: data.errormsg});
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Modify Existing Component</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Component to be modified</p>
                  </label>
                  <Dropdown onChange={this.updateComponent} placeholder='Select the Customer journey to be modified' fluid search selection options={this.state.componentArray}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Component name</p>
                  </label>
                  <input autoComplete='off' type='text' value={this.state.name} onChange={this.updateName} ref='modifiedComponentN' placeholder='New Name' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Category of Component</p>
                  </label>
                  <Dropdown onChange={this.category} value={this.state.Category} fluid placeholder='Select the category' selection options={this.state.categoryoption} required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Error Message</p>
                  </label>
                  <input autoComplete='off' type='text' value={this.state.errormsg} onChange={this.updateErrormsg} ref='errormsg' placeholder='Error Message' required/>
                </Form.Field>
                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Description</p>
                  <textarea ref='modifiedComponentD' style={{width: '960px'}} onChange={this.updateDescription} placeholder='Type new Component Description' value={this.state.description} required/>
                </label>
              </Form>
              <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.updateProperty}>Modify</Button></Grid.Column>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop: '8%'}}/>
        </div>
      );
    }
  }
