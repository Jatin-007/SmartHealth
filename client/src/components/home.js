import React, {Component} from 'react';
import {connect} from 'react-redux';
// import firebase from 'firebase';
// import {Redirect} from 'react-router-dom';
import DoctorPanel from './DoctorPanel';
import PatientPanel from './PatientPanel';
import AdminPanel from './AdminPanel';
import {database} from '../firebase/config';
// from material ui 
import { userTypeAction, renderPatientList } from '../actions/authActions';
import AvatarHeader from './AvatarHeader';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_uid_list: [],
        }
    }

    async componentDidMount(){
        await this.getUserTypes();
    }

    // componentDidUpdate(){
    //     const {user_profile} = this.props;
        
    //     console.log('didMount', this.props.user_profile);
    // }

    // async componentDidMount() {
    //     console.log('rendered into component did mount');
    //     await this.getUserTypes();
    // }
 
    // async componentDidUpdate(prevProps, prevState) {
    //     if (prevProps !== this.props || prevState !== this.state) {
    //         const {user_profile} = this.props;
    //         console.log('componentDidUpdate', user_profile.uid);
        
    //         if(user_profile){
    //             const uid = user_profile.uid;
    //             await  database.ref('/USERS/users_type').on('value',(snapshot) => {
    //                 this.props.userTypeAction(snapshot.val(), uid);
    //             });       
    //             // database.ref('/').on('value', (snapshot)=> console.log('database triggered !!', snapshot.val()));
    
    //             if (!this.state.user_uid_list.length) {
    //                 await this.getUserTypes();
    //             }
    //             await this.setUserType(uid);
    //         }
    //     }
    // }

    // componentDidUpdate(){
    //     console.log('yes it updates')
    // }

    getUserTypes = async () => {
        let user_uid_list = [];
        await database.ref('/USERS/users_type').on('value', (snapshot) => {
            user_uid_list = Object.keys(snapshot.val());
            this.props.renderPatientList(user_uid_list);
        })
    }

    setUserType = async (uid) => {
        await database.ref('/USERS/users_type').on('value',(snapshot) => {
            this.props.userTypeAction(snapshot.val(), uid);
        });    
    }

    // async componentDidUnMount(){

    // }

    render() {    
        const { user_profile, user_type, render_patient_list } = this.props;
        if(user_profile){
            this.setUserType(user_profile.uid);
        }

        let userTypeComponent = null;

        if(user_profile && user_type && render_patient_list){
            const uid = user_profile.uid;

            if(user_type && user_type === 'DOCTOR'){
                userTypeComponent = <DoctorPanel/>
            }
            else if(user_type && user_type === 'ADMIN'){
                userTypeComponent = <AdminPanel/>
            }

            else {
                if(render_patient_list.includes(uid)){
                    userTypeComponent = <PatientPanel isRegistered={true}/>
                }
                else {
                    userTypeComponent = <PatientPanel isRegistered={false}/>
                }
            }
        }

        // const { user_uid_list } = this.state;
        // // const test = user_profile ? <h2>{user_profile.displayName}</h2> : <Redirect to= "/login"/>;
        // 
        // let userTypeComponent = null;
        // 
        // console.log('inside render', user_profile, user_type, user_uid_list);
        // // detecting what type of user is logged in
        // if (!user_type) {
        //     return null;
        // } else if(user_type === 'DOCTOR'){
        //     userTypeComponent = <DoctorPanel/>
        // } else if (user_type === 'ADMIN'){
        //     userTypeComponent = <AdminPanel/>
        // } 
        // else if(user_profile){
        //         const uid = user_profile.uid;                
        // 
        //         if(user_uid_list.includes(uid)){
        //             // checking if the user already exists inside the list of all the users or no...
        //             userTypeComponent = <PatientPanel isRegistered={true}/>
        //         } else {
        //             userTypeComponent = <PatientPanel isRegistered={false}/>
        //         }
        //     }

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
        render_patient_list,
    } = state.authReducer;

    return {
        user_profile,
        user_type,
        render_patient_list,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        userTypeAction: (user_data, uid) => {
            dispatch(userTypeAction(user_data, uid))
        },
        renderPatientList: (data) => {
            dispatch(renderPatientList(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);