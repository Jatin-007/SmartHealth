import React, {Component} from 'react';
import {connect} from 'react-redux';
import {detailUserProfile} from '../../actions/authActions';
import {database} from '../../firebase/config';
import AdminDoctorProfile from './AdminDoctorProfile';
import PatientProfile from './PatientProfile';

class Profile extends Component {

    async componentWillMount(){
        const {user_profile, user_type} = this.props;

        if(user_profile && user_type){
            const uid = user_profile.uid;
            if(user_type === "PATIENT"){
                await database.ref(`/USERS/PATIENTS/detail_patients_list/${uid}/`).on('value', (snapshot) => {
                    this.props.detailUserProfile(snapshot.val());
                })
            }
            else if (user_type === "ADMIN" || user_type === "DOCTOR"){
                await database.ref(`/USERS/${user_type}/detail_user_data/${uid}`).on('value', (snapshot) => {
                    this.props.detailUserProfile(snapshot.val());
                })
            }
        }
    }

    render (){
        const {detail_user_profile, user_type} = this.props;

        const renderProfile = () => {
            if(detail_user_profile && user_type === "PATIENT"){
                        console.log(user_type);
                return (
                    <div>
                        <PatientProfile detail_user_profile={detail_user_profile} />
                    </div>
                    )
            }
            else if((user_type === "DOCTOR" || user_type === "ADMIN") && detail_user_profile){
                return (
                    <div>
                        <h2>Update your profile information</h2>
                        <hr/>
                        <AdminDoctorProfile detail_user_profile={detail_user_profile}/>
                    </div>
                )
            }
        }

        return (
            <div className="">
                {renderProfile()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile,
        user_type,
        detail_user_profile
    } = state.authReducer;

    return {
        user_profile,
        user_type,
        detail_user_profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        detailUserProfile: (val) => {
            dispatch(detailUserProfile(val))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);