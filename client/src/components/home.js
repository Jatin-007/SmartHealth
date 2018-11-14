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
    constructor(props) {
        super(props);
        this.state = {
            user_uid_list: [],
        }
    }

    async componentDidMount() {
        await this.getUserTypes();
    }
 
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props || prevState !== this.state) {
            const {user_profile} = this.props;
        
            if(user_profile){
                const uid = user_profile.uid;
                await  database.ref('/USERS/users_type').on('value',(snapshot) => {
                    this.props.userTypeAction(snapshot.val(), uid);
                });       
                // database.ref('/').on('value', (snapshot)=> console.log('database triggered !!', snapshot.val()));
    
                if (!this.state.user_uid_list.length) {
                    await this.getUserTypes();
                }
                await this.setUserType(uid);
            }
        }
    }
    
    getUserTypes = async () => {
        await database.ref('/USERS/users_type').on('value', (snapshot) => {
            const user_uid_list = Object.keys(snapshot.val());
            this.setState({ user_uid_list });
        })
    }

    setUserType = async (uid) => {
        await database.ref('/USERS/users_type').on('value',(snapshot) => {
            this.props.userTypeAction(snapshot.val(), uid);
        });    
    }

    render() {    
        const { user_profile, user_type } = this.props;
        const { user_uid_list } = this.state;
        // const test = user_profile ? <h2>{user_profile.displayName}</h2> : <Redirect to= "/login"/>;

        let userTypeComponent = null;

        // detecting what type of user is logged in
        if (!user_type) {
            return null;
        } else if(user_type === 'DOCTOR'){
            userTypeComponent = <DoctorPanel/>
        } else if (user_type === 'ADMIN'){
            userTypeComponent = <AdminPanel/>
        } 
        else if(user_profile){
                const uid = user_profile.uid;                

                if(user_uid_list.includes(uid)){
                    // checking if the user already exists inside the list of all the users or no...
                    userTypeComponent = <PatientPanel isRegistered={true}/>
                } else {
                    userTypeComponent = <PatientPanel isRegistered={false}/>
                }
            }
                

        return (
            <div>
                {
                    user_profile && 
                    <div>
                        <AvatarHeader/>
                        {userTypeComponent}
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