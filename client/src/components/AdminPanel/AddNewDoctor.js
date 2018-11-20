import React, {Component} from 'react';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';
import {Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddNewDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            
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

    renderForm(){
        return (
            <div>
                <form>
                    <div className="new-doctor-div">
                        <h3>Personal Information</h3>
                        <hr/>           
                        <div>
                            <TextField
                                label="First name"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Last name"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Marital Status"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="email"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="address"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                            label="Birthdate"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                defaultValue="2017-05-24"
                                type="date"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="city"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="province"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="country"
                                // value{this.state.name}
                                // onChange={this.handleChange('name')}
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
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Field of Study"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Year"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
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
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                label="Summary of Experience"
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
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