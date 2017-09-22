import React from 'react';
import {Accordion, Segment } from 'semantic-ui-react';
class SequenceAccordion extends React.Component {
  constructor() {
    super();
  }
  //  Mayanka : Mapping the sequences to an Accordion
  render() {
    let i = 0;
    let arr = this.props.correctSequence;
console.log("correctSequence in seqAcc: ",arr);
    if(arr[0] == undefined || arr[0] == '') {
      arr.shift();
    }
    function problemStatement() {
      let seqTitle = 'Sequence';
      while (i < arr.length) {
        ++i;
        return seqTitle + ' ' + i;
      }
    }
    let a = 0;
    function problemDescription() {
      let mapData = '';
      if(arr.length > 0) {
        let arrData = arr[a];
        console.log("arrData: ",arrData);
        mapData = arrData.map(function(item) {
          return (<li style={{textAlign: 'left', color: 'black'}}>{item.header}</li>);
        });
        a = a + 1;
      }
      return (
        <div><ol>{mapData}</ol></div>
      );
    }
    const panels = _.times(arr.length , () => ({title: problemStatement(), content: problemDescription()}));
    let container = <Accordion panels={panels} styled fluid/>;
    return (
      <div id='Sequence' style={{marginTop: '30%', textAlign: 'left'}}>
        {this.props.correctSequence != ''
        ?
        <Segment>
          {container}
        </Segment> : null}
      </div>
    );
  }
}
module.exports = SequenceAccordion;
