import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';

import {Redirect} from 'react-router-dom';

class SecondaryInformationForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            insurance_information: {
                insurance_number: "",
                name: "",
                expiry_date: "",
            },

            emergency_contact: {
                name: "",
                relationship: "",
                address: "",
                mobile: ""
            },
            renderRedirect:false,
        };
    }

    onSubmit(e){
        e.preventDefault();
        const{user_profile} = this.props;
        const uid = user_profile.uid;

        const value = this.state;
        database.ref().child(`/USERS/PATIENTS/detail_patients_list/${uid}`).update(value);
        this.setState({renderRedirect: true});
    }

    render(){

        const {insurance_information, emergency_contact} = this.state;

        return (
            <div className="login-body">
                {this.state.renderRedirect && <Redirect to="/health-information"/>}
                <form onSubmit={this.onSubmit.bind(this)}>
                        <h2>Insurance information</h2>
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
                            <TextField
                                id="standard-bare"
                                placeholder="card's expiry date"
                                margin="normal"
                                value={insurance_information.expiry_date}
                                onChange={e => this.setState({insurance_information :{ ...insurance_information, expiry_date: e.target.value}})}
                            />
                        </div>

                        <h2>Emergency Contact information</h2>

                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="name"
                                margin="normal"
                                value={emergency_contact.name}
                                onChange={e => this.setState({emergency_contact :{ ...emergency_contact, name: e.target.value}})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="relationship"
                                margin="normal"
                                value={emergency_contact.relationship}
                                onChange={e => this.setState({emergency_contact :{ ...emergency_contact, relationship: e.target.value}})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="address"
                                margin="normal"
                                type="date"
                                value={emergency_contact.address}
                                onChange={e => this.setState({emergency_contact :{ ...emergency_contact, address: e.target.value}})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-bare"
                                placeholder="mobile"
                                margin="normal"
                                value={emergency_contact.mobile}
                                onChange={e => this.setState({emergency_contact :{ ...emergency_contact, mobile: e.target.value}})}
                            />
                        </div>
                        
                        <Button variant="outlined" className="patient-register-form-button" size="medium" color="primary" type="submit">
                            Submit and Proceed
                        </Button>
                    </form>
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

export default connect(mapStateToProps)(SecondaryInformationForm);