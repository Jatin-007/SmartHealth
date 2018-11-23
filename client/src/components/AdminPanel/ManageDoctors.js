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
import AddIcon from '@material-ui/icons/Add';

class ManageDoctors extends Component {
    constructor(props){
        super(props);

        this.state = {
            doctors_list: [],
        }
    }

    async componentWillMount(){
        const {user_profile, user_type} = this.props;

        if(user_profile && user_type){
            if(user_type === "ADMIN"){
                await database.ref('/USERS/DOCTOR/detail_user_data').on('value', (snapshot) => {
                    this.setState({doctors_list: snapshot.val()});
                })
            }
            else if(user_type === "PATIENT" || "DOCTOR"){
                return <Redirect to="/404" />
            }
        }
    }

    renderTable(){
        const {user_type} = this.props;
        if(user_type){
            if(user_type === "ADMIN"){
                const doctors_list = this.state.doctors_list;
                console.log(doctors_list);

                return Object.keys(doctors_list).map((data, index)=> {

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
                            <Button variant="fab" mini color="secondary" aria-label="Add">
                            <AddIcon />
                            </Button>
                            </TableCell>
                        </TableRow>
                    )
                })    
            }
        }
    }

    render() {
        return (
            <div>
                <h3>Manage Doctors</h3>
                <hr/>
                <div>
                    <Link to="/add-doctors">
                        <Button variant="contained" color="default">
                            Add a Doctor
                            <CloudUploadIcon/>
                        </Button>
                    </Link>
                    <hr/>
                </div>

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

// const mapDispatchToProps = dispatch => {
//     return {
        
//     }
// }

export default connect(MapStateToProps)(ManageDoctors);