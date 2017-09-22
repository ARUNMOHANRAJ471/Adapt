import React from 'react';
import AddDomain from '../manageData/add/addDomain';
import AddScenario from '../manageData/add/addScenario';
import AddComponent from '../manageData/add/addComponent';
import ViewData from '../manageData/viewData/viewData';
import LinkScenario from '../manageData/edit/linkScenario';
import DelinkScenario from '../manageData/edit/delinkScenario';
import EditScenario from '../manageData/edit/editScenario';
import EditDomain from '../manageData/edit/editDomain';
import EditComponent from '../manageData/edit/editComponent';
import AddEditSeq from '../manageData/edit/editScenarioComps';
import DeleteDomain from '../manageData/delete/deleteDomain';
import DeleteScenario from '../manageData/delete/deleteScenario';
import DeleteComponent from '../manageData/delete/deleteComponent';
import BulkAddComponent from '../../uploadCSV/uploadComponent';
import UploadCsv from '../../uploadCSV/uploadCSV';
import AddUser from '../users/addUser';
import EditUser from '../users/editUser';
import DeleteUser from '../users/deleteUser';
import DeleteSeq from '../manageData/delete/deleteSeq';
import Toggle from '../manageData/hideDomain/hideDomain';
import Dashboard from '../adminDashboard/mainPage/adminDashboard';
import ChangePassword from '../changePassword/changePassword';
import MasterReset from '../masterReset/masterReset';
import ResetPassword from '../resetPassword/resetPassword';
import Penalise from '../penalise/penalise';
import EnggServices from '../enggServices/enggServices';
import SessionInfo from '../sessionInfo/sessionInfo'
export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //  @Mayanka : the sidebar menu contents
        switch (this.props.sidebarItemSelected) {
            case 'adminHome':
            {
                return <Dashboard/>;
            }
            case 'viewData':
            {
                return <ViewData/>;
            }
            case 'toggleDomain':
            {
                return <Toggle/>;
            }
            case 'addDomain':
            {
                return <AddDomain/>;
            }
            case 'addScenario':
            {
                return <AddScenario/>;
            }
            case 'addComponent':
            {
                return <AddComponent/>;
            }
            case 'linkScenario':
            {
                return <LinkScenario/>;
            }
            case 'delinkScenario':
            {
                return <DelinkScenario/>;
            }
            case 'editScenario':
            {
                return <EditScenario/>;
            }
            case 'editComponent':
            {
                return <EditComponent/>;
            }
            case 'editDomain':
            {
                return <EditDomain/>;
            }
            case 'deleteDomain':
            {
                return <DeleteDomain/>;
            }
            case 'deleteScenario':
            {
                return <DeleteScenario/>;
            }
            case 'deleteComponent':
            {
                return <DeleteComponent/>;
            }
            case 'bulkAddUser':
            {
                return <UploadCsv/>;
            }
            case 'bulkAddComponent':
            {
                return <BulkAddComponent/>;
            }
            case 'addEditSeq':
            {
                return <AddEditSeq page='add'/>;
            }
            case 'editSeq':
            {
                return <AddEditSeq page='edit'/>;
            }
            case 'addUser':
            {
                return <AddUser/>;
            }
            case 'editUser':
            {
                return <EditUser/>;
            }
            case 'deleteUser':
            {
                return <DeleteUser/>;
            }
            case 'deleteSeq':
            {
                return <DeleteSeq/>;
            }
            case 'dashboard':
            {
                return <Dashboard/>;
            }
            case 'toggleDomain':
            {
                return <Toggle/>;
            }
            case 'viewData':
            {
                return <ViewData/>;
            }
            case 'addDomain':
            {
                return <AddDomain/>;
            }
            case 'addScenario':
            {
                return <AddScenario/>;
            }
            case 'addComponent':
            {
                return <AddComponent/>;
            }
            case 'linkScenario':
            {
                return <LinkScenario/>;
            }
            case 'delinkScenario':
            {
                return <DelinkScenario/>;
            }
            case 'editScenario':
            {
                return <EditScenario/>;
            }
            case 'editComponent':
            {
                return <EditComponent/>;
            }
            case 'editDomain':
            {
                return <EditDomain/>;
            }
            case 'deleteDomain':
            {
                return <DeleteDomain/>;
            }
            case 'deleteScenario':
            {
                return <DeleteScenario/>;
            }
            case 'deleteComponent':
            {
                return <DeleteComponent/>;
            }
            case 'bulkAddUser':
            {
                return <UploadCsv/>;
            }
            case 'bulkAddComponent':
            {
                return <BulkAddComponent/>;
            }
            case 'addEditSeq':
            {
                return <AddEditSeq/>;
            }
            case 'addUser':
            {
                return <AddUser/>;
            }
            case 'editUser':
            {
                return <EditUser/>;
            }
            case 'deleteUser':
            {
                return <DeleteUser/>;
            }
            case 'changePassword':
            {
                return <ChangePassword/>;
            }
            case 'masterReset':
            {
                return <MasterReset/>;
            }
            case 'resetPassword':
            {
                return <ResetPassword/>;
            }
            case 'BFM':
            {
                return <Penalise page='BFM'/>;
            }
            case 'Coach':
            {
                return <Penalise page='Coach'/>;
            }
            case 'Engineering Services':
            {
                return <EnggServices/>;
            }
            case 'Session Info':
            {
                return <SessionInfo/>;
            }
        }
    }
}
