import React from 'react';
const {hashHistory} = require('react-router');
import { Card } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class ContactAdmin extends React.Component {
   constructor() {
       super();
     }
     componentWillUnmount(){
       cookies.remove('username');
       cookies.remove('userType');
     }
     render(){
       let ContactAdminPage;
         ContactAdminPage = (<div>
         <img className="loginImage" src="../img/contactAdmin.jpg"/></div>

     );
       return (<div><br/>
         {ContactAdminPage}
         </div>);
     }
   }


module.exports = ContactAdmin;
