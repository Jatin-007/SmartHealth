import React, {Component} from 'react';
import { connect } from 'react-redux';

import {database} from '../../firebase/config';

class OrderMedication extends Component {

        constructor(props){
            super(props);

            this.state = {
                patient_info: {},
                payment: true,
            }
        }
        
        componentDidMount(){
        const {user_profile} = this.props;

        if(user_profile){
            const uid = user_profile.uid;

            database.ref().child(`/USERS/PATIENTS/detail_patients_list/${uid}`).on('value', (snapshot) => {
                this.setState({patient_info: snapshot.val()})
            })
        }
    }

    renderForm(){
        if(this.state.patient_info){
            const {patient_info} = this.state;
            const medication = patient_info.medication;
            const insurance_information = patient_info.insurance_information;

            if(insurance_information){
                this.setState({payment: false});
            }

            return (
                <div>
                    <form>
                        need to create a form....
                    </form>
                </div>
            )
        }
    }

    render (){
        return (
            <div>
                {this.renderForm()}    
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        user_profile,
    } = state.authReducer;

    return {
        user_profile,
    }
}

export default connect( mapStateToProps)(OrderMedication);

// https://material-ui.com/demos/tables/