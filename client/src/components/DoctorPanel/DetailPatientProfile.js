import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class DetailPatientProfile extends Component {

    componentDidMount(){
        if(this.props.user_type !== "DOCTOR"){
            return <Redirect to="/404" />
        }
    }

    renderCard(){

    }

    renderInformation(){
        const {selected_patient_profile} = this.props;
        const {personal_information, emergency_contact, insurance_information, medications, common_health_information} = selected_patient_profile;

        return (
            <Paper>
            <Table>
                <TableHead>
                <TableRow>
                    Personal Information
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                        Test
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Paper>
        )

    }

    render (){
        const {selected_patient_profile, selected_patient_profile_uid} = this.props;

        if(!selected_patient_profile){
            return <Redirect to="/home"/>
        }

        return (
            <div> 
                {this.renderInformation()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_type,
        selected_patient_profile,
        selected_patient_profile_uid,
    } = state.authReducer;

    return {
        user_type,
        selected_patient_profile,
        selected_patient_profile_uid,
    }
}

export default connect(mapStateToProps)(DetailPatientProfile);