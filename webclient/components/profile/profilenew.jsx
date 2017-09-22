import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
import Dropzone from 'react-dropzone';
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import { Dropdown } from 'semantic-ui-react';
import {Button, Image, Segment, Card, Header, Dimmer} from 'semantic-ui-react';
import request from 'superagent';
import Axios from 'axios';
import {path} from 'path';
import DimmerContent from './profilepageChild.jsx';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const cookies = new Cookies();
    var navbar = {
      marginBottom: 0,
      borderRadius: 0
    };
    /* Add a gray background color and some padding to the footer */
    var footer ={
      backgroundColor: '#f2f2f2',
      padding: '25px'
    };

    var btn = {
        whiteSpace:'wrap'
    };
    var image = {
        width:'187px',
        height:'186px',
        marginTop:'7%'
    };
    var color = {
      backgroundColor:'#337ab7'
    };

    var color1={
      backgroundColor:'#f2f2f2'
    };

    var closeButtoncolor1 = {
      backgroundColor:'#FF0000'
    };

    var dropZone ={
      'border-style':'none'
    };


    class ProfilePage extends React.Component {
    constructor(){
        super();
        this.state={
            userName:'',
            teamName:'',
            score:'',
            completedDomain:[],
            completedScenario:[],
            currentDomain:'',
            currentScenarioName:'',
            buttonDisable:true,
            buttonColour:false,
            empId:'',
            emailId:'',
            currentPwd:'',
            userEnterCurrentPwd:'',
            picture:'default_profile.jpg',
            newPwd:'',
            cnfrmNewPwd:'',
            statusInformation:[],
            allFiles: [],
            btnStatus:true,
            successMsg:false,
            domainArray: [],
            userDescription:'This is some text',
            btnStatusOfSubmit:true,
            userDescriptionUpdate:'',
            active:false,
            teamDetails:[],
            teamScore:0
        }
        this.changePasswordFunc = this.changePasswordFunc.bind(this);
        this.changeUserEnterPwd = this.changeUserEnterPwd.bind(this);
        this.changenewPwd = this.changenewPwd.bind(this);
        this.changecnfrmPwd = this.changecnfrmPwd.bind(this);
        this.changeEnterDescription = this.changeEnterDescription.bind(this);
        this.changeDescriptionFunc = this.changeDescriptionFunc.bind(this);
        this.checkForUpdateDescriptionAlert = this.checkForUpdateDescriptionAlert.bind(this);
        this.checkForSuccessfullyUploadedAlert = this.checkForSuccessfullyUploadedAlert.bind(this);
        this.checkForPasswordChangedSuccessfullyAlert = this.checkForPasswordChangedSuccessfullyAlert.bind(this);
        this.teamscore = this.teamscore.bind(this);

    }
    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
    changeUserEnterPwd(e){
      this.setState({userEnterCurrentPwd: e.target.value});
      if((this.state.currentPwd == this.state.userEnterCurrentPwd) && (this.state.newPwd == this.state.cnfrmNewPwd)){
        this.setState({btnStatus: false});
      }
    }
    changenewPwd(e){
      this.setState({newPwd: e.target.value});
      if((this.state.currentPwd == this.state.userEnterCurrentPwd) && (this.state.newPwd == this.state.cnfrmNewPwd)){
        this.setState({btnStatus: false});
      }
    }
    changecnfrmPwd(e){
      this.setState({cnfrmNewPwd: e.target.value});
      if((this.state.currentPwd == this.state.userEnterCurrentPwd) && (this.state.newPwd == this.state.cnfrmNewPwd)){
        this.setState({btnStatus: false});
      }
    }
    changeEnterDescription(e) {
      this.setState({userDescription: e.target.value});
      // //console.log('length is:',e.target.value.length);
      if(e.target.value.length != 0 && e.target.value.length < 140) {
        this.setState({btnStatusOfSubmit: false}, function(){

          // //console.log('inside if : ', this.state.btnStatusOfSubmit);
        });
      }
      else{
        this.setState({btnStatusOfSubmit: true});
      }
    }

    checkForUpdateDescriptionAlert() {
      //console.log("inside check for update description alert alert");
      let context = this;
      this.refs.asd.success(
        'Description updated successfully',
        '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
    }
    checkForSuccessfullyUploadedAlert() {
      //console.log("inside check for Successfully uploaded!!! alert");
      let context = this;
      this.refs.asd.success(
        'Photo uploaded successfully!!!',
        '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
    }
    checkForPasswordChangedSuccessfullyAlert() {
      //console.log("inside check for Password changed successfully alert");
      let context = this;
      this.refs.asd.success(
        'Password changed successfully',
        '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
    }

    changeDescriptionFunc() {
      let context = this;
      let description = context.state.userDescription;
      // //console.log('description', description);
      let data = {
        userId: cookies.get('empId'),
        description: description
      };
      $.ajax({
        url: '/profile/changeDescription',
        type: 'POST',
        data: data,
        success: function(data) {
          // //console.log(data);
          context.setState({userDescriptionUpdate: description},function(){
            // $('#editDescription').modal('hide');
            var a = this.state.teamDetails;
            a.map(function(item,index){
                if(item.empId === cookies.get('empId')){
                  item.userDescription = description;
                }
            });
            context.setState({teamDetails:a});
            context.checkForUpdateDescriptionAlert();
          });
        },
        error: function(err) {
          //console.log("Error occured", err);
        }
      });
      // $('#editDescription').modal('hide');
    }
     componentWillMount(){
       this.getallData();
       this.teamscore();
     }
     getallData() {
       let a = cookies.get('empId');
       let context = this;
      //  //console.log(this.state.userName);
         $.ajax({
             url:'/profile/view',
             type:'POST',
             data:{empId:a,
             userName: cookies.get('username'),
             userType: cookies.get('userType')},
             success:function(data){
              //  //console.log("in profile image ",JSON.stringify(data));
              if(data[0].picture == '' ){
                context.setState({picture:'default_profile.jpg'});
              }
              else{
                context.setState({picture:data[0].picture});
              }
                //  //console.log("data"+JSON.stringify(data));
                 context.setState({
                     userName: data[0].userName,
                     teamName:data[0].teamName,
                    //  score:data[0].score,
                     completedDomain:data[0].completedDomain,
                     currentDomain:data[0].currentDomain,
                     currentScenarioName:data[0].currentScenarioName,
                     empId:data[0].empId,
                     emailId:data[0].emailId,
                     currentPwd: data[0].password,
                     statusInformation:data[0].statusInformation,
                     //picture:data[0].picture,
                    //  completedScenario:data[0].completedScenario,
                     completedScenario:data[0].completedScenario,
                     userDescription: data[0].userDescription,
                     userDescriptionUpdate: data[0].userDescription,
                     btnStatus: true,
                     currPwdCheck: false,
                     newPwdcheck: false
                 })

                    //console.log("success");
                    context.getAllDetailsOfTeam();
                 },
                 error: function(err){
                   //console.log("error",err);
        }});
        // //console.log("sssss");
        // //console.log(this.state.completedScenario);
     }
     teamscore() {
       let context = this;
       //console.log("before ajax of team score");
       $.ajax({
         url:'/userDashboard/getTeamSc',
         type:'POST',
         async:false,
         data:{team:cookies.get('teamName')},
         success: function(data1)
         {
           //console.log('team scores with score',data1);
           context.setState({
             score: parseInt(data1)
           });

         }.bind(this),
         error: function(err)
         {
           ////console.log('error occurred on AJAX');
         }.bind(this)
       });
       $.ajax({
         url:'/users/getTeamScore',
         type:'POST',
         async:false,
         data:{teamName:cookies.get('teamName')},
         success: function(data1)
         {
           //console.log('team scores with score',data1.records[0]._fields[0].low);
           context.setState({
             teamScore: data1.records[0]._fields[0].low
           });

         }.bind(this),
         error: function(err)
         {
           ////console.log('error occurred on AJAX');
         }.bind(this)
       });

     }
  changePasswordFunc() {
    let context = this;
    let newPwd = this.state.newPwd;
    let empId = this.state.empId;
      $.ajax({
          url:'profile/changePassword',
          type:'POST',
          data:{empId:empId,newPwd: newPwd},
          success:function(data){
              // //console.log("data"+JSON.stringify(data));
              if(data == 'success'){
                context.setState({userEnterCurrentPwd:'',
                newPwd:'',
                cnfrmNewPwd:'',btnStatus:true, currentPwd:newPwd, successMsg:true})
                //console.log("success");
                context.checkForPasswordChangedSuccessfullyAlert();
              }
              },
              error: function(err){
                //console.log("error",err);
              }
            });
  }

  onImageDrop(files) {
       this.setState({allFiles: files[0],buttonDisable:false,buttonColour:true});
    }

  uploadImage()
  {
      let photo = new FormData();
      //console.log("inside upload",this.state.allFiles)
      photo.append('IMG', this.state.allFiles);
      let self = this;
      request.post('/profile/upload').send(photo).end(function(err, resp) {
          if (err) {
              console.error(err);
          } else {
            self.saveImage(resp.text);
          }
      });
    }

      saveImage(image) {
      let context = this;
      Axios({
          method: 'POST',
          url: 'profile/uploadImage',
          data: {
              picture: image, empId: cookies.get('empId')
          }
      }).then(function(response) {
        context.uploadSuccess(image);

        //console.log(response);
      }).catch(function(err) {
          //console.log(err);
      });
  }

    // { if image uploaded successfully}
  uploadSuccess(imagenew)
  {
    // this.setState({closeButton:false});
    // alert("Successfully uploaded!!!");
    this.checkForSuccessfullyUploadedAlert();
    this.setState({picture:imagenew});

  }

  getDomainName() {
    let context = this;
    // //console.log('gggg ',this.state.teamDetails);
    //console.log("INside get domain name func");
    this.state.statusInformation.map(function(item,index){
        if(item.status === 'In progress'){
          context.getDomain(item.scenarioId);
        }
    });
  }
    getDomain(scenarioId) {
    let arr = this.state.domainArray;
    //console.log("scenarioID"+ scenarioId);
    let context = this;
    let data = {
      scenarioId: scenarioId
    };
    $.ajax({
      url: '/profile/getDomain',
      type: 'POST',
      data: data,
      success: function(data) {
        // //console.log("get Domain " + data);
        arr.push(data);
        context.setState({domainArray: arr},function(){

        });
        // //console.log("the domain array is ", context.state.domainArray);
        // context.getAllDetailsOfTeam();
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }
  getAllDetailsOfTeam() {
    let context = this;
    // //console.log('this.state.teamName', this.state.teamName);
    let data = {
      teamName: this.state.teamName
    };
    $.ajax({
      url: '/profile/getDetailsOfTeam',
      type: 'POST',
      data: data,
      success: function(data) {
        // //console.log('sss', JSON.parse(data)[0]);
        // //console.log('qqqq ', typeof JSON.parse(data));
        var aa = JSON.parse(data);
        context.setState({teamDetails: aa},function(){
          // //console.log('aa',aa);
        });
        context.getDomainName();
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }

  render() {
    const { active } = this.state;
      let imagechange = null;
      let context = this;
      let pic=this.state.picture;
      //console.log("picture::::"+pic)
      //console.log(this.state.statusInformation);
      if(this.state.picture!='')
      {

      if(this.state.allFiles.preview == undefined)
      {
        //console.log("undefined");
        imagechange = (<Image src={require("../../../webserver/pictures/"+pic)} style={{
              height: 204
          }}/>);
          //console.log(pic);
      }
      else{
            //console.log("defined"+this.state.allFiles.preview);
            imagechange = (<Image src={this.state.allFiles.preview} style={{
                height: 204
            }}/>);
           }
           }
           else { imagechange = (
             <Image src={require("../../../webserver/pictures/default_profile.jpg")}
                     size='large' style= {{
                       height: 204
                   }}/>);
        }

    const completedDomain = this.state.completedDomain.map(function(item,index){
        return(
            // <tr><td>{item}</td></tr>
            <li>{item}</li>
        );
    });

     const completedScenario = this.state.completedScenario.map(function(item,index){
       let arr = [];
       //console.log('kkkkkkkkkk: ',item.scenarioIds);
       if(item.scenarioIds.length != 0){
       item.scenarioIds.map((item,index) => {
         //console.log('itemiiiii',item);
         if(item) {
           arr.push(<li>{item.name}(The Score is:{item.actualScore}/{item.maxScore})</li>);
         }
       });
     }
       return <p><ul>{arr}</ul></p>
     });
     let aa = this.state.domainArray;
     let xx = [];
     for (var i = 0; i < aa.length; i++) {
       if(xx.includes(aa[i])){

       } else {
         xx.push(aa[i]);
       }
     }
    //console.log("aaaaaaaa");
    //console.log(typeof this.state.domainArray);
    const incompleteDomain = xx.map(function(item,index){
      //console.log('iiiiiincDom',item);
        return(
               <li>{item}</li>
        );
    });

    const incompleteScenario = this.state.statusInformation.map(function(item,index){
        if(item.status === 'In progress'){
          return(
            <li>{item.scenarioName}</li>
          );
        }
    });
    let currentPwdMatch;
    let newPwdMatch;
    let crctFormat;
    let successMsgText;
    if(this.state.successMsg){
      // successMsgText = (<p className="fontGreen"> password changed successfully </p>);
    }
    if(this.state.userEnterCurrentPwd == ''){
      currentPwdMatch = '';
    } else if((this.state.userEnterCurrentPwd != this.state.currentPwd)){
      currentPwdMatch = (<p className="fontRed">current password mismatch</p>);
    }else{
      currentPwdMatch = '';
    }
    if(this.state.newPwd != this.state.cnfrmNewPwd){
      newPwdMatch = (<p className="fontRed">new password mismatch</p>);
    }else{
      newPwdMatch = '';
      if(this.state.newPwd != '' && this.state.cnfrmNewPwd != '')
      crctFormat = (<p className="fontGreen">Good to go..</p>);
    }
    //validation for current domain
    let a = '';
    if(this.state.currentDomain == ''){
      a = (<h5 className="currentDetails">Currently you have not selected any customer journey</h5>);
    }else {
      a = (<h5 className="currentDetails">{this.state.currentDomain}</h5>);
    }
      //validation for current Scenario
    let b = '';
    if(this.state.currentScenarioName == ''){
      b = (<h5 className="currentDetails">Currently you have not selected any user story</h5>);
    }else {
      b = (<h5 className="currentDetails">{this.state.currentScenarioName}</h5>);
    }

      //validation for completed domain and  scenario
    let f = '';
    if(completedDomain.length == 0){
      f = (<h5 style={{marginLeft: 10+'%'}}>You have not completed any customer journey</h5>);
    }else {
      f = (<h5 style={{marginLeft: 10+'%'}}>{completedDomain}</h5>);
    }
    let e = '';
    if(completedScenario.length == 0){
      //console.log("inside cs length if");
      e = (<h5 style={{marginLeft: 10+'%'}}>You have not completed any user story</h5>);
      // e = (<h5>Hiiii</h5>);
    }else {
      //console.log("inside cs length else");
      e = (<h5 style={{marginLeft: 10+'%'}}>{completedScenario}</h5>);
      // e = (<h5 style={{marginLeft: 10+'%'}}>hi</h5>);
    }

    //Validation for Incomplete domain and scenario
    let ics = '';
    let icd = '';

    if(incompleteDomain.length == 0){
      icd = (<h5 style={{marginLeft: 10+'%'}}>No incomplete customer journey</h5>);
    }else {
      icd = (<h5 style={{marginLeft: 10+'%'}}>{incompleteDomain}</h5>);
    }

    if(incompleteScenario.length == 0){
      ics = (<h5 style={{marginLeft: 10+'%'}}>No incomplete user story</h5>);
    }else {
      ics = (<h5 style={{marginLeft: 10+'%'}}>{incompleteScenario}</h5>);
    }

    const teamDetails = this.state.teamDetails.map(function(item, index){
      var ab = require('../../../webserver/pictures/'+item.picture);
      //console.log('pic ', ab);
      if(index == 0 || (index % 2==0)){
        return (
          <DimmerContent
             widthvalue = '15.2%'
             margintopvalue = '0%'
             color='red'
             name={item.userName}
             description={item.emailId}
             title = {item.userDescription}
             imageUrl= {ab}
             />
        )
      }
      else {
        return (
          <DimmerContent
             widthvalue = '15.2%'
             margintopvalue = '0.1%'
             color='red'
             name={item.userName}
             description={item.emailId}
             title = {item.userDescription}
             imageUrl= {ab}
             />
        )
      }
    });

//console.log("gfyghgvhgvhg");
let ProfilePage;
if (cookies.get('userType') == "User" || cookies.get('userType') == "Pair") {
  ProfilePage=(<div>
  <Segment.Group raised horizontal style={{margin: "6% 17% 1% 17%",height:"100%",backgroundColor:"#F2F2F2",border:'2px solid rgba(34,36,38,.15)'}}>

   {/* <Segment.Group horizontal style={{borderColor:"#F2F2F2",border:"none"}}> */}
    <Segment style={{borderColor:"#F2F2F2"}}>
      <center>
      <div className="profile-header-img profileHeaderImage" style={{textAlign:"center",marginLeft:"45%"}}>
        <a data-toggle="modal" data-target="#editProfile"  className="outline">
          <img className="img-circle circleImage" src={require("../../../webserver/pictures/"+this.state.picture)} alt='../../../webserver/pictures/default_profile.jpg' style={image}/>
        </a>
        <h3 className="profileName" style={{color:"#3e9be0"}}>{this.state.userName} </h3>
        <h4 className="mailIdProfile" style={{marginBottom:'7%',fontSize:'16px'}}> {this.state.emailId}</h4>
    </div>
    </center>

    <div className="modal fade" id="editProfile" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">Edit Profile</h4>
                    </div>
                <div className="modal-body">
                    <br/>
                    <b><i><center><p>Click on the image to change your profile image</p><br/></center></i></b>
                    <center>
                    <Image wrapped size='small'  >
                                <Dropzone multiple={true} accept={'image/*'} style={dropZone}
                                   onDrop={this.onImageDrop.bind(this)} >
                                       {imagechange}
                                    </Dropzone>
                                    <br/>
                                    {this.state.buttonColour?
                                      <Button disabled={this.state.buttonDisable} style={color} onClick={this.uploadImage.bind(this)}>Upload Photo
                                    </Button>:
                                    <Button disabled={this.state.buttonDisable} style={color1} onClick={this.uploadImage.bind(this)}>Upload Photo
                                  </Button>}
                    </Image>
                    </center>
                </div>
                <div className="modal-footer">
                    <center>
                    {this.state.closeButton?<button type="button" className="btn btn-circle btn-default circleButton outline"  data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>:
                    <button type="button" className="btn btn-circle btn-default circleButton outline"  data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>}
                    </center>
                </div>
            </div>
        </div>
    </div>

    </Segment>

   <Segment.Group vertical style={{marginTop:"1%",borderColor:"#F2F2F2",marginLeft:'26%'}} id="segment_vertical">
   <Segment.Group horizontal>

      <Segment style={{borderColor:"#F2F2F2", marginLeft:'-12%'}}>
        <Card style={{textAlign:'left',backgroundColor:"#F2F2F2"}}>
          <Card.Content>
          <Card.Content header='Description' >
            <b style={{fontSize:'150%'}}>Description</b>
            <button style={{float:'right'}} type="button" className="btn btn-link b1"
              data-toggle="modal" data-target="#editDescription">
                <span className="glyphicon glyphicon-pencil"></span>
              </button>
          {/* <Card.Content description={this.state.userDescriptionUpdate} /> */}
          <Card.Content>
            <Card.Description style={{overflow: "hidden"}}><p>{this.state.userDescriptionUpdate}</p></Card.Description>
          </Card.Content>
          </Card.Content>

      </Card.Content>
    </Card>
    <div className="modal fade" id="editDescription" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div className="modal-dialog" id="asd">
           <div className="modal-content">
               <div className="modal-header">
                   <h3 className="modal-title" id="myModalLabel" style={{fontWeight:"bold"}}>Edit Description</h3>
                   </div>
               <div className="modal-body">
                 {/* <label>Edit Your description here</label>
                 <textarea value={this.state.userDescription} onChange={this.changeEnterDescription}></textarea> */}
                 <form>
                   <div className="form-group">
                     <label htmlFor="textarea" style={{fontSize:'120%'}}>Edit Your description here:</label><br/><br/>
                     <textarea value={this.state.userDescription} id="textarea" onChange={this.changeEnterDescription} className="form-control" placeholder="Enter Description"></textarea>
                   {/* <input type="textarea" required onChange={this.changeUserEnterPwd} value = {this.state.userEnterCurrentPwd} className="form-control" id="pwd" placeholder="Enter current password" name="pwd"/> */}
                   </div>
                 </form>
                <button type="button" className="btn btn-success"  data-dismiss="modal" disabled={this.state.btnStatusOfSubmit} onClick={this.changeDescriptionFunc}>Submit</button>
               </div>
               <div className="modal-footer">
                   <center>
                     <button type="button" className="btn btn-circle btn-default circleButton outline" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
                   </center>
               </div>
           </div>
       </div>
   </div>

      </Segment>
      <Segment id="description">
        <div  className="col-padding colPaddingInProfile">
          <button data-toggle="modal" data-target="#TeamName" type="button" style={btn} id = "twoButtonInProfile" className="outline btn btn-circle btn-xl circleButton">
            <br/>
            Team name
            <p style={{textAlign:'center'}}>{this.state.teamName}</p>
            Score
            <p style={{textAlign:'center'}}>{this.state.score - this.state.teamScore}</p>
          </button>
        </div>

        <div className="modal fade" id="TeamName" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
           <div className="modal-dialog" style={{width:'90%',height:'14%'}}>
               <div className="modal-content">
                   <div className="modal-header">
                       <h3 className="modal-title" id="myModalLabel" style={{fontWeight:"bold",float:"left"}}>Team {this.state.teamName}</h3>
                       <button type="button" style={{float:'right'}} className="btn btn-circle btn-default circleButton outline" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
                       </div>
                   <div className="modal-body">
                     <div>
                       <Card.Group itemsPerRow={4} style={{marginLeft:'1%',marginRight:'-20%',marginTop:'0.1%'}}>
                         {teamDetails}
                  </Card.Group>
                     </div>
                   </div>
                   <div className="modal-footer removeFooterBorder">
                      <p hidden>In the footer</p>
                   </div>
               </div>
           </div>
       </div>
      </Segment>

     </Segment.Group>
     <Segment.Group horizontal style={{borderColor:"#F2F2F2"}}>
       <div className="colorgraph" className="multiColorInProfile"></div>
       <div className="container-fluid bg-3 text-center ">
       <div className="row " style = {{marginTop:"3%"}}>
       <div className="col-xs-9 col-sm-2" style = {{marginLeft:"6%"}}>
       <button data-toggle="modal" data-target="#completedDomain"  className="outline btn-circle-lg btn-success tabButtonProfile">Completed details </button>
     </div>
     <div className="col-xs-9 col-sm-2" style = {{marginLeft:"3%"}}>
       <button data-toggle="modal" data-target="#currentDomain"  className="outline btn-circle-lg btn-warning tabButtonProfile">Current details</button>
     </div>
     <div className="col-xs-9 col-sm-2" style = {{marginLeft:"3%"}}>
       <button data-toggle="modal" data-target="#incomplete"  className="outline btn-circle-lg btn-danger tabButtonProfile"> Incomplete details </button>
     </div>
     <div className="col-xs-9 col-sm-2" style = {{marginLeft:"3%"}}>
       <button data-toggle="modal" data-target="#changePassword" className="outline btn-circle-lg btn-primary  tabButtonProfile">Change password </button>
     </div>
   </div>
     </div>

     <div className="modal fade" id="completedDomain" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
         <div className="modal-dialog">
             <div className="modal-content">
                 <div className="modal-header">
                     <h3 className="modal-title" id="myModalLabel" style={{fontWeight:"bold"}}>Completed details</h3>
                     </div>
                 <div className="modal-body">
                     <center>
                     <br/>
                     <h5 className="media-heading"><h4 style={{textAlign:"left",fontWeight:"bold"}}>Customer journey </h4>{f}</h5>
                     <h5 className="media-heading"><h4 style={{textAlign:"left",fontWeight:"bold"}}>User story </h4>{e}</h5>
                     </center>
                 </div>
                 <div className="modal-footer">
                     <center>
                     <button type="button" className="btn btn-circle btn-default circleButton outline" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
                     </center>
                 </div>
             </div>
         </div>
     </div>


         <div className="modal fade" id="currentDomain" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
             <div className="modal-dialog">
                 <div className="modal-content">
                     <div className="modal-header">
                         <h3 className="modal-title" id="myModalLabel" style={{fontWeight:"bold"}}>Current details</h3>
                         </div>
                     <div className="modal-body">
                         <center>
                         <h5 className="media-heading domainScenarioModal"><h4 style={{textAlign:"left",fontWeight:"bold"}}>Customer journey </h4> {a} </h5>
                         <h5 className="media-heading domainScenarioModal"><h4 style={{textAlign:"left",fontWeight:"bold"}}>User story </h4>{b}</h5>
                         </center>
                     </div>
                     <div className="modal-footer">
                         <center>
                         <button type="button" className="btn btn-circle btn-default circleButton outline" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
                         </center>
                     </div>
                 </div>
             </div>
         </div>
         <div className="modal fade" id="incomplete" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="myModalLabel" style={{fontWeight:"bold"}}>Incomplete details</h3>
                        </div>
                    <div className="modal-body">
                      <h5 className="media-heading domainScenarioModal"><h4 style={{textAlign:"left",fontWeight:"bold"}}>Customer journey </h4> {icd} </h5>
                      <h5 className="media-heading domainScenarioModal"><h4 style={{textAlign:"left",fontWeight:"bold"}}>User story </h4>{ics}</h5>

                    </div>
                    <div className="modal-footer">
                        <center>
                        <button type="button" className="btn btn-circle btn-default circleButton outline" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
                        </center>
                    </div>
                </div>
            </div>
        </div>

         <div className="modal fade" id="changePassword" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
             <div className="modal-dialog">
                 <div className="modal-content">
                     <div className="modal-header">
                         <h4 className="modal-title" id="myModalLabel">Change Password</h4>
                         </div>
                     <div className="modal-body">
                         {/* <center> */}
                         <br/>
                         <div className="container">

                             <form>
                               <div className="form-group">
                                 <label htmlFor="pwd"> Current Password:</label>
                               <input type="password" required onChange={this.changeUserEnterPwd} value = {this.state.userEnterCurrentPwd} className="form-control" id="pwd" placeholder="Enter current password" name="pwd"/>
                               {currentPwdMatch}
                               </div>
                                 <div className="form-group">
                                   <label htmlFor="pwd2">New Password:</label>
                                   <input type="password" required  onChange={this.changenewPwd} value = {this.state.newPwd}  ref="newPwd" className="form-control" id="pwd2" placeholder="Enter new password" name="pwd2"/>
                                 </div>
                                   <div className="form-group">
                                     <label htmlFor="pwd3">Confirm Password:</label>
                                     <input type="password" required  onChange={this.changecnfrmPwd} value = {this.state.cnfrmNewPwd}  ref="cnfrmNewPwd" className="form-control" id="pwd3" placeholder="Enter new password" name="pwd3"/>
                                     {newPwdMatch}{crctFormat}
                                   </div>
                             </form>
                         <button data-dismiss="modal" onClick={this.changePasswordFunc} disabled={this.state.btnStatus} className="btn btn-success">Change Password</button>
                           {/* {successMsgText} */}
                           </div>
                         {/* </center> */}
                     </div>
                     <div className="modal-footer">
                         <center>
                         <button type="button" className="btn btn-circle btn-default circleButton outline" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
                         </center>
                     </div>
                 </div>
             </div>
         </div>

     </Segment.Group>
     </Segment.Group>
   {/* </Segment.Group> */}
 </Segment.Group>
 <ToastContainer ref='asd'
   toastMessageFactory={ToastMessageFactory}
   className='toast-top-center' style={{marginTop:'8%'}}/>
   <nav className="navbar navbar-fixed-bottom" id="footer" >
     <div id = "ribbon" className="row footer-brand-colour">
           <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
           <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
           <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
       </div>
          <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
        <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
      </nav>
      <img className="navbar-fixed-bottom navbar-inverse"  src="./img/white_background.jpg" id="backgroundland"/>
</div>);
}
else{
    hashHistory.push('/');
}
        return (
          <div>
            {ProfilePage}
          </div>
  );
  }
  }
  module.exports = ProfilePage;
