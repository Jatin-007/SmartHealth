import React, {Component} from 'react';
import {connect} from 'react-redux';

class ManageInventory extends Component {
    render() {
        const {user_profile} = this.props;

        return (
            <p>CRUD operation for inventory</p>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile
    }= state.authReducer;

    return {
        user_profile
    }
}

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

export default connect(mapStateToProps)(ManageInventory);