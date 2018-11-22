import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class DetailPatientProfile extends Component {

    componentDidMount(){
        if(this.props.user_type !== "DOCTOR"){
            return <Redirect to="/404" />
        }
    }

    render (){
        const {selected_patient_profile, selected_patient_profile_uid} = this.props;

        return (
            <div>
                TEST
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