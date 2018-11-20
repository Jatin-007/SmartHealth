import React, {Component} from 'react';
import {database} from '../../firebase/config';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class ManagePatients extends Component {

    async componentDidMount(){
        const {user_profile, user_type} = this.props;
        
        if(user_profile){
            if(user_type === 'ADMIN'){
                await database.ref('/USERS/PATIENTS/detail_patients_list').on('value', (snapshot) => {
                    console.log(snapshot.val());
                })
            }
            else if(user_type === 'PATIENT' || user_type === 'DOCTOR'){
                <Redirect to="/404" />
            }
        }
    }

    render(){
        return (
            <div>
                <h3>Manage patients</h3>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile, user_type
    } = state.authReducer;

    return {
        user_profile,
        user_type
    }
}

export default connect(mapStateToProps)(ManagePatients);