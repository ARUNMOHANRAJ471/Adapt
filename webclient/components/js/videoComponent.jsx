import React from 'react';
import {Segment} from 'semantic-ui-react';
import '../../../node_modules/react-html5video/dist/styles.css';

class VideoComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Segment>
        <div className='checking'>
          <iframe width="400" id="videoSize" src={this.props.video} frameBorder="0" allowFullScreen></iframe>
        </div>
      </Segment>
    );
  }
}

module.exports = VideoComponent;
