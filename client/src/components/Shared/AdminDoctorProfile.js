import React, {Component} from 'react';
import PasswordProfile from './PasswordProfile';
import {database} from '../../firebase/config';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select, MenuItem } from '@material-ui/core';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
const maritalState = ["Single", "Married", "Divorced", "Widowed", "Seperated"];

class AdminDoctorProfile extends Component {
    constructor(props){
        super(props);

        this.state = {

            address: "",
            city: "",
            country: "",
            province: "",
            dob:"",
            email: "",
            first_name: "",
            last_name: "",
            maritalStatus: "",

            field_of_study: "",
            specialization: "",
            summary: "",
            uni_name: "",
            year_of_study: "",
            years_of_exp: "",

        }
    }

    selectCountry(val){
        this.setState({country: val})
    }

    selectProvince(val){
        this.setState({province: val})
    }

    componentWillMount(){
        const {detail_user_profile} = this.props;
        const personal_information = detail_user_profile.personal_information;
                const work = detail_user_profile.work;

                const {address, city, country, province, dob, email, first_name, last_name, maritalStatus} = personal_information;
                const {field_of_study, specialization, summary, uni_name, year_of_study, years_of_exp} = work;

                this.setState({
                    address, city, country, province, dob, email, first_name, last_name, maritalStatus,
                    field_of_study, specialization, summary, uni_name, year_of_study, years_of_exp,
                })
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const {
            first_name,
            last_name,
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

        const {user_profile, user_type} = this.props;

        if(user_profile){
        const uid = user_profile.uid;
        console.log(uid);

        if(user_type === "DOCTOR"){

            const detail_doctor_data = {
                [uid] : {
                    personal_information: {
                        first_name,
                        last_name,
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
                    first_name,
                    last_name,
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

            const name = `${first_name} ${last_name}`;

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

        else if(user_type === "ADMIN"){
            const detail_user_data = {
                [uid] : {
                    personal_information: {
                        first_name,
                        last_name,
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

            const name = `${first_name} ${last_name}`;

            const user_type_data = {
                [uid]: {
                    name,
                    type: "ADMIN"
                }
            }

            database.ref('/USERS/ADMIN/detail_user_data/').update(detail_user_data);
            database.ref(`/USERS/users_type/`).update(user_type_data);
        }
    }
    }


    renderProfile(detail_user_profile){
        if(detail_user_profile){
                const personal_information = detail_user_profile.personal_information;
                const work = detail_user_profile.work;

                const {address, city, country, province, dob, email, first_name, last_name, maritalStatus} = personal_information;
                const {field_of_study, specialization, summary, uni_name, year_of_study, years_of_exp} = work;

                return (
                <form onSubmit={this.onSubmit}>
                    <div className="new-doctor-div">
                        <h3>Personal Information</h3>
                        <hr/>           
                        <div>
                            <TextField
                                label="First name"
                                value={this.state.first_name || first_name}
                                onChange={e => this.setState({first_name: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Last name"
                                value={this.state.last_name || last_name}
                                onChange={e => this.setState({last_name: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>

                        <div>
                            <Select
                                placeholder="Marital Status"
                                value={this.state.maritalState || maritalState || " "}
                                onChange={e => this.setState({maritalState: e.target.value})}
                            >
                            {maritalState.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                            </Select>
                        </div>
                        
                        <div>
                            <TextField
                                label="email"
                                value={this.state.email || email}
                                onChange={e => this.setState({email: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        
                        <div>
                            <TextField
                                label="address"
                                value={this.state.address || address}
                                onChange={e => this.setState({address: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>

                        <div>
                            <TextField
                            label="Birthdate"
                                selected={this.state.dob || dob || " "}
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
                                value = {this.state.country || country}
                                onChange={val => this.selectCountry(val)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <RegionDropdown
                                label="province"
                                country={this.state.country}
                                value={this.state.province || province || " "}
                                onChange={val => this.selectProvince(val)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="city"
                                value={this.state.city || city }
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
                                value={this.state.uni_name || uni_name}
                                onChange={e => this.setState ({uni_name: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Field of Study"
                                value={this.state.field_of_study || field_of_study}
                                onChange={e => this.setState ({field_of_study: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Year"
                                value={this.state.year_of_study || year_of_study}
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
                                value={this.state.specialization || specialization}
                                onChange={e => this.setState ({specialization: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Years of experience"
                                value={this.state.years_of_exp || years_of_exp}
                                onChange={e => this.setState ({years_of_exp: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Summary of Experience"
                                value={this.state.summary || summary}
                                onChange={e => this.setState ({summary: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>

                        <Button type="submit" variant="contained" color="primary">Update profile</Button>

                    </div>
                </form>
                )
        }
    }

    
    render(){
        const {detail_user_profile} = this.props;

        return (
            <div>
                {this.renderProfile(detail_user_profile)}
                <PasswordProfile/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile, user_type
    } = state.authReducer;

    return {
        user_profile, user_type            
    }
}

export default connect(mapStateToProps)(AdminDoctorProfile);