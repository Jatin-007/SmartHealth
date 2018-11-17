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
    
    // componentDidMount(){
    //     database.ref('/USERS/PATIENTS/patients_list').on('value', (snapshot) => {
    //         this.props.displayPatients(snapshot.val());
    //     })
    
    // }

    // need to take care of the state 

    renderTable() {

        const {patient_list_collections} = this.props;
        Object.keys(patient_list_collections).map(val => {
            patient_list_collections[val]
        })

        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell numeric>Calories</TableCell>
                            <TableCell numeric>Fat (g)</TableCell>
                            <TableCell numeric>Carbs (g)</TableCell>
                            <TableCell numeric>Protein (g)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* {rows.map(row => {
                            return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {row.name}
                                </TableCell>
                                <TableCell numeric>{row.calories}</TableCell>
                                <TableCell numeric>{row.fat}</TableCell>
                                <TableCell numeric>{row.carbs}</TableCell>
                                <TableCell numeric>{row.protein}</TableCell>
                            </TableRow>
                            );
                        })} */}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

    render (){
        console.log('renders');
        return (
            <div>
                <p>TEST</p>
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