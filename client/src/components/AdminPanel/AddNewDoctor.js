import React, {Component} from 'react';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';
import {Redirect} from 'react-router-dom';

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
            <div className="new-doctor-div">
                <p>test</p>
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