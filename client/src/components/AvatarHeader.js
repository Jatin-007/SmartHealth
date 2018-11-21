import React, {Component} from 'react';
import {connect} from 'react-redux';

import Avatar from '@material-ui/core/Avatar';

class AvatarHeader extends Component {

    render (){

        const {user_profile} = this.props;
        return (
            <div className="avatar-header">
                <Avatar
                    alt={user_profile.displayName}
                    src={user_profile.photoURL}
                    className="profile-avatar"
                />
                <h5>Hello, {user_profile.displayName}</h5>
            </div>
        )
    }
}

const MapStateToProps = state => {
    const {
        user_profile
    }=state.authReducer;

    return {
        user_profile
    };
}

export default connect(MapStateToProps)(AvatarHeader);