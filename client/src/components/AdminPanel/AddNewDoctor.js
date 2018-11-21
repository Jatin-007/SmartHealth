import React, {Component} from 'react';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';
import {Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select, MenuItem } from '@material-ui/core';

import {CountryDropdown, RegionDropdown, CountryRegionData} from 'react-country-region-selector';

const maritalState = ["Single", "Married", "Divorced", "Widowed", "Seperated"];

class AddNewDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            maritalState: "",
            dob: undefined,
            country:"",
            province: "",
            city: "",

            uni_name: "",
            field_of_study: "",
            year_of_study: "",

            years_of_exp: "",
            summary: "",

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

    onSubmit(){
        console.log('submit triggers');
        console.log(this.state);
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
                                type="date"
                                value={this.state.dob}
                                onChange={e => this.setState({dob: e.target.value})}
                                fullWidth
                                defaultValue="2017-05-24"
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
                    <Button variant="contained" color="primary">Create new Doctor</Button>
                </form>
            </div>
        )
    }

    render(){
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