import React, {Component} from 'react';
import {auth} from '../firebase';
// import MenuItem from '@material-ui/core/MenuItem';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GoogleAuthSignIn from './googleAuthSignIn'

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
    error: null
}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        const {history} = this.props;

        e.preventDefault();
        const {
            email, password1
        } = this.state;

        auth.doCreateUserWithEmailAndPassword(email, password1)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          
          history.push('/home');
        })
        .catch(error => {
          this.setState({error: error});
        });
  
    }    

    handleEmailValidation(e){
        e.preventDefault();
        const email = e.target.value;

        this.setState({email: e.target.value});

        if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            this.setState({error: "Not a valid email"});
        }
        else{
            this.setState({error: ""});
        }
    }

    handlePasswordValidation(e) {
        e.preventDefault();
        const password = e.target.value;

        this.setState({password1: password});

        if(password.length < 6){
            this.setState({error: "6 or more characters required in the password"});
        }
        else if(password.length >= 6){
            this.setState({error: ""});
        }
    }

    // handleEmailValidation(e){
    //     e.preventDefault;

    //     const email = e.target.value;
    //     if(email.contains("@") && email.contains(".")){
            
    //     }
    // }

    render () {

        const {
            firstName,
            lastName,
            email,
            password1,
            password2,
            error
        } = this.state;

        const isInvalid = password1 !== password2 ||
        password1 === '' || email === '' ||
        firstName === '' || lastName === '' 

        return (
            <div className="register-div">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-name-div">
                    <TextField
                        label="firstname"
                        value={firstName}
                        placeholder = "First Name"
                        onChange={e => {this.setState({'firstName' : e.target.value})}}
                    />

                    <TextField
                        label="lastname"
                        value={lastName}
                        placeholder = "Last Name"
                        onChange={e => {this.setState({'lastName' : e.target.value})}}
                    />
                    </div>

                    <div>
                    <TextField
                        label="email"
                        value={email}
                        placeholder = "enter your email here here"
                        onChange={e => {this.handleEmailValidation(e)}}
                    />
                    </div>

                    <div>
                    <TextField
                        label="password"
                        type="password"
                        value={password1}
                        onChange={e => {this.handlePasswordValidation(e)}}
                        placeholder = "password here"
                    />
                    </div>

                    <div>
                    <TextField
                        label="confirm password "
                        type="password"
                        value={password2}
                        placeholder = "sssshhhh -2 "
                        onChange={e => {this.setState({'password2' : e.target.value})}}
                    />
                    </div>
                    {error && <p className="danger error">{error}</p>}

                    <Button variant="contained" className="register-button-style" color="primary" disabled={isInvalid || this.state.error} type="submit">
                        Register
                    </Button>

                </form> 

                <GoogleAuthSignIn/>
            </div>
        )
    }
}


export default withRouter(Register);