import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class PatientPanel extends Component {
    render () {
        const { isRegistered } = this.props;

        if (!isRegistered) {
            return <Redirect to="/register-patient"/>
        }

        return (
            <div>
                {
                    isRegistered &&
                    <div className="patient-registered-div">
                        <Link to="book-appointment">
                            <Button variant="outlined" color="primary" >
                                Book Appointment
                            </Button>
                        </Link>
                    </div>
                }
            </div>
        )
    }
}

export default PatientPanel;