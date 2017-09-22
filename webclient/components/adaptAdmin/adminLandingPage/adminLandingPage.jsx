import React from 'react';
const {hashHistory} = require('react-router');
import HeaderFooter from '../headerFooter/headerFooter';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class AdminLandingPage extends React.Component {
  constructor () {
    super();
  }
  render() {
    // @Mayanka : Homepage of admin
    let adminPage;
    if(cookies.get('userType') === 'Admin') {
      adminPage = <HeaderFooter/>;
    }
    else{
      adminPage = '';
      hashHistory.push('/');
    }
    return (
      <div>
        {adminPage}
      </div>
    );
  }
}
module.exports = AdminLandingPage;
