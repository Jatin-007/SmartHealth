import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import DoctorProfile from './DoctorPanel/DoctorProfile';
import Button from '@material-ui/core/Button';

class PatientPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderRedirect: false,
        }
    }

    componentDidUpdate(){
        const {isRegistered} = this.props;

        if(!isRegistered){
            this.setState({renderRedirect: true});
        }
    }

    render () {
        const {isRegistered} = this.props;
        
        return (
            <div>
                {this.state.renderRedirect && <Redirect to="/register-patient"/>}
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