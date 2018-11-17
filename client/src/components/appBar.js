import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
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
            <Link to="/update-profile"><Button className="menu-button" color="inherit" onClick={() => auth.signOut()}>Update Profile</Button></Link>
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
            <AppBar position="static">
                
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" color="inherit">
                    {
                        this.props.user_profile ? 
                        <Link to="/home">Smart Health</Link> : 
                        <Link to="/">Smart Health</Link>
                        }
                    </Typography>
                    {this.authentication()}
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
