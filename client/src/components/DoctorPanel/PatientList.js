import React, {Component} from 'react';
import { database } from '../../firebase/config';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {displayPatients} from '../../actions/authActions';

class PatientList extends Component {
    
    componentDidMount(){
        database.ref('/USERS/PATIENTS/patients_list').on('value', (snapshot) => {
            this.props.displayPatients(snapshot.val());
        })
    }

    // need to take care of the state 

    renderTable() {

        const {patient_list_collections} = this.props;
        return Object.keys(patient_list_collections).map((val, index) => {
            // patient_list_collections[val].map(nested_key => {
                const nested_obj = patient_list_collections[val];
                // Object.keys(nested_obj).map(nested_val => {
                    return (
                        <TableRow key={index}>
                         <TableCell>
                         {index}
                         </TableCell>
                         <TableCell numeric>{nested_obj["name"]}</TableCell>
                         <TableCell numeric>{nested_obj["age"]}</TableCell>
                         <TableCell numeric>{nested_obj["gender"]}</TableCell>
                     </TableRow>
                    )
        })

    }

    render (){

        return (
            <div>
                <p>TEST</p>
                <div>
                <Paper>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Name of patient</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
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
        patient_list_collections
    } = state.authReducer;

    return {
        patient_list_collections
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayPatients: (val) => {
            dispatch(displayPatients(val))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);