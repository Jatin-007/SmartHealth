import React, {Component} from 'react';
import PasswordProfile from './PasswordProfile';
import MiniProfileCard from './MiniProfileCard';

class AdminDoctorProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            personal_information: {
                address: "",
                city: "",
                country: "",
                province: "",
                dob:"",
                email: "",
                first_name: "",
                last_name: "",
                maritalStatus: "",

            },

            work: {
                field_of_study: "",
                specialization: "",
                summary: "",
                uni_name: "",
                year_of_study: "",
                years_of_exp: "",
            }
        }
    }

    renderProfile(detail_user_profile){
        if(detail_user_profile){
            return Object.keys(detail_user_profile).map(objkey => {

                console.log(objkey);

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