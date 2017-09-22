import React from 'react';
const {hashHistory, Link} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { Segment} from 'semantic-ui-react';
class Material extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    // console.log("kuhdkfgdfgsgd.........",this.props.item);
    return (
      <div>
        <Segment id='stagePosition'>
            {this.props.item}
          </Segment>
      </div>
    );
  }
}
module.exports = Material;
