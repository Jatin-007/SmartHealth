import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PatientProfileCard from './PatientProfileCard';
import {database} from '../../firebase/config';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class DetailPatientProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            dose: "",
            frequency: "",
            medication_name: "",
            
            allergies: "",
            blood_group: "",
            height: "",
            weight: "",
        }
    }

    componentDidMount(){
        
        const {selected_patient_profile} = this.props;
        
        const {medications, common_health_information} = selected_patient_profile;


        if(medications || common_health_information){
            this.setState({
                dose: medications.dose,
                frequency: medications.frequency,
                medication_name: medications.medication_name,

                allergies: common_health_information.allergies,
                blood_group: common_health_information.blood_group,
                height: common_health_information.height,
                weight: common_health_information.weight,
            })
        }
    }

    componentWillUnmount(){

    }

    async handleSubmit(e){
        const {selected_patient_profile_uid} = this.props;

        e.preventDefault();

        const common_health_information = {
            common_health_information: {
                height: this.state.height ? this.state.height : "",
                weight : this.state.weight ? this.state.weight : "",
                blood_group: this.state.blood_group ? this.state.blood_group : "",
                allergies: this.state.allergies ? this.state.allergies : "",
            }
        }

        const medications = {
            dose: this.state.dose || "",
            frequency: this.state.frequency || "",
            medication_name: this.state.medication_name || "",
        }

        const value = {
            common_health_information,
            medications
        }

        await database.ref().child(`/USERS/PATIENTS/detail_patients_list/${selected_patient_profile_uid}`).update(value);
    }

    renderInformation(){
        const {selected_patient_profile} = this.props;
        const {personal_information} = selected_patient_profile;
        const first_name = personal_information.first_name;

        return (
            <div>
                <h2>Medical Information / History</h2>

                <div className="doctor-appointment-form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <TextField
                                id="standard-multiline-static"
                                label="Current medication"
                                margin="normal"
                                fullWidth
                                value={this.state.medication_name}
                                onChange={(e) => this.setState({medication_name: e.target.value})}
                            />    
                        </div>

                        <div>
                            <TextField
                                id="standard-name"
                                label="Dose?"
                                margin="normal"
                                fullWidth
                                disabled= {!this.state.medication_name}
                                value={this.state.dose}
                                onChange={(e) => this.setState({dose: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Frequency"
                                margin="normal"
                                fullWidth
                                disabled= {!this.state.medication_name}
                                value={this.state.frequency}
                                onChange={(e) => this.setState({frequency: e.target.value})}
                            />
                        </div>
                           
                           <br/>
                           <h3>Allergies to Patient</h3>
                           <hr/>
                            
                        <div>
                            <div>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Allergies"
                                    margin="normal"
                                    fullWidth
                                    value={this.state.allergies}
                                    onChange={(e) => this.setState({allergies: e.target.value})}
                                />    
                            </div>

                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Height (cms)"
                                    margin="normal"
                                    fullWidth
                                    value={this.state.height}
                                    onChange={(e) => this.setState({height: e.target.value})}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Weight (pounds)"
                                    margin="normal"
                                    fullWidth
                                    value={this.state.weight}
                                    onChange={(e) => this.setState({weight: e.target.value})}
                                />
                            </div>
                        </div>

                            <Button variant="contained" type="submit" color="primary">
                                Update {first_name}'s Information
                            </Button>
                    </form>
                </div>

            </div>
        )

    }

    handleBookAppointment(){
        return (
            <Link to="/book-appointment">
                <Button>Create a new appointment</Button>
            </Link>
        )
    }

    render (){
        const {selected_patient_profile} = this.props;

        if(!selected_patient_profile){
            return <Redirect to="/home"/>
        }

        else {
            return (
                <div> 
                    <PatientProfileCard user = {selected_patient_profile}/>
                    {this.renderInformation()}
                    {this.handleBookAppointment()}
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    const {
        user_type,
        selected_patient_profile,
        selected_patient_profile_uid,
    } = state.authReducer;

    return {
        user_type,
        selected_patient_profile,
        selected_patient_profile_uid,
    }
}

export default connect(mapStateToProps)(DetailPatientProfile);