import React from 'react';
const {hashHistory, Link} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { Card, Label, Menu, Segment} from 'semantic-ui-react';
class ThemeSelection extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.selectTheme = this.selectTheme.bind(this);
  }
  selectTheme() {
    hashHistory.push('/theme?theme=' + this.state.aid);
  }
  render() {
    let theme;
    let context = this;
    if (cookies.get('userType') == 'User') {
      theme = context.props.theme.map((item) => {
       return (<Card raised={true} color = 'teal' style={{marginLeft: '1%', marginRight: '1%', width: '23%', paddingTop: '2%', paddingBottom: '2%', textAlign: 'center', textDecoration: 'none'}}>
         <Link to= {'/theme?theme=' + item.theme} style={{textDecoration: 'none'}}>
            <Card.Header>
                  <b>{item.theme}</b>
            </Card.Header>
            <div>
      <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%', lineHeight: '100%'}}>
        40%
      </div>
    </div><br/><br/>
    <div>
  <div>
  <Menu compact>
    <Menu.Item as='a'>
    <Segment>1</Segment>
    <h5 style={{marginLeft: '10%'}}>Stage1</h5>
      <Label color='green' floating>22</Label>
    </Menu.Item>
  </Menu>
  <Menu compact style={{marginLeft: '10%'}}>
    <Menu.Item as='a'>
    <Segment>2</Segment>
    <h5 style={{marginLeft: '10%'}}>Stage2</h5>
      <Label color='green' floating>22</Label>
    </Menu.Item>
  </Menu>
  </div>
  <div>
  <Menu compact style={{marginTop: '7%'}}>
    <Menu.Item as='a'>
    <Segment>3</Segment>
    <h5 style={{marginLeft: '10%'}}>Stage3</h5>
      <Label color='green' floating>22</Label>
    </Menu.Item>
  </Menu>
  <Menu compact style={{marginLeft: '10%', marginTop: '7%'}}>
    <Menu.Item as='a'>
    <Segment>4</Segment>
    <h5 style={{marginLeft: '10%'}}>Stage4</h5>
      <Label color='green' floating>22</Label>
    </Menu.Item>
  </Menu>
  </div>
  </div>
          </Link>
       </Card>);
     });
    } else {
      hashHistory.push('/');
    }
    return (
      <div>
        <Card.Group style={{marginTop: '3%', marginLeft: '1%', marginRight: '1%'}} itemsPerRow={4}>{theme}</Card.Group>
      </div>
    );
  }
}
module.exports = ThemeSelection;
