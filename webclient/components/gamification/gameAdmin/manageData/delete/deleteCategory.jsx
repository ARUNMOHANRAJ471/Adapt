import React from 'react';
import {Form, Grid, Button, Icon, Divider, Dropdown, Dimmer, Header} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class DeleteCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      domain: [],
      ddModal: false
    };
    this.deleteDomain = this.deleteDomain.bind(this);
    this.updateDomain = this.updateDomain.bind(this);
    this.checkForRemovedDomainAlert = this.checkForRemovedDomainAlert.bind(this);
  }
  componentWillMount() {
    let domainArray = [];
    $.ajax({
      url: '/gameadmin/findCategory',
      type: 'GET',
      success: function(data)
      {
        for(let i in data) {
          if(i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
          }
        }
        this.setState({
          domain: domainArray
        });
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  checkForRemovedDomainAlert() {
    this.refs.asd.success(
      'Removed Category successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  updateDomains() {
    let domainArray = [];
    $.ajax({
      url: '/gameadmin/findCategory',
      type: 'GET',
      success: function(data)
      {
        for(let i in data) {
          if(i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
          }
        }
        this.setState({
          domain: domainArray
        });
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  deleteDomain() {
    this.setState({ddModal: true});
  }
  handleNoDeleteDomainClick() {
    this.setState({ddModal: false});
  }
  handleYesDeleteDomainClick() {
    let context = this;
    context.setState({ddModal: false});
    let sucessFlag = 0;
    if(this.state.searchQuery) {
      $.ajax({
        url: '/gameadmin/deleteCategory',
        type: 'POST',
        data: {domainName: this.state.searchQuery},
        success: function(response)
        {
          context.checkForRemovedDomainAlert();
          sucessFlag = 1;
          this.setState({
            domain: '',

          });
          context.updateDomains();
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }
  updateDomain(e, a) {
    if (a != null) {
      let res = a.value;
      let context = this;
      this.setState({searchQuery: res});
      $.ajax({
        url: '/gameadmin/viewCategoryDetails',
        type: 'POST',
        data: {searchQuery: res},
        success: function(dataDB)
        {
          var data = dataDB.records[0]._fields[0].properties;

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
        <Dimmer active={this.state.ddModal} onClickOutside={this.handleNoDeleteDomainClick.bind(this)} page style={{fontSize: '130%'}}>
          <Header icon='trash outline' content='Delete customer journey' style={{color: 'white', marginLeft: '35%'}}/>
          <p style={{marginRight: '3.2%'}}>Are you sure you want to delete the selected category?</p>
          <Button color='red' inverted onClick={this.handleNoDeleteDomainClick.bind(this)} style={{marginLeft: '10%', marginRight: '1%'}}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.handleYesDeleteDomainClick.bind(this)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Dimmer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Delete category</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Category</p>
                  </label>
                  <Dropdown onChange={this.updateDomain.bind(this)} placeholder='Select the Category to be removed' fluid search selection options={this.state.domain} required/>
                </Form.Field>
              </Form>
              <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.deleteDomain}>Delete</Button></Grid.Column>
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
