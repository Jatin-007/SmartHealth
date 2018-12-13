import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

class AdminPanel extends Component {
    render (){
        return (
            <div>
                <h4>Welcome Back Admin!</h4>
                <hr/>
                <div>
                    <Link to="/manage-doctors">
                        <Button className="menu-button" color="inherit">
                            Manage Doctors
                        </Button>
                    </Link>
                    <Link to="/manage-patients">
                        <Button className="menu-button" color="inherit">
                            Manage Patients
                        </Button>
                    </Link>
                    <Link to="/manage-inventory">
                        <Button className="menu-button" color="inherit">
                            Manage inventory
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default AdminPanel;