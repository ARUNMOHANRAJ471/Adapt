import React from 'react';
import {Form, Grid, Button, Divider} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddDomain extends React.Component {
  constructor() {
    super();
    this.validateData = this.validateData.bind(this);
    this.addNewDomain = this.addNewDomain.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForonlyAlphabetsAlert = this.checkForonlyAlphabetsAlert.bind(this);
    this.checkForaddedNewDomainAlert = this.checkForaddedNewDomainAlert.bind(this);
    this.checkForEnterProperDescriptionAlert = this.checkForEnterProperDescriptionAlert.bind(this);
  }
  //  @Mayanka : Alert for empty fields
  checkForEmptyAlert() {
    this.refs.asd.error(
      'Please fill all the fields',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  //  @Mayanka : Alert for Employee name field
  checkForonlyAlphabetsAlert() {
    this.refs.asd.error(
      'Only alphabets allowed in Employee name',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  //  @Mayanka : Success alert after adding a new Customer journey
  checkForaddedNewDomainAlert() {
    this.refs.asd.success(
      'New Customer Journey added successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  //  @Mayanka : Alert for description field of Customer journey
  checkForEnterProperDescriptionAlert() {
    this.refs.asd.error(
      'Enter the right description',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  //  @Mayanka : Validating data entered by user
  validateData(e) {
    e.preventDefault();
    let name = this.refs.newDomainN.value;
    let description = this.refs.newDomainD.value;
    let video = this.refs.video.value;
    if(name === '' || description === '' || video === '') {
      this.checkForEmptyAlert();
    }
    else{
      this.addNewDomain(name, description, video);
    }
  }
  //  @Mayanka : Adding a new customer journey
  addNewDomain(name, description, video) {
    let context = this;
    $.ajax({
      url: '/admin/addNewDomain',
      type: 'POST',
      data: {domainName: name, domainDescription: description, video: video},
      success: function(response)
      {
        context.checkForaddedNewDomainAlert();
        this.refs.newDomainN.value = '';
        this.refs.newDomainD.value = '';
        this.refs.video.value = '';
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
//  @Mayanka :  UI for adding a new customer journey UI
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Add new customer journey</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Name</p>
                  </label>
                  <input autoComplete='off' type='text' ref='newDomainN' placeholder='Name' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Video link</p>
                  </label>
                  <input autoComplete='off' type='text' ref='video' placeholder='video link' required/>
                </Form.Field>
                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Description</p>
                  <textarea style={{width: '960px'}} ref='newDomainD' placeholder='customer journey Brief' required/>
                </label>
              </Form>
              <Grid.Column width={6}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.validateData}>Add</Button></Grid.Column>
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
