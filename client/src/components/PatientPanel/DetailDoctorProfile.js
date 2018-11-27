import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import DoctorProfileCard from './DoctorProfileCard';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format'
import Payment from './Payment'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import addMonths from 'date-fns/add_months';
import { database } from '../../firebase/config';
var setHours = require('date-fns/set_hours')
var setMinutes = require('date-fns/set_minutes')


class DetailDoctorProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            reason: "",
            followups: "",
            startDate: new Date(),
            open: false,
            checked: true,
            insurance_information: "",

            insurance: {
                insurance_number: "",
                name: "",
                expiry_date: "",
            },
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        if(this.props.user_profile){
        const uid = this.props.user_profile.uid;
            await database.ref(`/USERS/PATIENTS/detail_patients_list/${uid}/insurance_information`).on('value', (snapshot) => {
                    this.setState({insurance_information: snapshot.val()});
            })
        }
    }

    renderDoctorProfile(){
        const {selected_doctor_profile} = this.props;
        return <DoctorProfileCard user={selected_doctor_profile}/>
    }

    onClose(e){
        e.preventDefault();
        this.setState({open: false});
    }

    renderSlots = () => {
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

    async handleSubmit(){
        const date = this.state.startDate;
        const uid = this.props.selected_doctor_uid;
        const test = format(date, "MM/DD/YY, HH:mm");

        const val = {
            [uid]: test,
        }
        
        await database.ref(`/USERS/DOCTOR/availability`).update(val);
        this.onClose.bind(this);
    }

    renderForm(){
        console.log('yes');
    }

    handleNext(e){
        e.preventDefault();
        console.log(e);
        this.setState({
            open: true
        })
    }

    handleChange(date){
        const test = format(date, "MM/DD/YY, HH:mm");
        console.log(test);
        this.setState({startDate: date});
        console.log(date);
    }

    renderPayment(){
        return (
            <div>
                <Payment/>
            </div>
        )
    }

    renderInsurance(){
        const {insurance, insurance_information} = this.state;
        console.log(insurance_information);
        
        if(insurance_information){
            return (
                <div className="payment-div">
                    <h3>Pay with your insurance</h3>
                    <hr/>
                    <div>
                        <TextField
                            id="standard-bare"
                            placeholder="Insurance number"
                            margin="normal"
                            value={insurance_information.insurance_number}
                            onChange={e => this.setState({insurance_information :{ ...insurance_information, insurance_number: e.target.value}})}
                        />
                    </div>
    
                    <div>
                        <TextField
                            id="standard-bare"
                            placeholder="Cardholder name"
                            margin="normal"
                            value={insurance_information.name}
                            onChange={e => this.setState({insurance_information :{ ...insurance_information, name: e.target.value}})}
                        />
                        </div>
    
                        <div>
                        <TextField
                            id="standard-bare"
                            placeholder="card's expiry date"
                            margin="normal"
                            value={insurance_information.expiry_date}
                            onChange={e => this.setState({insurance_information :{ ...insurance_information, expiry_date: e.target.value}})}
                        />
                    </div>
    
                </div>
            )
        }
        else {
            return (
                <div className="payment-div">
                    <h3>Pay with your insurance</h3>
                    <hr/>
                    <div>
                        <TextField
                            id="standard-bare"
                            placeholder="Insurance number"
                            margin="normal"
                            value={insurance.insurance_number}
                            onChange={e => this.setState({insurance :{ ...insurance, insurance_number: e.target.value}})}
                        />
                    </div>
    
                    <div>
                        <TextField
                            id="standard-bare"
                            placeholder="Cardholder name"
                            margin="normal"
                            value={insurance.name}
                            onChange={e => this.setState({insurance :{ ...insurance, name: e.target.value}})}
                        />
                        </div>
    
                        <div>
                        <TextField
                            id="standard-bare"
                            placeholder="card's expiry date"
                            margin="normal"
                            value={insurance.expiry_date}
                            onChange={e => this.setState({insurance :{ ...insurance, expiry_date: e.target.value}})}
                        />
                    </div>
    
                </div>
            )
        }
    }

    handleSwitch(){
        this.state.checked === true ? this.setState({checked: false}) : this.setState({checked: true});
    }

    renderModal(){
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.onClose.bind(this)}
                    >
                    <div className="modal-div">
                        <h2>
                        Confirm your appointment
                        </h2>
                        <h4>Booking an appointment costs a nominal flat fee of $100CAD</h4>
                        <hr/>
                        <h3>Select your method of Payment</h3>
                        <Switch
                            checked={this.state.checked}
                            onChange={() => this.handleSwitch()}
                            value="checkedB"
                            color="primary"
                        />
                        
                            <div>
                            {this.state.checked === true &&
                                this.renderPayment()    
                            }

                            {this.state.checked === false &&
                                this.renderInsurance()    
                            }
                            </div>

                         <Button variant="contained" color="secondary" onClick={() => this.handleSubmit()}>
                            Book Appointment!
                        </Button>
                    </div>
                </Modal>
            </div>
        )
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
                                onChange={this.handleChange}
                                dateFormat="MM/DD/YY, HH:mm"
                                selected={this.state.startDate}
                                showTimeSelect
                                excludeTimes={[setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]}
                                minDate={new Date()}
                                maxDate={addMonths(new Date(), 3)}
                                minTime={setHours(setMinutes(new Date(), 0), 9)}
                                maxTime={setHours(setMinutes(new Date(), 30), 17)}
                            />
                        </div>

                            <Button variant="contained" type="submit" color="primary" onClick={(e) => this.handleNext(e)}>
                                Next
                            </Button>
                    </form>
                </div>

            </div>
        )
    }

    render (){
        const {
            selected_doctor_uid,
        } = this.props; 

        console.log(this.state.startDate);

        if(!selected_doctor_uid) {
            return <Redirect to= "/book-appointment"/ >
        }   

        else {
            return (
                <div>
                {this.renderSlots}
                    {this.renderInitialForm()}
                    {this.renderModal()}
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
        selected_doctor_booked_slots,
        user_profile
    } = state.authReducer;

    return {
        selected_doctor_uid,
        selected_doctor_profile,
        selected_doctor_booked_slots,
        user_profile
    }
}

export default connect(mapStateToProps)(DetailDoctorProfile);