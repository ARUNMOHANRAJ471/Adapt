import React from 'react';
import ReactTable from 'react-table';
import { Table } from 'semantic-ui-react';

import 'react-table/react-table.css';
// import Progress from 'react-progressbar';
export default class UserScenarioStatus extends React.Component{
  constructor(props) {
    super(props);

  };
  render() {
      const columns = [{
        Header: 'User Story',
        accessor: 'scenario_name' // String-based value accessors!
      }, {
        Header: 'Customer Journey',
        accessor: 'domain_name',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Owned By',
        accessor: 'assigned_to',
      }
    ]
      return (
        <div style={{marginLeft:"30px"}}>
          <h3>User Story Status</h3>
        <ReactTable
          data={this.props.SavedUserStats}
          columns={columns}
          defaultPageSize = {5}
        />
      </div>
    );
  }
}
