import React, {Component} from 'react';
import Content from '../sideBar/content';
import { Sidebar, Menu, Icon, Accordion, Container, Divider} from 'semantic-ui-react';
import './menu.css';
const {Link} = require('react-router');
export default class AdminMenu extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'adminHome'
    };
    this.handleItemClick = this.handleItemClick.bind();
  }
  //  @Mayanka : finding the menu selected by the user
  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  render() {
    const activeItem = this.state.activeItem;
    //  @Mayanka : UI for the sidebar and its content
    return (
      <div id='leftmenu'>
        <Container className='containerArrange'>
          <Sidebar as={Menu} className='sidebarTop' animation='slide along' visible={true} icon='labeled' vertical style={{
            paddingTop: '6%',
            width: '15%',
            marginLeft: '30px'
          }}>
          <Accordion style={{
            textAlign: 'left',
            paddingTop: '19%',
            marginLeft: '8%',
            marginRight: '3%'
          }}>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='find' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>View</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content>
            <Menu.Item name='viewData' active={activeItem === 'viewData'} id='accordionMenu' onClick={this.handleItemClick}>
              View Data
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='users' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Users</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content>
            <Menu.Item name='addUser' active={activeItem === 'addUser'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='editUser' active={activeItem === 'editUser'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit
            </Menu.Item>
            <Menu.Item name='deleteUser' active={activeItem === 'deleteUser'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete
            </Menu.Item>
            <Menu.Item name='bulkAddUser' active={activeItem === 'bulkAddUser'} id='accordionMenu' onClick={this.handleItemClick}>
              Bulk Add
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='translate' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Customer journey</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='addDomain' active={activeItem === 'addDomain'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='editDomain' active={activeItem === 'editDomain'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit
            </Menu.Item>
            <Menu.Item name='deleteDomain' active={activeItem === 'deleteDomain'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete
            </Menu.Item>
            <Menu.Item name='linkScenario' active={activeItem === 'linkScenario'} id='accordionMenu' onClick={this.handleItemClick}>
              Link User story
            </Menu.Item>
            <Menu.Item name='delinkScenario' active={activeItem === 'delinkScenario'} id='accordionMenu' onClick={this.handleItemClick}>
              Delink User story
            </Menu.Item>
            <Menu.Item name='toggleDomain' active={activeItem === 'toggleDomain'} id='accordionMenu' onClick={this.handleItemClick}>
              Enable/Disable
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='picture' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>User story</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='addScenario' active={activeItem === 'addScenario'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='editScenario' active={activeItem === 'editScenario'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit
            </Menu.Item>
            <Menu.Item name='deleteScenario' active={activeItem === 'deleteScenario'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete
            </Menu.Item>
            <Menu.Item name='addEditSeq' active={activeItem === 'addEditSeq'} id='accordionMenu' onClick={this.handleItemClick}>
              Add Sequence
            </Menu.Item>
            <Menu.Item name='editSeq' active={activeItem === 'editSeq'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit Sequence
            </Menu.Item>
            <Menu.Item name='deleteSeq' active={activeItem === 'deleteSeq'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete Sequence
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='chain' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Component</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='addComponent' active={activeItem === 'addComponent'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='editComponent' active={activeItem === 'editComponent'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit
            </Menu.Item>
            <Menu.Item name='deleteComponent' active={activeItem === 'deleteComponent'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete
            </Menu.Item>
            <Menu.Item name='bulkAddComponent' active={activeItem === 'bulkAddComponent'} id='accordionMenu' onClick={this.handleItemClick}>
              Bulk Add
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='setting' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Setting</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='changePassword' active={activeItem === 'changePassword'} id='accordionMenu' onClick={this.handleItemClick}>
              Change Password
            </Menu.Item>
            <Menu.Item name='masterReset' active={activeItem === 'masterReset'} id='accordionMenu' onClick={this.handleItemClick}>
              Master Reset
            </Menu.Item>
            <Menu.Item name='resetPassword' active={activeItem === 'resetPassword'} id='accordionMenu' onClick={this.handleItemClick}>
              Reset Password
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='money' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Accounts</b>
          </Accordion.Title>
          <Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='BFM' active={activeItem === 'BFM'} id='accordionMenu' onClick={this.handleItemClick}>
              BFM
            </Menu.Item>
            <Menu.Item name='Coach' active={activeItem === 'Coach'} id='accordionMenu' onClick={this.handleItemClick}>
              Coach
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='money' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Services</b>
          </Accordion.Title>
          <Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='Engineering Services' active={activeItem === 'Engineering Services'} id='accordionMenu' onClick={this.handleItemClick}>
              Engineering Services
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='info' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Session Info</b>
          </Accordion.Title>
          <Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='Session Info' active={activeItem === 'Session Info'} id='accordionMenu' onClick={this.handleItemClick}>
              Session Info
            </Menu.Item>
          </Accordion.Content>
        </Accordion>
      </Sidebar><br/><br/><br/>
      <Content sidebarItemSelected={activeItem} style={{
        marginLeft: '130px'
      }}/>
    <br/><br/>
  </Container>
  <nav className='navbar navbar-fixed-bottom' style={{
    zindex: '-1',
    backgroundColor: 'white'
  }}>
  <div id='ribbon' className='row footer-brand-colour'>
    <div className='fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
    <div className='fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
    <div className='fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
  </div>
  <p id='footerTextAllignment'>All Rights Reserved. &copy; Wipro Digital<a href='/download' id='logpage'>User Log</a>
  <Link to='/credits'>
  <a id='creditPage'>Credits</a>
</Link>
</p>
</nav>
</div>
);
}
}
module.exports = AdminMenu;
