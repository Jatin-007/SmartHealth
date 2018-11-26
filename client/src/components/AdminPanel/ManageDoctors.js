import React, {Component} from 'react';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';
import {Link, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

class ManageDoctors extends Component {
    constructor(props){
        super(props);

        this.state = {
            doctors_list: [],
            data: "",
            filtered_data: "",
            open: false,
            selected_doctor_uid: ""
        }
    }

    async componentWillMount(){
        const {user_profile, user_type} = this.props;

        if(user_profile && user_type){
            if(user_type === "ADMIN"){
                await database.ref('/USERS/DOCTOR/detail_user_data').on('value', (snapshot) => {
                    this.setState({doctors_list: snapshot.val()});

                    this.setState({data: snapshot.val()});
                    this.setState({filtered_data: snapshot.val()});                    
                })
            }
            else if(user_type === "PATIENT" || "DOCTOR"){
                return <Redirect to="/404" />
            }
        }
    }

    handleClose(){
        this.setState({open: false})
    }

    renderTable(){
        // if(user_type){
            // if(user_type === "ADMIN"){
                const doctors_list = this.state.filtered_data;

                return Object.keys(doctors_list).map((data, index)=> {
                    const uid = data;

                    const nested_obj = doctors_list[data];
                    const personal_information = nested_obj.personal_information;
                    const work = nested_obj.work;

                    const city = personal_information.city;
                    const dob = personal_information.dob;
                    const first_name = personal_information.first_name;
                    const last_name = personal_information.last_name;
                    const email = personal_information.email;

                    const specialization = work.specialization;

                    return (
                        <TableRow key={index} className="detail-patient-div">
                            <TableCell>
                            {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {first_name}
                            </TableCell>
                            <TableCell>{last_name}</TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{dob}</TableCell>
                            <TableCell>{city}</TableCell>
                            <TableCell>{specialization}</TableCell>
                            <TableCell>
                            <Button variant="fab" className="update-button-admin" mini color="secondary" aria-label="Add" 
                                onClick={() => this.setState({selected_doctor_uid: uid, open: true})}>
                                <DeleteSharpIcon  />
                            </Button>
                            </TableCell>
                        </TableRow>
                    )
                })    
            // }
        // }
    }

    deleteDoctor(){
        console.log(this.state.selected_doctor_uid);
        database.ref('/USERS/DOCTOR/detail_user_data').child(`${this.state.selected_doctor_uid}`).remove().then(() => {
            this.setState({
                open: false
            })
        })
    }

    filterList(e){
        const doctors_list = this.state.data;
        const query = e.target.value.toLowerCase();

        let filtered_data = Object.keys(doctors_list).filter(data => {
            const nested_obj = doctors_list[data];
            const personal_information = nested_obj.personal_information;
            const work = nested_obj.work;
            const specialization = work.specialization;

            if(personal_information.first_name.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(personal_information.email.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(specialization.toLowerCase().search(query) !== -1){
                return data;
            }
        });

        this.setState({filtered_data});
    }

    render() {

        const renderForm = () => {
            return (
                <div>
                    <form>
                        <TextField
                            id="outlined-full-width"
                            label="Search"
                            style={{ margin: 8 }}
                            placeholder="Search for doctor by their name or city"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => this.filterList(e)}
                        />
                    </form>
                </div>
            )
        }
        
        return (
            <div>
                <h3>Manage Doctors</h3>
                <hr/>
                <div>
                    <Link to="/add-doctors">
                        <Button variant="contained" color="primary">
                            Add a Doctor   
                            <CloudUploadIcon/>
                        </Button>
                    </Link>
                    <hr/>
                </div>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    >
                    <div className="modal-div">
                        <h2>
                        Delete Doctor
                        </h2>
                        <h3>
                        You are about to delete a doctor completely from your system. To Proceed further, Click Yes.
                        </h3>
                        <p>
                        Or simply tap outside the popup to cancel the action.
                        </p>

                         <Button variant="contained" color="secondary" onClick={this.deleteDoctor.bind(this)}>
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
                                <TableCell>First name</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Specialization</TableCell>
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
}

const MapStateToProps = state => {
    const {
        user_profile,
        user_type
    } = state.authReducer;

    return {
        user_profile,
        user_type
    }
}

export default connect(MapStateToProps)(ManageDoctors);