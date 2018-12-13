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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Modal from '@material-ui/core/Modal';

class ManagePatients extends Component {
    constructor(props){
        super(props);

        this.state = {
            manage_patients: [],
            open: false,
            uid: "",
            filtered_data: [],
        }
    }

    componentWillMount(){
        const {user_profile, user_type} = this.props;
        
        if(user_profile){
            if(user_type === 'ADMIN'){
                database.ref('/USERS/PATIENTS/detail_patients_list').on('value', (snapshot) => {
                    this.setState({manage_patients: snapshot.val()});
                    this.setState({filtered_data: snapshot.val()});
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
                
                const {filtered_data} = this.state;
                return Object.keys(filtered_data).map((data, index)=> {

                    const uid = data;
                    const nested_obj = filtered_data[data];
                    const personal_information = nested_obj.personal_information;
                    const city = personal_information.city;
                    const first_name = personal_information.first_name;

                    return (
                        <TableRow key={index} className="detail-patient-div">
                            <TableCell>
                            {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {first_name}
                            </TableCell>
                            <TableCell>{personal_information.last_name}</TableCell>
                            <TableCell>{personal_information.email}</TableCell>
                            <TableCell>{personal_information.dob}</TableCell>
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

    filterList(e){
        const data = this.state.manage_patients;
        const query = e.target.value.toLowerCase();

        let filtered_data = Object.values(data).filter(vals => {
            const nested_obj = vals;
            const personal_information = nested_obj.personal_information;

            if(personal_information.first_name.toLowerCase().search(query) !== -1){
                return data;
            }
            if(personal_information.last_name.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(personal_information.email.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(personal_information.city.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(personal_information.dob.toLowerCase().search(query) !== -1){
                return data;
            }
        });

        this.setState({filtered_data});
    }

    renderForm = () => {
        return (
            <div>
                <form>
                    <TextField
                        id="outlined-full-width"
                        label="Search"
                        style={{ margin: 8 }}
                        placeholder="Search for patient by their name, email, city or date-of-birth"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.filterList.bind(this)}
                    />
                </form>
            </div>
        )
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render(){
            
        return (
            <div>
                <h2>Manage patients</h2>
                <hr/>
                {this.renderForm()}
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
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last name</TableCell>
                                    <TableCell>Email</TableCell>
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