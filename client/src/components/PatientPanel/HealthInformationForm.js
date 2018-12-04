import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import {database} from '../../firebase/config';
import {connect} from 'react-redux';

class SecondaryInformationForm extends Component {
    constructor(props){
        super(props);

        this.state = {
                height: "",
                weight: "",
                blood_group: "",
                allergies: "",
        
            medications: {
                medication_name: "",
                dose: "",
                frequency:""
            },
            renderRedirect: false,
        };
    }

    onSubmit(e){
        e.preventDefault();
        const user_profile  = this.props.user_profile;
        const uid = user_profile.uid;

        const {height, weight, blood_group, allergies, medications} = this.state;

        const value = {
            
            common_health_information: {
                height,
                weight,
                blood_group,
                allergies},
            medications    
        }

        database.ref().child(`/USERS/PATIENTS/detail_patients_list/${uid}`).update(value);
        this.setState({renderRedirect : true});
    }

    renderSkipMethod(){
        const {user_profile} = this.props;
        const uid = user_profile.uid;
        
        const value = false;

        database.ref().child(`/USERS/PATIENTS/detail_patients_list/${uid}`).update(value);
    }

    render(){

        const {medications} = this.state;

        return (
            <div>
                    {this.state.renderRedirect && <Redirect to="/home"/>}
                <div className="login-body">
                    <form onSubmit={this.onSubmit.bind(this)}>
                            <h2>Health Information</h2>
                            <div>
                                <TextField
                                    id="standard-bare"
                                    placeholder="height"
                                    margin="normal"
                                    value={this.state.height}
                                    onChange={e => this.setState({height: e.target.value})}
                                />
                            </div>

                            <div>
                                <TextField
                                    id="standard-bare"
                                    placeholder="weight"
                                    margin="normal"
                                    value={this.state.weight}
                                    onChange={e => this.setState({weight: e.target.value})}
                                />
                                <TextField
                                    id="standard-bare"
                                    placeholder="blood-group"
                                    margin="normal"
                                    value={this.state.blood_group}
                                    onChange={e => this.setState({blood_group: e.target.value})}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="standard-bare"
                                    placeholder="allergies"
                                    margin="normal"
                                    value={this.state.allergies}
                                    onChange={e => this.setState({allergies: e.target.value})}
                                />
                            </div>
                            
                            <h4>MEDICATION</h4>
                            
                            <div>
                                <TextField
                                    id="standard-bare"
                                    placeholder="medication name"
                                    margin="normal"
                                    value={this.state.medications.medication_name}
                                    onChange={e => this.setState({medications :{ ...medications, medication_name: e.target.value}})}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="standard-bare"
                                    placeholder="address"
                                    margin="normal"
                                    type="date"
                                    value={this.state.medications.dose}
                                    onChange={e => this.setState({medications :{ ...medications, dose: e.target.value}})}
                                />
                            </div>
                            
                            <div>
                                <TextField
                                    id="standard-bare"
                                    placeholder="address"
                                    margin="normal"
                                    type="Frequency"
                                    value={this.state.medications.frequency}
                                    onChange={e => this.setState({medications :{ ...medications, frequency: e.target.value}})}
                                />
                            </div>
                            
                            <Button variant="outlined" className="patient-register-form-button" size="medium" color="danger" onClick={this.renderSkipMethod}>
                                Skip this Information
                            </Button>
                            
                            <Button variant="outlined" className="patient-register-form-button" size="medium" color="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                </div>
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