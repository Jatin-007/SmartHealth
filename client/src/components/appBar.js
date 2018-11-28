import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {auth} from '../firebase/config';
import {connect} from 'react-redux';

const NavigateNonAuth = () => {
    return (
        <div>
            <Link to="/register"><Button className="menu-button" color="inherit">Register</Button></Link>
            <Link to="/login" ><Button className="menu-button" color="inherit">Sign-in</Button></Link>
        </div>
    )
}

const NavigateAuth = () => {
    return (
        <div>
            <Link to="/update-profile"><Button className="menu-button" color="inherit">Update Profile</Button></Link>
            <Link to="/"><Button className="menu-button" color="inherit" onClick={() => auth.signOut()}>Sign out</Button></Link>
        </div>
    )
}

class ButtonAppBar extends Component {

    authentication() {
        const authUser = this.props.authUser;
        return authUser ? <NavigateAuth/> : <NavigateNonAuth/>;
    }

    render(){
    return (
        <div>
            <AppBar position="static" className="menubar">
                
                <Toolbar>
                    <Typography variant="title" color="inherit" className="title-appbar">
                    {
                        this.props.user_profile ? 
                        <Link to="/home" className="SmartHealth">Smart Health</Link> : 
                        <Link to="/" className="SmartHealth">Smart Health</Link>
                    }
                    </Typography>
                    <div className="secondary-buttons">
                    {this.authentication()}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

};

const mapStateToProps = state => {
    const {user_profile} = state.authReducer;
    return {
        user_profile
    }
}

export default connect(mapStateToProps)(ButtonAppBar);
