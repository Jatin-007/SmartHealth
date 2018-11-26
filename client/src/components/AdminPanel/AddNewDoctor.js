import React, {Component} from 'react';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';
import {Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select, MenuItem } from '@material-ui/core';

import {auth} from '../../firebase';
// import * as admin from '../../firebase/adminConfig';

import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';

const maritalState = ["Single", "Married", "Divorced", "Widowed", "Seperated"];

class AddNewDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            dob: undefined,
            address: "",
            maritalState: "",
            country:"",
            province: "",
            city: "",

            uni_name: "",
            field_of_study: "",
            year_of_study: "",

            specialization: "",
            years_of_exp: "",
            summary: "",

            new_doctors_password: "iamanewdoctor",
            new_doctor_uid: "",
            new_doctor_auth: "",
        };
    }

    async componentWillMount(){
        const {user_profile, user_type} = this.props;

        if(user_profile && user_type){
            if(user_type === "ADMIN"){
                // need to change the database route
                await database.ref('/USERS/ADMIN/inventory').on('value', (snapshot) => {
                    this.setState({inventory: snapshot.val()});
                })
            }
            else if(user_type === "PATIENT" || "DOCTOR"){
                return <Redirect to="/404" />
            }
        }
    }

    selectCountry(val){
        this.setState({country: val})
    }

    selectProvince(val){
        this.setState({province: val})
    }

    onSubmit = (e) => {
        e.preventDefault();
        // const {user_profile, user_type} = this.props;

        auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.new_doctors_password).then(
            authUser => {
                console.log(authUser);
                this.setState({new_doctor_uid: authUser.user.uid});
                this.setState({new_doctor_auth: authUser})
            }
        )
        
        if(this.state.new_doctor_auth) {
            const uid = this.state.new_doctor_uid;
            const {firstName,
                lastName,
                email,
                address,
                maritalState,
                dob,
                country,
                province,
                city,
                uni_name,
                field_of_study, 
                year_of_study, 
                specialization, 
                years_of_exp, 
                summary} = this.state;

            const detail_doctor_data = {
                [uid] : {
                    personal_information: {
                        first_name: firstName,
                        last_name: lastName,
                        email,
                        address,
                        maritalState,
                        dob,
                        city,
                        province,
                        country,
                    },
                    work : {
                        uni_name,
                        field_of_study,
                        year_of_study,
                        specialization,
                        years_of_exp,
                        summary,
                    }
                }
            }

            const specialization_data = {
                [uid]: {
                    firstName,
                    lastName,
                    email,
                    city,
                    uni_name,
                    field_of_study,
                    year_of_study,
                    specialization,
                    years_of_exp,
                    summary,
                }
            }

            const name = `${firstName} ${lastName}`;

            const user_type_data = {
                [uid]: {
                    name,
                    type: "DOCTOR"
                }
            }

            database.ref('/USERS/DOCTOR/detail_user_data/').update(detail_doctor_data);
            database.ref(`/USERS/DOCTOR/specialization/${specialization}/`).update(specialization_data);
            database.ref(`/USERS/users_type/`).update(user_type_data);
        }
    }

    renderForm(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="new-doctor-div">
                        <h3>Personal Information</h3>
                        <hr/>           
                        <div>
                            <TextField
                                label="First name"
                                value={this.state.firstName}
                                onChange={e => this.setState({firstName: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Last name"
                                value={this.state.lastName}
                                onChange={e => this.setState({lastName: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>

                        <div>
                            <Select
                                placeholder="Marital Status"
                                value={this.state.maritalState}
                                onChange={e => this.setState({maritalState: e.target.value})}
                            >
                            {maritalState.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                            </Select>
                        </div>
                        
                        <div>
                            <TextField
                                label="email"
                                value={this.state.email}
                                onChange={e => this.setState({email: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        
                        <div>
                            <TextField
                                label="address"
                                value={this.state.address}
                                onChange={e => this.setState({address: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>

                        <div>
                            <TextField
                            label="Birthdate"
                                selected={this.state.dob}
                                onChange={e => this.setState({dob: e.target.value})}
                                fullWidth
                                // defaultValue="2017-05-24"
                                type="date"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <CountryDropdown
                                placeholder="country"
                                value = {this.state.country}
                                onChange={val => this.selectCountry(val)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <RegionDropdown
                                label="province"
                                country={this.state.country}
                                value={this.state.province}
                                onChange={val => this.selectProvince(val)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="city"
                                value={this.state.city}
                                onChange={e => this.setState ({city: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </div>
                    <div className="new-doctor-div">
                        <h3>Latest Education</h3>
                        <hr/>           
                        <div>
                            <TextField
                                label="University name"
                                value={this.state.uni_name}
                                onChange={e => this.setState ({uni_name: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Field of Study"
                                value={this.state.field_of_study}
                                onChange={e => this.setState ({field_of_study: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Year"
                                value={this.state.year_of_study}
                                onChange={e => this.setState ({year_of_study: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </div>
                    <div className="new-doctor-div">
                        <h3>Work Experience</h3>
                        <hr/>           
                        <div>
                            <TextField
                                label="Specialization in-"
                                value={this.state.specialization}
                                onChange={e => this.setState ({specialization: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Years of experience"
                                value={this.state.years_of_exp}
                                onChange={e => this.setState ({years_of_exp: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Summary of Experience"
                                value={this.state.summary}
                                onChange={e => this.setState ({summary: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </div>
                    <Button type="submit" variant="contained" color="primary">Create new Doctor</Button>
                </form>
            </div>
        )
    }

    render(){
        const user_type = this.props.user_type;

        if(user_type !== "ADMIN"){
            return <Redirect to="/home"/>
        }

        return (
            <div>
                <h2>Add a new Doctor here</h2>
                <hr/>
                {this.renderForm()}
            </div>
        )
    }
}

const MapStateToProps = state => {
    const {
        user_profile,
        user_type
    } = state.authReducer;

    return {
        user_profile,
        user_type
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(AddNewDoctor);