import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
import 'react-table/react-table.css';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddComponent extends React.Component {
  constructor() {
    super();
    this.createNewConcept = this.createNewConcept.bind(this);
    this.state = {
      flag: 0,
      category: [
        { key: 'code', text: 'code', value: 'code' },
        { key: 'test', text: 'test', value: 'test' },
        { key: 'infra', text: 'infra', value: 'infra' },
        { key: 'devops', text: 'devops', value: 'devops' }
      ],
      Category: ''
    };
    this.addNewComponent = this.addNewComponent.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForAddNewComponentAlert = this.checkForAddNewComponentAlert.bind(this);
  }
  checkForEmptyAlert() {
    this.refs.asd.error(
      'Please fill all the fields',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForAddNewComponentAlert() {
    this.refs.asd.success(
      'New component added successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  category(e, a) {
    let res = a.value;
    this.setState({Category: res});
  }
  createNewConcept(e) {
    let name = this.refs.newComponentName.value;
    let category = this.state.Category;
    let description = this.refs.newComponentD.value;
    let errormsg = this.refs.errormsg.value;
    if(name === '' || description === '' || category === '' || errormsg === '') {
      this.checkForEmptyAlert();
      name = '';
      description = '';
      category = '';
      errormsg = '';
    }
    else{
      this.addNewComponent(name, description, category, errormsg);}
    }
    addNewComponent(name,description,category,errormsg) {
      let context = this;
      $.ajax({
        url: '/admin/addNewComponent',
        type: 'POST',
        data: {componentName: name, componentCategory: category, componentDescription: description, componentErrorMsg: errormsg},
        success: function(response)
        {
          context.checkForAddNewComponentAlert();
          this.refs.newComponentName.value = '';
          this.refs.newComponentD.value = '';
          this.refs.errormsg.value = '';
          this.state.Category = '';
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
    render() {
      return (
        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1}/>
              <Grid.Column width={14}>
                <p style={{fontSize:'16px',fontFamily:'arial'}}><b>Add new component</b></p>
                <Form>
                  <Form.Field>
                    <label>
                      <p style={{fontSize:'14px',fontFamily:'arial'}}>Name</p>
                    </label>
                    <input autoComplete='off' type='text' ref='newComponentName' placeholder='Component Name' required/>
                  </Form.Field>
                  <Form.Field>
                    <label>
                      <p style={{fontSize: '14px', fontFamily: 'arial'}}>Category of component</p>
                    </label>
                    <Dropdown onChange={this.category.bind(this)} fluid placeholder='Select the category' selection options={this.state.category} required/>
                  </Form.Field>
                  <Form.Field>
                    <label>
                      <p style={{fontSize: '14px', fontFamily: 'arial'}}>Error message</p>
                    </label>
                    <input autoComplete='off' type='text' ref='errormsg' placeholder='Error Message' required/>
                  </Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Description</p>
                    <textarea ref='newComponentD' style={{width: '960px'}} placeholder='Description of the component'/>
                  </label>
                </Form>
                <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.createNewConcept}>Add</Button></Grid.Column>
                <Divider/>
              </Grid.Column>
              <Grid.Column width={1}/>
            </Grid.Row>
          </Grid>
          <ToastContainer ref='asd'
            toastMessageFactory={ToastMessageFactory}
            className='toast-top-center' style={{marginTop:'8%'}}/>
          </div>
        );
      }
    }
