import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import DoctorProfileCard from './DoctorProfileCard';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import Button from '@material-ui/core/Button';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import addMonths from 'date-fns/add_months';
var setHours = require('date-fns/set_hours')
var setMinutes = require('date-fns/set_minutes')


class DetailDoctorProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            reason: "",
            followups: "",
            startDate: new Date(),
            page: 1,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    renderDoctorProfile(){
        const {selected_doctor_profile} = this.props;
        return <DoctorProfileCard user={selected_doctor_profile}/>
    }

    renderSlots(){
        const {selected_doctor_booked_slots} = this.props;


        if(!selected_doctor_booked_slots) {
            return null;
        }
        else {
            Object.keys(selected_doctor_booked_slots).map(objkeys => {
                let objvals = selected_doctor_booked_slots[objkeys];
                console.log(objvals);
            })
        }
    }

    renderForm(){
        this.setState({page: 2});
    }

    handleChange(date){
        this.setState({startDate: date});
    }

    renderInitialForm(){
        return (
            <div>
                <h2>Book Appointment</h2>
                <p>to book an appointment, please fill out some information below</p>

                <div className="doctor-appointment-form">
                    <form onSubmit={this.renderForm()}>
                        <div>
                            <TextField
                                id="standard-multiline-static"
                                label="Reason for Booking appointment"
                                margin="normal"
                                fullWidth
                                value={this.state.reason}
                                onChange={(e) => this.setState({reason: e.target.value})}
                            />    
                        </div>

                        <div>
                            <TextField
                                id="standard-name"
                                label="Did you had any previous followups before ?"
                                margin="normal"
                                fullWidth
                                value={this.state.followups}
                                onChange={(e) => this.setState({followups: e.target.value})}
                            />
                        </div>

                        <div>
                            <p>Select appointment time</p>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                excludeTimes={[setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()}
                                maxDate={addMonths(new Date(), 3)}
                                minTime={setHours(setMinutes(new Date(), 0), 9)}
                                maxTime={setHours(setMinutes(new Date(), 30), 17)}
                            />
                        </div>

                            <Button variant="contained" type="submit" color="primary">
                                Next
                            </Button>
                    </form>
                </div>

            </div>
        )
    }

    renderPayment() {
        return (
            <div>
                <h2>Following are some charges for your appointment</h2>
                <hr/>
                <div>
                    <h4>Appointment Fee: </h4>
                    <h5>$50 CAD</h5>
                </div>

                <div>
                    <h3>Select Payment Method</h3>
                </div>
            </div>
        )
    }

    render (){
        const {
            selected_doctor_uid,
        } = this.props; 

        {this.renderSlots()}

        if(!selected_doctor_uid) {
            return <Redirect to= "/book-appointment"/ >
        }   

        else {
            return (
                <div>
                    {
                        this.state.page === 1 &&
                        this.renderInitialForm()
                    }
                    {
                        this.state.page === 2 &&
                        this.renderPayment()
                    }
                    {this.renderDoctorProfile()}
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    const {
        selected_doctor_uid,
        selected_doctor_profile,
        selected_doctor_booked_slots
    } = state.authReducer;

    return {
        selected_doctor_uid,
        selected_doctor_profile,
        selected_doctor_booked_slots
    }
}

export default connect(mapStateToProps)(DetailDoctorProfile);