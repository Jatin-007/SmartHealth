import React, {Component} from 'react';
import PasswordProfile from './PasswordProfile';

class PatientProfile extends Component {

    renderPatientForm(){
        const {detail_user_profile} = this.props;

        return Object.keys(detail_user_profile).map(objkeys => {
            // need to remove renderRedirect thing from objkeys
            return (
                <div key={objkeys} className="mini-profile-card">
                    <h3>{objkeys}</h3>
                    <hr/>
                </div>
            )
        })

    }

    render(){

        return (
            <div>
                {this.renderPatientForm()}
                <PasswordProfile/>
            </div>
        )
    }
}

export default PatientProfile;