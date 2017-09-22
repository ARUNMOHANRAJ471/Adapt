import React from 'react';
import {Form, Input, Button, Grid, Icon} from 'semantic-ui-react';
import FileUploadProgress  from './fileUpload';
import {CSVLink, CSVDownload} from 'react-csv';

class IndexComponent extends React.Component {
  constructor() {
     super();
     this.state = {
       checkfile: true
     }
     this.checkfile = this.checkfile.bind(this);
 }
 checkfile(sender) {
    var validExts = new Array(".csv");
    var fileExt = sender.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " +
               validExts.toString() + " types.");
               sender.target.value = "";
               this.setState({checkfile:true});
      return false;
    }
    else {
      this.setState({checkfile:false});
      return true;
    }
}
 render() {
   //console.log("in upload");
   const csvData = [['name','category','description','errormsg'],
               ['login','devops', 'login description','error occured'],
               ['home page',	'test','home page description',	'error occured'],
               ['landing page',	'code',	'landing page description',	'error occured'],
               ['logout',	'environmentalsetup',	'logout description',	'error occured']
             ];
       return (
         <div style={{marginLeft:'5%'}}>
           <p>Add a .csv file to bulk upload component.</p><p>To download sample template <CSVLink data={csvData} filename={"ComponentTemplate.csv"}>click here</CSVLink></p>

          <div style={{'marginLeft': '15%', 'marginTop': '5%'}}>
              {/* <Form method='post' encType='multipart/form-data' action="/upload">
                <Input type='file' name='uploadedFile' accept='.csv' onChange={this.checkfile}/>
                 <Button color = 'red' type = 'submit' disabled={this.state.checkfile}><Icon name='upload'/>Upload</Button>
               </Form> */}
               <FileUploadProgress key='ex1' url='/uploadComponent' accept='.csv'
                  onProgress={(e, request, progress) => {
                    //console.log('progress', e, request, progress);
                  }}
                  onLoad={ (e, request) => {
                    //console.log('load', e, request);
                  }}
                  onError={ (e, request) => {
                    //console.log('error', e, request);
                  }}
                  onAbort={ (e, request) => {
                    //console.log('abort', e, request);
                  }}
                  onClick = {this.checkfile}
                  />
          </div>
            </div>
       );
   }
}
module.exports = IndexComponent;
