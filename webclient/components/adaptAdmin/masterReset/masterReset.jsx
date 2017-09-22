import React from 'react';
import { Button, Grid, Dimmer, Header, Icon } from 'semantic-ui-react'
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class MasterReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    ddModal:false
    }
    this.handleYesDeleteUser = this.handleYesDeleteUser.bind(this);
  }
  checkForDeletedUserAlert() {
    //console.log("inside check for master reset done alert");
    let context = this;
    this.refs.asd.success(
      'Master reset done',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  handleYesDeleteUser() {
this.setState({ddModal:true});
  }
  handleNoDeleteDomainClick(){
    this.setState({ddModal:false});
  }
  handleYesDeleteDomainClick(){
    let context = this;
    context.setState({ddModal:false},function(){
      //console.log(context.state.ddModal);
      let sucessFlag = 0;
    $.ajax({
      url:"/admin/masterReset",
      type:'POST',
      data:{},
      success: function(data)
      {
        context.checkForDeletedUserAlert();
        sucessFlag = 1;
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
    });
  }

  render() {
    //console.log("master reset in mater reset");
    return(
      <div>
        <Dimmer active={this.state.ddModal} onClickOutside={this.handleNoDeleteDomainClick.bind(this)} page style={{fontSize:'130%'}}>
          <Header icon='trash outline' content='Master Reset' style={{color:'white',marginLeft:'35%'}}/>
          <p style={{marginRight:'3.2%'}}>Are you sure you want to master reset all the user?</p>
          <Button color='red' inverted onClick={this.handleNoDeleteDomainClick.bind(this)} style={{marginLeft:'10%',marginRight:'1%'}}>
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
              <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Master reset the user details</b></p>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Click the master rest button to reset the user details</p>
              <Grid.Column width={1}><Button style={{marginTop:"10px",marginLeft:"0%"}} color="red" onClick={this.handleYesDeleteUser}>Master reset</Button></Grid.Column>
              </Grid.Column>
          </Grid.Row>
        </Grid>
      <ToastContainer ref='asd'
        toastMessageFactory={ToastMessageFactory}
        className='toast-top-center' style={{marginTop:'8%'}}/>
    </div>
    );
  }
}
module.exports = MasterReset;
