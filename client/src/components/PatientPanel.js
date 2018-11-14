import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import DoctorProfile from './DoctorPanel/DoctorProfile';
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
                    <div>
                            <Link to="book-appointment">
                                <Button variant="outlined" color="primary" >
                                    Book Appointment
                                </Button>
                            </Link>
                        <DoctorProfile/>
                    </div>
                }
            </div>
        )
    }
}

export default PatientPanel;