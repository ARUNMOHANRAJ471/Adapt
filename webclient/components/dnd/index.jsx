import React, { Component } from 'react';
import Container from './Container';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class DustbinSingleTarget extends Component {
  render() {
    let containerPage;
    if(cookies.get('userType') == "User" || cookies.get('userType') == "Pair") {
      containerPage =(<Container />)
    }
    else{
      hashHistory.push('/');
    }
    return (
      <div>
        {containerPage}
      </div>
    );
  }
}
