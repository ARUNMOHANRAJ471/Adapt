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
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  //  @Mayanka : finding the menu selected by the user
  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  render() {
    const activeItem = this.state.activeItem;
    //  @Mayanka : UI for the sidebar and its content
    console.log("in side bar");
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
            <Icon name='translate' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            {/* <b>Customer journey</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='addDomain' active={activeItem === 'addDomain'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='translate' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/> */}
            <b>Category</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='addCategory' active={activeItem === 'addCategory'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='editCategory' active={activeItem === 'editCategory'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit
            </Menu.Item>
            <Menu.Item name='deleteCategory' active={activeItem === 'deleteCategory'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete
            </Menu.Item>
            <Menu.Item name='linkTheme' active={activeItem === 'linkTheme'} id='accordionMenu' onClick={this.handleItemClick}>
              Link Theme
            </Menu.Item>
            <Menu.Item name='delinkTheme' active={activeItem === 'delinkTheme'} id='accordionMenu' onClick={this.handleItemClick}>
              Delink Theme
            </Menu.Item>
          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='picture' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Theme</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='addTheme' active={activeItem === 'addTheme'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='editTheme' active={activeItem === 'editTheme'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit
            </Menu.Item>
            <Menu.Item name='deleteTheme' active={activeItem === 'deleteTheme'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete
            </Menu.Item>
            <Menu.Item name='linkStage' active={activeItem === 'linkStage'} id='accordionMenu' onClick={this.handleItemClick}>
              Link Stage
            </Menu.Item>
            <Menu.Item name='delinkStage' active={activeItem === 'delinkStage'} id='accordionMenu' onClick={this.handleItemClick}>
              Delink Stage
            </Menu.Item>


          </Accordion.Content>
          <Accordion.Title id='accordian' color='black'>
            <Icon name='picture' size='large' style={{
              float: 'left',
              color: '#737373',
              marginRight: '5px'
            }}/>
            <b>Stages</b>
          </Accordion.Title><Divider style={{
            marginBottom: '0px'
          }}/>
          <Accordion.Content >
            <Menu.Item name='addStage' active={activeItem === 'addStage'} id='accordionMenu' onClick={this.handleItemClick}>
              Add
            </Menu.Item>
            <Menu.Item name='editStage' active={activeItem === 'editStage'} id='accordionMenu' onClick={this.handleItemClick}>
              Edit
            </Menu.Item>
            <Menu.Item name='deleteStage' active={activeItem === 'deleteStage'} id='accordionMenu' onClick={this.handleItemClick}>
              Delete
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
