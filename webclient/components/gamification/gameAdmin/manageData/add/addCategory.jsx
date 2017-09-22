import React from 'react';
import {Form, Grid, Button, Divider} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddCategory extends React.Component {
  constructor() {
    super();
    this.validateData = this.validateData.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForonlyAlphabetsAlert = this.checkForonlyAlphabetsAlert.bind(this);
    this.checkForaddedNewCategoryAlert = this.checkForaddedNewCategoryAlert.bind(this);
    this.checkForEnterProperDescriptionAlert = this.checkForEnterProperDescriptionAlert.bind(this);
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

  checkForonlyAlphabetsAlert() {
    this.refs.asd.error(
      'Only alphabets allowed in Category name',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }

  checkForaddedNewCategoryAlert() {
    this.refs.asd.success(
      'New Category added successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }

  checkForEnterProperDescriptionAlert() {
    this.refs.asd.error(
      'Enter the right description',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }

  validateData(e) {
    e.preventDefault();
    let name = this.refs.newCategoryN.value;

    if(name === '') {
      this.checkForEmptyAlert();
    }
    else{
      this.addNewCategory(name);
    }
  }

  addNewCategory(name) {
    let context = this;
    console.log("inside ajax category");
    $.ajax({
      url: '/gameadmin/addNewCategory',
      type: 'POST',
      data: {categoryName: name},
      success: function(response)
      {
        context.checkForaddedNewCategoryAlert();
        this.refs.newCategoryN.value = '';
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
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Add new category</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Name</p>
                  </label>
                  <input autoComplete='off' type='text' ref='newCategoryN' placeholder='Name of the category' required/>
                </Form.Field>

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
