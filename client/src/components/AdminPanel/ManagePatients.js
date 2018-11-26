import React, {Component} from 'react';
import {database} from '../../firebase/config';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

class ManagePatients extends Component {
    constructor(props){
        super(props);

        this.state = {
            manage_patients: [],
            open: false,
            uid: "",
        }
    }

    componentWillMount(){
        const {user_profile, user_type} = this.props;
        
        if(user_profile){
            if(user_type === 'ADMIN'){
                database.ref('/USERS/PATIENTS/detail_patients_list').on('value', (snapshot) => {
                    this.setState({manage_patients: snapshot.val()})
                })
            }
            else{
                return <Redirect to="/404" />
            }
        }
    }

    handleDeleteUser(uid){
        this.setState({open: true, uid});
    }

    manageDelete = () => {

        database.ref('/USERS/PATIENTS/detail_patients_list').child(`${this.state.uid}`).remove().then(() => {
            this.setState({
                open: false
            })
        })

        database.ref('/USERS/PATIENTS/patients_list').child(`${this.state.uid}`).remove().then(() => {
            this.setState({
                open: false
            })
        })
    }

    renderTable(){
        const {user_type} = this.props;
        if(user_type){
            if(user_type === "ADMIN"){
                const patient_list = this.state.manage_patients;

                return Object.keys(patient_list).map((data, index)=> {

                    const uid = data;
                    const nested_obj = patient_list[data];
                    const personal_information = nested_obj.personal_information;
                    const title = personal_information.title;
                    const city = personal_information.city;
                    const dob = personal_information.dob;
                    const first_name = personal_information.first_name;

                    return (
                        <TableRow key={index} className="detail-patient-div">
                            <TableCell>
                            {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {title}
                            </TableCell>
                            <TableCell>{first_name}</TableCell>
                            <TableCell>{dob}</TableCell>
                            <TableCell>{city}</TableCell>
                            <TableCell>
                                <Button variant="fab" mini 
                                className="update-button-admin" 
                                color="secondary" 
                                aria-label="Add" 
                                onClick={() => this.handleDeleteUser(uid)}>
                            <DeleteSharpIcon  />
                            </Button>
                            </TableCell>
                        </TableRow>
                    )
                })    
            }
        }
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render(){

        return (
            <div>
                <h2>Manage patients</h2>
                <hr/>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    >
                    <div className="modal-div">
                        <h2>
                        Delete User
                        </h2>
                        <h3>
                        You are about to delete a user completely from your system. To Proceed further, Click Yes.
                        </h3>
                        <p>
                        Or simply tap outside the popup to cancel the action.
                        </p>

                         <Button variant="contained" color="secondary" onClick={this.manageDelete.bind(this)}>
                            Yes, Delete the user!
                        </Button>
                    </div>
                </Modal>
                <div className="display-table-list">
                        <Paper>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>First name</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.renderTable()}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    const {
        user_profile, user_type
    } = state.authReducer;

    return {
        user_profile,
        user_type
    }
};

export default connect(mapStateToProps)(ManagePatients);