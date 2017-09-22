import React, {Component} from 'react';
import AdminHome from '../menu/menu';
import './css/headerFooter.css';
class HeaderFooter extends Component {
  constructor () {
    super();
  }
  render() {
    //  @Mayanka : Admin homepage
    return (
      <div id="headerfixed">
        <AdminHome/>
      </div>
    );
  }
}
module.exports = HeaderFooter;
