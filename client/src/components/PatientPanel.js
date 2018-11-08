import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
// BookAppointment

import PatientRegister from './PatientRegister';

class PatientPanel extends Component {
    renderDashboard(){
        const {isRegistered} = this.props;
        
        if(!isRegistered){
            return <Redirect to="/register-patient"/>
        }
    }

    render () {

        return (
            <div>
                {this.renderDashboard()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile,
        user_type
    }= state.authReducer;

    return {
        user_profile,
        user_type
    }
}

export default connect()(PatientPanel);