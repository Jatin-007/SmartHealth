import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
// import {Button} from '@material-ui/core'

import PatientList from './DoctorPanel/PatientList';

class DoctorPanel extends Component {

    render (){
        // const user_profile = this.props.user_profile;
        // const test = user_profile ? <h2>{user_profile.displayName}</h2> : <Redirect to= "/login"/>
        
        return (
            <div>
                <div>
                    <PatientList/>
                    {/* asdasdasd */}
                </div>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     const {
//         user_profile
//     } = state.authReducer;

//     return {
//         user_profile
//     }
// }
export default DoctorPanel;
// export default connect(mapStateToProps)(DoctorPanel);