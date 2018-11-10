import React, {Component} from 'react';
import {database} from '../../firebase/config';

class DoctorProfile extends Component {

    componentDidUpdate(){
        database.ref('/USERS/DOCTORS/').on('value', (snapshot) => {
            console.log(snapshot.val());
        });
    }

    render(){
        return (
            <div>
                Will show doctor profile based on specialization chosen and name of doctor on the side just the way ReactBookstore works
            </div>
        )
    }
}

export default DoctorProfile;
// this will be used by patients