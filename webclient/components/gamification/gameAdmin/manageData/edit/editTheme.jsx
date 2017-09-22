import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class EditTheme extends React.Component {
  constructor() {
    super();
    this.state = {
      componentArray: [],

      searchQuery: '',
      modifiedComponentN: '',


      ThemeId: '',
      flag: 0,

    };
    this.updateComponent = this.updateComponent.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.Theme = this.Theme.bind(this);
    // this.category = this.category.bind(this);
    this.Sequence = this.Sequence.bind(this);
    // this.updateDescription = this.updateDescription.bind(this);
    this.checkForComponentUpdatedSuccessfullyAlert = this.checkForComponentUpdatedSuccessfullyAlert.bind(this);
  }
  checkForComponentUpdatedSuccessfullyAlert() {
    this.refs.asd.success(
      'Theme updated successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  Theme(e) {
    this.setState({Theme: e.target.value});
  }

  Sequence(e) {
    this.setState({Sequence: e.target.value});
  }
  // updateDescription(e) {
  //   this.setState({description: e.target.value});
  // }
  updateProperty() {
    let data = {
      // description: this.state.description,
      Theme: this.state.Theme,
      // category: this.state.Category,
      Sequence: this.state.Sequence,
      ThemeId: this.state.ThemeId
    };
    let context = this;
    $.ajax({
      url: '/gameadmin/updateTheme',
      type: 'POST',
      data: data,
      success: function(data) {
        context.checkForComponentUpdatedSuccessfullyAlert();
        context.setState({
        Theme: '',

        Sequence: '',
        ThemeId: ''});
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
      url: '/gameadmin/getThemesAll',
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
        url: '/gameadmin/viewThemeDetails',
        type: 'POST',
        data: {searchQuery: res},
        success: function(dataDB)
        {
          let data = dataDB.records[0]._fields[0].properties;
          context.setState({ThemeId: dataDB.records[0]._fields[0].identity.low});
          context.setState({Theme: data.name, Sequence: data.Sequence});
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
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Modify Existing Theme</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Theme to be modified</p>
                  </label>
                  <Dropdown onChange={this.updateComponent} placeholder='Select the theme to be modified' fluid search selection options={this.state.componentArray}/>
                </Form.Field>
                {/* <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Theme</p>
                  </label>
                  <input autoComplete='off' type='text' value={this.state.Theme} onChange={this.Theme} ref='modifiedComponentN' placeholder='New Name' required/>
                </Form.Field> */}
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Theme</p>
                  </label>
                  <input autoComplete='off' type='text' value={this.state.Theme} onChange={this.Theme} ref='modifiedComponentN' placeholder='Theme name' required/>
                </Form.Field>

                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Sequence</p>
                  </label>
                  <input autoComplete='off' type='text' value={this.state.Sequence} onChange={this.Sequence} ref='errormsg' placeholder='Sequence' required/>
                </Form.Field>



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
