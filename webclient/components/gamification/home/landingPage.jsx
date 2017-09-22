import React from 'react';
const {hashHistory} = require('react-router');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ThemeSelection = require('./themeSelection.jsx');
class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      theme : []
    };
    this.loadThemes = this.loadThemes.bind(this);
  }
  componentWillMount() {
    this.loadThemes();
  }
  // Loading all the data about that user
  loadThemes() {
    let context = this;
    let category = 'DPL';
    $.ajax({
      url: '/userGame/loadThemes',
      type: 'POST',
      data: {category: category},
      success: function(data) {
        // console.log('data', data);
        context.setState({theme: data});
      },
      error: function(err) {
       console.log('error', err);
      }
    });
  }

// Load home page
  loadHome() {
    hashHistory.push('/homePage');
  }
  render() {
    let landing;
    if (cookies.get('userType') == 'User') {
      landing = (
        (this.state.theme !== '' ? <ThemeSelection theme = {this.state.theme} /> : null)
      );
    } else {
      hashHistory.push('/');
    }
    return (
      <div>
        {landing}
      </div>
    );
  }
}
module.exports = MainComponent;
