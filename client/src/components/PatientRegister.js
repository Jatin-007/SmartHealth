import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import {database} from '../firebase/config';
import {connect} from 'react-redux';
import getAge from 'get-age';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


class PatientRegister extends Component {

    constructor(props){
        super(props);

        this.state = {
            title:"",
            first_name: "",
            last_name: "",
            gender: "",
            marital_status: "",
            email: "",
            phone: "",
            dob: undefined,
            address1: "",
            address2: "",
            city: "",
            province: "",
            renderRedirect: false,
        };
    }

    handleSubmit(e){
        e.preventDefault();
        const { user_profile }= this.props
        const uid = this.props.user_profile.uid;
        const get_age = getAge(this.state.dob);

        const data_for_user_types = {
            [uid]: {
                name: user_profile.displayName || this.state.first_name,
                type: "PATIENT",
                gender: this.state.gender,
                age: get_age
            }
        }

        const personal_information = {
            [uid]: {
                personal_information: {
                    title: this.state.title,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    gender: this.state.gender,
                    marital_status: this.state.marital_status,
                    email: this.state.email,
                    phone: this.state.phone,
                    dob: this.state.dob,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    city: this.state.city,
                    province: this.state.province,
                }
            }
        }

        const full_name = this.state.first_name + " " + this.state.last_name;

        const patients_list_data = {
            [uid]:{
                name: full_name,
                gender: this.state.gender
            }
        }

        // creating the users_type
        database.ref().child('/USERS/users_type/').update(data_for_user_types);
        // adding information to the patients
        database.ref().child('/USERS/PATIENTS/detail_patients_list').update(personal_information);
        database.ref().child('/USERS/PATIENTS/patients_list').update(patients_list_data);
        this.setState({renderRedirect: true});
    }

    displayForm(){

        const {
            first_name,
            last_name,
            email,
            phone,
            dob,
            address1,
            address2,
            city,
            province
        } = this.state;

        return (
            <div>
                <div>
                    <h3>Welcome to the app</h3>
                    <h5>Before proceeding further, please fill out the below form</h5>
                </div>
            <div className="patient-register-form">
                <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <label>Title</label>
                            <Select
                                value={this.state.title}
                                onChange={e => this.setState({title: e.target.value})}
                            >
                                <MenuItem value="Mr.">Mr.</MenuItem>
                                <MenuItem value="Ms.">Ms.</MenuItem>
                                <MenuItem value="Mrs.">Mrs.</MenuItem>
                            </Select>
                        </div>

                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="First Name"
                                margin="normal"
                                value={first_name}
                                onChange={e => this.setState({first_name: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="Last name"
                                margin="normal"
                                value={last_name}
                                onChange={e => this.setState({last_name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label>Gender</label>
                            <Select
                                value={this.state.gender}
                                onChange={e => this.setState({gender: e.target.value})}
                            >
                                <MenuItem value="Mr.">Male</MenuItem>
                                <MenuItem value="Ms.">Female</MenuItem>
                                <MenuItem value="Mrs.">Prefer not to answer</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <label>marital status</label>
                            <Select
                                value={this.state.marital_status}
                                onChange={e => this.setState({marital_status: e.target.value})}
                            >
                                <MenuItem value="Married">Married</MenuItem>
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Divorced">Divorced</MenuItem>
                                <MenuItem value="Widowed">Widowed</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="email"
                                margin="normal"
                                value={email}
                                onChange={e => this.setState({email: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="Primary phone number"
                                margin="normal"
                                value={phone}
                                onChange={e => this.setState({phone: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="Date of Birth"
                                margin="normal"
                                type="date"
                                // value={dob}
                                selected={dob}
                                onChange={e => this.setState({dob: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="address"
                                margin="normal"
                                value={address1}
                                onChange={e => this.setState({address1: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="continue address"
                                margin="normal"
                                value={address2}
                                onChange={e => this.setState({address2: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="city"
                                margin="normal"
                                value={city}
                                onChange={e => this.setState({city: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="province"
                                margin="normal"
                                value={province}
                                onChange={e => this.setState({province: e.target.value})}
                            />
                        </div>
                        <Button variant="outlined" className="patient-register-form-button" disabled={Object.values(this.state).includes("")} size="medium" color="primary" type="submit">
                            Submit and Proceed
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

    render(){

        return (
            <div>
                {this.state.renderRedirect && <Redirect to="/insurance-information"/>}
                {this.displayForm()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile
    } = state.authReducer;

    return {
        user_profile
    }
}

export default connect(mapStateToProps)(PatientRegister);