import React, {Component} from 'react';
import {connect} from 'react-redux';
import { map } from '@firebase/util';

class DetailDoctorProfile extends Component {
    render (){
        const {
            selected_doctor_uid,
            selected_doctor_profile,} = this.props;
        
        console.log(selected_doctor_profile, selected_doctor_uid);

        return (
            <div>
                test for detail doctor
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        selected_doctor_uid,
        selected_doctor_profile,
    } = state.authReducer;

    return {
        selected_doctor_uid,
        selected_doctor_profile,
    }
}

export default connect(mapStateToProps)(DetailDoctorProfile);