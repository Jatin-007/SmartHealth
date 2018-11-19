import React, {Component} from 'react';
import PasswordProfile from './PasswordProfile';

class AdminDoctorProfile extends Component {

    renderProfile(detail_user_profile){
        if(detail_user_profile){
            console.log('zzzzzz', Object.keys(detail_user_profile));
            // this.setState = {
            //     // ok... ill wrap up some stuff by tonight .. not a lot of stuff to do tbh
            // }
        }
    }

    
    render(){
        const {detail_user_profile} = this.props;

        if(detail_user_profile){
            {this.renderProfile(detail_user_profile)}
        }

        return (
            <div>
                Rendering admin doctor profile
                <PasswordProfile/>
            </div>
        )
    }
}

export default AdminDoctorProfile;