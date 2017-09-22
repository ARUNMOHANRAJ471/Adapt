import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import DimmerContent from './CreditsPageChild';
const {Link} = require('react-router');

class CreditsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      image1: '',
      active: false
    };
  }

  render() {
    return (

      <div style={{
        backgroundColor: 'white'
      }}>

        <Grid>
          <h1 style={{
            textAlign: 'center',
            marginTop: '3%'
          }}>THE TEAM A</h1>
          <Row>
            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='red' name='Aashika' description='aashika.s61@wipro.com'
                 title='I am an honest and determined person who enjoys working and learning new
                  things. I also like to spend my free time reading books.'
                  imageUrl='./../../img/aashika.jpg' id='heightCredit:'
                  extras1='Skills' skill1='ReactJs' skill2='Jenkins' skill3='MongoDB'/>
            </Col>
            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>

              <DimmerContent color='purple' name='Aditi Aggarwal'
                description='aditi.aggarwal@wipro.com' title='A certified INFP,
                 I am a travel enthusiast and loves knowing about different cultures.
                  I have travelled across 16 countries so far and plan to cover the rest
                   in my lifetime.' imageUrl='/../../img/aditi.jpg' id='heightCredit'
                   extras1='Skills' skill1='Agile' skill2='Kanban' skill3='Jira'/>
            </Col>

            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='orange' name='Arpita Das' description='arpita.das7@wipro.com'
                 title='If you cannot fly then run, if you cannot run then walk, if you cannot
                  walk then crawl, but whatever you do you have to keep moving forward.'
                   imageUrl='/../../img/Arpita.jpg' id='heightCredit' extras1='Skills' skill1='Java'
                    skill2='Spring' skill3='Agile'/>
            </Col>

            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='brown' name='Arun Mohan Raj'
                 description='arun.balasekar@wipro.com' title='I love to code,
                  I love challenges but what I live for is challenging codes. But in my leisure
                   time I enjoy batting for my team.' imageUrl='/../../img/arun.jpg'
                    id='heightCredit' extras1='Skills' skill1='ReactJS' skill2='Neo4j DB'
                     skill3='AngularJS' skill4='MERN Stack'/>
            </Col>

            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='olive' name='Aswini H '
                description='aswini.h59@wipro.com' title=' I am a jovial person who
                 tries to find the happiness in small moments of life. I love making
                  friends and firmly believe that life becomes less complicated if you
                   smile a little more.' imageUrl='/../../img/Aswini_H.jpg'
                    id='heightCredit' extras1='Skills' skill1='ReactJs' skill2='NodeJs'
                     skill3='ExpressJs'/>
            </Col>
            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='pink' name='Aswini K' description='aswini.k56@wipro.com' title='Challenges are what make life intresting and overcoming them is what makes life meaningful. With this motto I face all the challenges and try to overcome them with all the zeal.' imageUrl='/../../img/Aswini_K.jpg' id='heightCredit' extras1='Skills' skill1='ReactJs' skill2='NodesJs' skill3='MongoDB'/>
            </Col>

            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='pink' name='Keerthana' description='keerthana.n10@wipro.com' title='My passion is creativity and I try to bring the same in my work. I enjoy taking challenges and keep myself involved in the team as I believe Together Everyone Achieves More.' imageUrl='/../../img/keerthana.jpg' id='heightCredit' extras1='Skills' skill1='ReactJs' skill2='NodeJs' skill3='MongoDB'/>
            </Col>
            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='orange' name='Keerthana priya' description='keerthanapriya.r11@wipro.com' title='I am a fun loving person with an optimistic approach towards life and problems.' imageUrl='/../../img/keerthanapriya.jpg' id='heightCredit' extras1='Skills' skill1='ReactJs' skill2='NodeJs' skill3='MongoDB'/>
            </Col>
            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='green' name='Mayanka' description='mayanka.b80@wipro.com' title='The passion and vigor to be a better version of me ,rises ,with every morning.The goal is celebrate life and enjoy being myself.' imageUrl='/../../img/mayanka.jpg' id='heightCredit' extras1='Skills' skill1='MERN stack' skill2='Neo4j' skill3='Core Java' skill4='Javascript' skill5='Redis' skill6='SQL'/>
            </Col>
            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='blue' name='Navin Prasad' description='navin.prasad1@wipro.com' title='I am an energetic and dynamic person who likes to explore in new technologies. I am also a cricket enthusiast and spend my weekends in the ground.' imageUrl='/../../img/navinprasad.jpg' id='heightCredit' extras1='Skills' skill1='SonarQube' skill2='NodeJs' skill3='MongoDB'/>
            </Col>

            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='brown' name='Sundaresan' description='sundaresan.v41@wipro.com' title='When life throws you lemons, make lemonade! I am a happy-go-lucky person and never let go of a single opportunity to make people around me smile.' imageUrl='/../../img/Sundaresan.jpg' id='heightCredit' extras1='Skills:' skill1='ReactJs' skill2='NodeJs' skill3='MongoDB'/>
            </Col>

            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='olive' name='Tarun' description='thota.tarun1@wipro.com' title='I am a true Barcelona follower who likes to play badminton! I believe I am still a learner and trying to absorb as much knowledge as I can.' imageUrl='/../../img/tarun.jpg' id='heightCredit' extras1='Skills:' skill1='NodeJs' skill2='Core Java' skill3='MongoDB'/>
            </Col>
            <Col xs={2} sm={3} md={4} lg={4} id='colSize'>
              <DimmerContent color='violet' name='Threkashri' description='threkashri.p35@wipro.com' title='My friends call me Ms DB beacuse of my intrigueness towards database and its applications. I also enjoy playing Kho-Kho and participate in athletics.' imageUrl='/../../img/threkashri.jpg' id='heightCredit' extras1='Skills:' skill1='Neo4j' skill2='MERN stack' skill3='CoreJava'/>
            </Col>

          </Row>
        </Grid>
        <nav className='navbar' id='footer' style={{
          marginBottom: '0px'
        }}>
          <div id='ribbon' className='row footer-brand-colour'>
            <div className='fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
            <div className='fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
            <div className='fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4'/>
          </div>
          <p id='footerTextAllignment'>All Rights Reserved. &copy; Wipro Digital
            <Link to='/credits'>
              <a id='creditPage'>Credits</a>
            </Link>
          </p>
        </nav>
      </div>
    );
  }
}
module.exports = CreditsPage;
