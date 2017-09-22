import React, {Component} from 'react';
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class MenuExampleContentProp extends Component {
  constructor () {
        super();
    }
  logOut() {
    cookies.remove('username');
      cookies.remove('userType');
        cookies.remove('empId');
          cookies.remove('loginId');
        hashHistory.push('/');
  }
  profile() {
    hashHistory.push('/profile');
  }
  userDashboard() {
    hashHistory.push('/userDashboard');}
    clickChange() {
        this.props.restaurantData(this.state.domain);
    }
    render() {
      let footerpage;
        footerpage = (
           <div>
      <nav className="navbar" id="footer" >
       <div id = "ribbon" className="row footer-brand-colour">
             <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
             <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
             <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
         </div>
            <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
          <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
        </nav>
        </div>
      );

        return (
          <div>
            {footerpage}
          </div>
        )
    }
}

module.exports = MenuExampleContentProp;
