import React, {Component} from 'react';
import {connect} from 'react-redux';

class Profile extends Component {

    componentDidMount(){
        const {user_profile, user_type} = this.props;

        console.log(user_profile, user_type);
    }

    render (){
        return (
            <div className="">
                THIS WILL BE PROFILE
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile, user_type
    } = state.authReducer;

    console.log(user_profile, user_type);

    return {
        user_profile,
        user_type
    }
}

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

export default connect(mapStateToProps)(Profile);