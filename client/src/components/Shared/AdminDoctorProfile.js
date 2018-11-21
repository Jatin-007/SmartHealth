import React, {Component} from 'react';
import PasswordProfile from './PasswordProfile';
import MiniProfileCard from './MiniProfileCard';

class AdminDoctorProfile extends Component {

    renderProfile(detail_user_profile){
        if(detail_user_profile){
            return Object.keys(detail_user_profile).map(objkey => {
                return (
                    <div key={objkey}>
                        <MiniProfileCard objkey={objkey} val={detail_user_profile[objkey]}/>
                    </div>
                )
            })
        }
    }

    
    render(){
        const {detail_user_profile} = this.props;

        return (
            <div>
                {this.renderProfile(detail_user_profile)}
                <PasswordProfile/>
            </div>
        )
    }
}

export default AdminDoctorProfile;