import React, {Component} from 'react';
import PasswordProfile from './PasswordProfile';
import {database} from '../../firebase/config';
import {auth} from '../../firebase';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select, MenuItem } from '@material-ui/core';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
const maritalState = ["Single", "Married", "Divorced", "Widowed", "Seperated"];

class PatientProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            address1: "",
            address2: "",
            city: "", 
            province: "", 
            dob: "", 
            email: "", 
            first_name: "", 
            gender: "", 
            last_name: "", 
            marital_status: "", 
            phone: "",
            title: "",

            expiry_date: "",
            insurance_number: "",
            in_name: "",

            address: "",
            mobile: "",
            em_name: "",
            relationship:""
        }
    }

    componentDidMount(){
        const {detail_user_profile} = this.props;
        
        if(detail_user_profile){
        const {personal_information, insurance_information, medications, emergency_contact, common_health_information} = detail_user_profile;
        const {address1, address2, city, province, dob, email, first_name, gender, last_name, marital_status, phone, title} = personal_information;
        const {expiry_date, insurance_number,} = insurance_information;
        const {address, mobile, relationship} = emergency_contact;
        const em_name = emergency_contact.name;
        const in_name = insurance_information.name;


        this.setState({
            address1, address2, city, province, dob, email, first_name, gender, last_name, marital_status, phone, title,
            expiry_date, in_name, insurance_number,
            address, mobile, em_name, relationship
        })
        }
    }

    selectCountry(val){
        this.setState({country: val})
    }

    selectProvince(val){
        this.setState({province: val})
    }

    onSubmit(e){
        const {
            address1, address2, city, province, dob, email, first_name, gender, last_name, marital_status, phone, title,
            expiry_date, insurance_number,
            address, mobile, relationship
        } = this.state;

        e.preventDefault();
        const name = this.state.first_name + " " + this.state.last_name;
        auth.updateUserProfile(name).then(() => {
            console.log('works');
        });

        const uid = this.props.user_profile.uid;

        const personal_information = {
            
                personal_information: {
                    title,
                    first_name,
                    last_name,
                    gender,
                    marital_status,
                    email,
                    phone,
                    dob,
                    address1,
                    address2,
                    city,
                    province,
                }
            
        }

        const data_for_user_types = {
            [uid]: {
                name: first_name,
                type: "PATIENT",
                gender: this.state.gender,
            }
        }

        const patients_list_data = {
            [uid]:{
                name,
                gender: this.state.gender,
            }
        }

        const up_insurance_information = {
            insurance_information:{
                insurance_number,
                name: this.state.in_name,
                expiry_date,
            }
        };

        const up_emergency_contact = {
            emergency_contact: {
                name: this.state.em_name,
                relationship,
                address,
                mobile,
            }
        };

        database.ref().child(`/USERS/PATIENTS/detail_patients_list/${uid}`).update(personal_information);
        database.ref().child('/USERS/users_type/').update(data_for_user_types);
        database.ref().child('/USERS/PATIENTS/patients_list').update(patients_list_data);
        database.ref().child(`/USERS/PATIENTS/detail_patients_list/${uid}`).update(up_insurance_information);
        database.ref().child(`/USERS/PATIENTS/detail_patients_list/${uid}`).update(up_emergency_contact);
    }

    renderPatientForm(){
        const {detail_user_profile} = this.props;

        const {personal_information, insurance_information, medications, emergency_contact, common_health_information} = detail_user_profile;
        const {address1, address2, city, province, dob, email, first_name, gender, last_name, marital_status, phone, title} = personal_information;
        const {expiry_date, insurance_number} = insurance_information;
        const {address, mobile, relationship} = emergency_contact;
        const em_name = emergency_contact.name;
        const in_name = insurance_information.name;
       
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="new-doctor-div">
                        <h3>Personal Information</h3>
                        <hr/> 
                        <div>
                            <label>Title</label>
                            <Select
                                value={this.state.title || title}
                                onChange={e => this.setState({title: e.target.value})}
                            >
                                <MenuItem value="Mr.">Mr.</MenuItem>
                                <MenuItem value="Ms.">Ms.</MenuItem>
                                <MenuItem value="Mrs.">Mrs.</MenuItem>
                            </Select>
                        </div>          
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
                            <label>Gender</label>
                            <Select
                                value={this.state.gender || gender}
                                onChange={e => this.setState({gender: e.target.value})}
                            >
                                <MenuItem value="Mr.">Male</MenuItem>
                                <MenuItem value="Ms.">Female</MenuItem>
                                <MenuItem value="Mrs.">Prefer not to answer</MenuItem>
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
                                value={this.state.address1 || address1}
                                onChange={e => this.setState({address1: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        
                        <div>
                            <TextField
                                label="address"
                                value={this.state.address2 || address2}
                                onChange={e => this.setState({address2: e.target.value})}
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
                                value = {this.state.country || " "}
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
                        <h3>Update Emergency Contact Information</h3>
                        <hr/>           
                        <div>
                            <TextField
                                label="name"
                                value={this.state.em_name || em_name}
                                onChange={e => this.setState ({em_name: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Relation"
                                value={this.state.relationship || relationship}
                                onChange={e => this.setState ({relationship: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Address"
                                value={this.state.address || address}
                                onChange={e => this.setState ({address: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Mobile"
                                value={this.state.mobile || mobile}
                                onChange={e => this.setState ({mobile: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </div>
                    <div className="new-doctor-div">
                        <h3>Update Insurance Information </h3>
                        <hr/>           
                        <div>
                            <TextField
                                label="name on insurance card-"
                                value={this.state.in_name || in_name}
                                onChange={e => this.setState ({in_name: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Insurance number"
                                value={this.state.insurance_number || insurance_number}
                                onChange={e => this.setState ({insurance_number: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Expiry date"
                                value={this.state.expiry_date || expiry_date || " "}
                                onChange={e => this.setState ({expiry_date: e.target.value})}
                                fullWidth
                                margin="normal"
                            />
                        </div>

                        <Button type="submit" variant="contained" color="primary">Update profile</Button>

                    </div>
                </form>
            </div>
        )
    }

    render(){

        return (
            <div>
                {this.renderPatientForm()}
                <PasswordProfile/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile,
    } = state.authReducer;

    return {
        user_profile
    }
}

export default connect(mapStateToProps)(PatientProfile);