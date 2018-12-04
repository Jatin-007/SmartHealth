import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {auth} from '../firebase';

import logo from '../assets/logo.png'

import GoogleAuthSignIn from './googleAuthSignIn';
// import auth from '../../firebase/config';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class Login_Page extends Component {
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE}
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        
        console.log('testtest');
        const {
          email,
          password,
        } = this.state;

        console.log(email, password);
    
        const {
          history,
        } = this.props;
    
        auth.doSignInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push('/home');
          })
          .catch(error => {
            this.setState({error: error});
          });
    }

    render () {

        const {
            email,
            password,
            error
        } = this.state;

        return (
            <div className="login-body">
            
                <table class="login_table">
                    <tr> 
                        <td>
                            <form onSubmit={this.onSubmit}>
                            <center><img src={logo} alt="logo" width="100px"/></center>
                                <div className="login_width">
                                    <TextField
                                        label="Email"
                                        placeholder = "Enter your email address here"
                                        fullWidth
                                        value={email}
                                        onChange = {event => this.setState({'email': event.target.value})}
                                    />
                                </div>
                                <p></p>
                                

                                <div className="login_width">
                                    <TextField
                                        label="Password"
                                        placeholder = "Password here"
                                        type = "password"
                                        fullWidth
                                        value={password}
                                        onChange = {event => this.setState({'password': event.target.value})}
                                    />
                                </div>
                                <p></p>

                                <table className="login_width">
                                    <tr>
                                        <td>
                                            <Button variant="contained" color="primary" onClick={this.onSubmit.bind(this)}>
                                                Login
                                            </Button>
                                        </td>

                                        <td>
                                            <Link to='/password-reset'><Button variant="outlined" color="secondary">Forgot Password</Button></Link>
                                        </td>
                                    </tr>
                                </table>
                                    {error && <p>{error.message}</p>}
                            </form>

                            <div>
                                <h4>Don't have an account ?</h4>
                                <Link to='/register'>Sign up</Link>
                            </div>
                            <p></p>
    
                            <div>
                                <table className="login_width">
                                <tr> <td>
                                <GoogleAuthSignIn/>
                                </td> </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            
            </div>
        )
    }
}

export default Login_Page;