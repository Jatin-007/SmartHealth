import React, {Component} from 'react';
import { database } from '../../firebase/config';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {displayPatients, selectedPatientProfile} from '../../actions/authActions';

class PatientList extends Component {

    constructor(props){
        super(props);
        this.state = {
            renderRedirect: false,
        }
    }
    
    componentDidMount(){
        database.ref('/USERS/PATIENTS/patients_list').on('value', (snapshot) => {
            this.props.displayPatients(snapshot.val());
        })
    }

    componentWillUnmount(){
        
    }

    // need to take care of the state 

    // filterList(e) {
    //     const data = this.state.data;
    //     const query = e.target.value.toLowerCase();
    //     // let filtered_data = this.state.filtered_data;

    //     let filtered_data = data.filter(vals => {

    //         if (vals.request_status.toLowerCase().search(query) !== -1){
    //             return vals;
    //         }
    //         else if (vals.request_time && vals.request_time.toLowerCase().search(query) !== -1){
    //             return vals;
    //         }
    //         else if (vals.finish_time && vals.finish_time.toLowerCase().search(query) !== -1){
    //             return vals;
    //         }
    //         else if (vals.collection.toLowerCase().search(query) !== -1){
    //             return vals;
    //         }
    //         else if (vals.download_type.toLowerCase().search(query) !== -1){
    //             return vals;
    //         }
    //         else if (vals.filter_query && vals.filter_query.toLowerCase().search(query) !== -1){
    //             return vals;
    //         }
    //     });

    //     this.setState({filtered_data});
    // }

    handleClick(val){
        database.ref(`/USERS/PATIENTS/detail_patients_list/${val}`).on('value', (snapshot) => {
            this.props.selectedPatientProfile(snapshot.val(), val);
            this.setState({renderRedirect : true});
        });
        
    }

    renderTable() {
        const {patient_list_collections} = this.props;
        return Object.keys(patient_list_collections).map((val, index) => {
            // patient_list_collections[val].map(nested_key => {
                const nested_obj = patient_list_collections[val];
                // Object.keys(nested_obj).map(nested_val => {

                    return (
                    <TableRow key={index} onClick={() => this.handleClick(val)} className="detail-patient-div">
                         <TableCell>
                         {index + 1}
                         </TableCell>
                         <TableCell>{nested_obj["gender"]}</TableCell>
                         <TableCell>{nested_obj["name"]}</TableCell>
                         <TableCell>{nested_obj["age"]}</TableCell>
                     </TableRow>
                    )
        })
    }

    render (){
        const {user_profile, user_type} = this.props;

        if(!user_profile || (user_profile && user_type === "PATIENT")){
            return <Redirect to="/404"/>
        }
        if(this.state.renderRedirect){
            return <Redirect to="/patient-detail"/>
        }
        
        return (
            <div>
            <h2>Patient List</h2>
            <div className="display-table-list">
                <Paper>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Patient name</TableCell>
                            <TableCell>Age</TableCell>
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

const mapStateToProps = state => {
    const {
        patient_list_collections,
        user_profile, user_type
    } = state.authReducer;

    return {
        patient_list_collections,
        user_profile, user_type
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayPatients: (val) => {
            dispatch(displayPatients(val))
        },
        selectedPatientProfile: (profile, uid) => {
            dispatch(selectedPatientProfile(profile, uid))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);