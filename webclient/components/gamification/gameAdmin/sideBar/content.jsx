import React from 'react';
import Dashboard from '../adminDashboard/mainPage/adminDashboard';
// import AddDomain from '../manageData/add/addDomain';
import AddCategory from '../manageData/add/addCategory';
import EditCategory from '../manageData/edit/editCategory';
import DeleteCategory from '../manageData/delete/deleteCategory';
import LinkTheme from '../manageData/edit/linkTheme';
import DelinkTheme from '../manageData/edit/delinkTheme';
import AddTheme from '../manageData/add/addTheme';
import EditTheme from '../manageData/edit/editTheme';
import DeleteTheme from '../manageData/delete/deleteTheme';
import LinkStage from '../manageData/edit/linkStage';
import DelinkStage from '../manageData/edit/delinkStage';
import AddStage from '../manageData/add/addStage';
import EditStage from '../manageData/edit/editStage';
import DeleteStage from '../manageData/delete/deleteStage';
export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      console.log("in content");
        // the sidebar menu contents
        switch (this.props.sidebarItemSelected) {
          case 'adminHome':
          {
              return <Dashboard/>;
          }
            // case 'addDomain':
            // {
            //   return <AddDomain/>;
            //   console.log("add doman");
            //     return (<div>gygac</div>);
            // }
            case 'addCategory':
            {
              return <AddCategory/>;

            }
            case 'editCategory':
            {
              return <EditCategory/>;

            }

            case 'deleteCategory':
            {
              return <DeleteCategory/>;

            }
            case 'addTheme':
            {
              return <AddTheme/>;

            }
            case 'editTheme':
            {
              return <EditTheme/>;

            }

            case 'deleteTheme':
            {
              return <DeleteTheme/>;

            }

            case 'linkTheme':
            {
              return <LinkTheme/>;

            }
            case 'delinkTheme':
            {
              return <DelinkTheme/>;

            }
            case 'linkStage':
            {
              return <LinkStage/>;

            }
            case 'delinkStage':
            {
              return <DelinkStage/>;

            }
            case 'addStage':
            {
              return <AddStage/>;

            }
            case 'editStage':
            {
              return <EditStage/>;

            }
            case 'deleteStage':
            {
              return <DeleteStage/>;

            }



        }
    }
}
