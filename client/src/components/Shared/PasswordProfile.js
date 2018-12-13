import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from '../../firebase/config';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class PasswordProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            oldPassword: "",
            password1: "",
            password2: "",
            error: ""            
        }
    }
    
    reauthenticate(currentPassword){
        console.log('triggers')
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateAndRetrieveDataWithCredential(cred);
    }

    changePassword(){

        console.log('triggers')

        const currentPassword = this.state.oldPassword;
        const newPassword = this.state.password1;

        this.reauthenticate(currentPassword).then(() => {
          const user = firebase.auth().currentUser;
          user.updatePassword(newPassword).then(() => {
            console.log("Password updated!");
          }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }

    onSubmit(e){
        e.preventDefault();
        console.log('triggers')
        if(!this.state.error){
            this.changePassword();
        }
    }

    renderPassword(){

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="update-password-inner-div">
                    <div>
                        <TextField
                            label="CurrentPassword"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={(e) => this.setState({oldPassword: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            label="New password"
                            type="password"
                            margin="normal"
                            onChange={(e) => this.setState({password1: e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Confirm password"
                            type="password"
                            margin="normal"
                            onChange={(e) => this.setState({password2: e.target.value})}
                        />
                    </div>
                </div>

                {this.state.error}

                <Button variant="contained" type="submit" color="primary" disabled={this.state.password1 !== this.state.password2 || this.state.password1.length < 5}>
                    Update Password
                </Button>

            </form>
        )
    }

    render(){
        return (
            <div className="update-password-div">
                <h3>Update Password</h3>
                <hr/>
                {this.renderPassword()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {user_profile} = state.authReducer;
    return {
        user_profile
    }
}

export default connect(mapStateToProps)(PasswordProfile);