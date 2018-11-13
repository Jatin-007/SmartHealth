import React, {Component} from 'react';
import {connect} from 'react-redux';
// import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import DoctorPanel from './DoctorPanel';
import PatientPanel from './PatientPanel';
import AdminPanel from './AdminPanel';
import {database} from '../firebase/config';
// from material ui 
import { userTypeAction } from '../actions/authActions';
import AvatarHeader from './AvatarHeader';

class Home extends Component {
    
    componentWillMount(){
        const {user_profile, user_type} = this.props;

        if(user_profile){
            const uid = user_profile.uid;
            database.ref('/USERS/users_type').on('value',(snapshot) => {
                this.props.userTypeAction(snapshot.val(), uid);
            });       
            // database.ref('/').on('value', (snapshot)=> console.log('database triggered !!', snapshot.val()));
        }
        // providing a ref as where to check for the changes...
    }

    render() {    
        const user_profile = this.props.user_profile;
        // const test = user_profile ? <h2>{user_profile.displayName}</h2> : <Redirect to= "/login"/>;

        if(user_profile){
            const uid = user_profile.uid;
            database.ref('/USERS/users_type').on('value',(snapshot) => {
                this.props.userTypeAction(snapshot.val(), uid);
            });          
        }

        const renderUserType = () => {
            const {user_type, user_profile} = this.props;
            // detecting what type of user is logged in
            if(user_type === 'DOCTOR'){
                return <DoctorPanel/>
            }
            else if (user_type === 'ADMIN'){
                return <AdminPanel/>
            }
            else {
    
                if(user_profile.uid){
                    const uid = user_profile.uid;
                    let user_uid_list = [];
                    database.ref('/USERS/users_type').on('value', (snapshot) => {
                        user_uid_list = Object.keys(snapshot.val());
                    })
    
                    if(user_uid_list.includes(uid)){
                        // checking if the user already exists inside the list of all the users or no...
                        return (
                            <PatientPanel isRegistered={true}/>
                        )
                    }
                    else {
                        return <PatientPanel isRegistered={false}/>
                    }
                }
            }        
        }

        return (
            <div>
                {
                    user_profile && 
                    <div>
                        <AvatarHeader/>
                        {renderUserType()}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile,
        user_type,
    } = state.authReducer;

    return {
        user_profile,
        user_type,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        userTypeAction: (user_data, uid) => {
            dispatch(userTypeAction(user_data, uid))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);