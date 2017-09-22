import React from 'react';
import { Grid} from 'semantic-ui-react';
import Container from '../../dndAdmin/Container';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddScenario extends React.Component {
  constructor() {
    super();
    this.state = {
      componentArray: [],
      correctSequence: ''
    };
    this.getAllComponents = this.getAllComponents.bind(this);
    this.getId = this.getId.bind(this);
    this.supportChange = this.supportChange.bind(this);
    this.validateData = this.validateData.bind(this);
    this.addNewScenario = this.addNewScenario.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForAddedNewScenarioAlert = this.checkForAddedNewScenarioAlert.bind(this);
  }
  getId(id) {
    let dataInState = this.state.correctSequence;
    let x = dataInState + id + '-';
    this.setState({correctSequence: x});
  }
  getAllComponents() {
    let context = this;
    let arrOfComponent = [];
    $.ajax({
      url: '/component/getAllComponents',
      type: 'GET',
      success: function(res) {
        for (let i = 0; i < res.records.length; i = i + 1) {
          arrOfComponent.push({content: res.records[i]._fields[0].properties.name, id: res.records[i]._fields[0].identity.low});
        }
        context.setState({componentArray: arrOfComponent});
      },
      error: function(err) {
      }
    });
  }
  componentDidMount() {
    this.getAllComponents();
  }
  supportChange(e) {
    this.setState({correctSequence: e.target.value});
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
  checkForAddedNewScenarioAlert() {
    this.refs.asd.success(
      'User story updated successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  validateData(e) {
    e.preventDefault();
    let scenarioName = this.refs.scenarioName.value;
    let probStmt = this.refs.probStmt.value;
    let crctSeq = this.state.correctSequence;
    let outputValue = this.refs.outputValue.value;
    let evalFunc = this.refs.evalFunc.value;
    if(scenarioName === '' || probStmt === '' || crctSeq === '' || outputValue === '' || evalFunc === '') {
      this.checkForEmptyAlert();
    }
    else{
      let crctSeq = this.state.correctSequence;
      let crctSeq1 = crctSeq.slice(0, crctSeq.length - 1);
      this.addNewScenario(scenarioName, probStmt, crctSeq1, outputValue, evalFunc);
    }
  }
  addNewScenario(scenarioName, probStmt, crctSeq, outputValue, evalFunc) {
    let context = this;
    $.ajax({
      url: '/component/addNewScenario',
      type: 'POST',
      data: {scenarioName: scenarioName, probStmt: probStmt, crctSeq: crctSeq, outputValue: outputValue, evalFunc: evalFunc},
      success: function(response)
      {
        context.checkForAddedNewScenarioAlert();
        this.refs.scenarioName.value = '';
        this.refs.probStmt.value = '';
        context.setState({correctSequence: ''});
        this.refs.outputValue.value = '';
        this.refs.evalFunc.value = '';
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
          <Grid.Column width={14} className="rightAdd">
            <Container page={this.props.page}/>
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
