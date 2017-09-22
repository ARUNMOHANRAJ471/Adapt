import React, { Component } from 'react'
import { Button, Dimmer, Header, Image,Card,Popup} from 'semantic-ui-react'
import {Grid, Row, Col} from 'react-bootstrap';
class ProfilePageChild extends React.Component {
  state = {}
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })
  render() {
    const { active } = this.state
    const content = (
      <div>
        <Header as='h2' inverted id="CreditsDimmerContent">{this.props.title}</Header>
      </div>
    );
    var a = this.props.floatvalue;
    var b = this.props.widthvalue;
    var c = this.props.margintopvalue;
    return (
      <Card color={this.props.color} id = "ProfilechildPage" style={{width:b,marginTop:c}}>
         <Dimmer.Dimmable id = "CreditsImage"
           as={Image}
           dimmed={active}
           dimmer={{ active, content }}
           onMouseEnter={this.handleShow}
           onMouseLeave={this.handleHide}
           size='medium'
           src={this.props.imageUrl}
         />
         <Card.Content>
           <Popup
       trigger={<Card.Header id="CreditsHeaderInCard"><a href={"mailto:" + this.props.description} target="_blank" className="mailIdCreditsPage" style={{textDecoration:'none'}}>{this.props.name}</a></Card.Header>}
       content={<Card.Description style={{fontSize:'16px',color:'grey'}}>{this.props.description}</Card.Description>}
     />
         {/* <Card.Header id="CreditsHeaderInCard">{this.props.name}</Card.Header>
         <Card.Description><a href={"mailto:" + this.props.description} target="_blank" className="mailIdCreditsPage" >{this.props.description}</a></Card.Description> */}
       </Card.Content>
         </Card>

    )
  }
}
module.exports = ProfilePageChild;
