import React from 'react'
import {Dimmer, Header, Image, Card, Grid} from 'semantic-ui-react'

class CreditsPageChild extends React.Component {
  state = {}
  handleShow = () => this.setState({active: true})
  handleHide = () => this.setState({active: false})
  render() {
    const {active} = this.state
    const content = (
      <div>
        <Header as='h2' inverted id='CreditsDimmerContent'>{this.props.title}</Header>
      </div>
    )
    const dim = (
      <div >
        <Card color={this.props.color} id='CardsCreditsPage' style={{
          width: '80%'
        }}>
          <Dimmer.Dimmable id='CreditsImage' as={Image} dimmed={active} dimmer={{
            active,
            content
          }} onMouseEnter={this.handleShow} onMouseLeave={this.handleHide} size='medium' src={this.props.imageUrl}>
            <Dimmer active={active} style={{
              width: '100%',
              height: '100%'
            }}>{content}</Dimmer>

            <Grid columns={2} style={{
              height: '100%',
              width: '120%'
            }}>

              <Grid.Column>
                <Image src={this.props.imageUrl} style={{
                  height: 'auto',
                  width: 'auto'
                }}/>
              </Grid.Column>
              <Grid.Column style={{
                height: '170px'
              }}>
                <h4 style={{
                  marginTop: '10px',
                  fontStyle: 'italic',
                  fontWeight: 'normal'
                }}>
                  {this.props.extras1}</h4>
                <h5 stye={{
                  fontWeight: 'normal'
                }}>{this.props.skill1}</h5>
                <h5>{this.props.skill2}</h5>
                <h5>{this.props.skill3}</h5>
                <h5>{this.props.skill4}</h5>
                <h5>{this.props.skill5}</h5>
              </Grid.Column>
            </Grid>

          </Dimmer.Dimmable>
          <Card.Content>
            <Card.Header id='CreditsHeaderInCard' style={{
              marginLeft: '10%'
            }}>{this.props.name}</Card.Header>
            <Card.Description id='descrip' style={{
              color: '#5D6D7E',
              marginLeft: '10%'
            }}>
              <a href={'mailto:' + this.props.description} target='_blank'
                 className='mailIdCreditsPage'>{this.props.description}</a>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
    return (
      <div >
        {dim}
      </div>
    );
  }
}
module.exports = CreditsPageChild;
