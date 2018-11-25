import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import DoctorProfileCard from './DoctorProfileCard';

class DetailDoctorProfile extends Component {

    renderDoctorProfile(){
        const {selected_doctor_profile} = this.props;

        const personal_information = selected_doctor_profile.personal_information;
        const work = selected_doctor_profile.work;

        console.log(personal_information);
        console.log(work);

        return <DoctorProfileCard user={selected_doctor_profile}/>
    }

    render (){
        const {
            selected_doctor_uid
        } = this.props; 

        if(!selected_doctor_uid) {
            return <Redirect to= "/book-appointment"/ >
        }

        else {
            return (
                <div>
                    {selected_doctor_uid}
                    {this.renderDoctorProfile()}
                </div>
            )
        }
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