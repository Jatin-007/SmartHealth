import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Landing from './components/Landing';
import Home from './components/home';

import {connect} from 'react-redux';
import {userAuth} from './actions/authActions';

import {firebase} from './firebase'

import './styles/styles.css';
// import './styles/style.scss';
import ButtonAppBar from './components/appBar';
import PasswordForget from './components/passwordForget';
import PatientRegister from './components/PatientRegister';
import ManageDoctors from './components/AdminPanel/ManageDoctors';
import ManageInventory from './components/AdminPanel/ManageInventory';
import SecondaryInformationForm from './components/PatientPanel/SecondaryInformationForm';
import HealthInformation from './components/PatientPanel/HealthInformationForm';
import OrderMedication from './components/PatientPanel/OrderMedication';
import BookAppointment from './components/PatientPanel/BookAppointment';
import DoctorsList from './components/PatientPanel/DoctorsList';
import Profile from './components/Shared/Profile';
import Error404 from './components/Shared/Error404';
import AddNewDoctor from './components/AdminPanel/AddNewDoctor';
import ManagePatients from './components/AdminPanel/ManagePatients';
import DetailPatientProfile from './components/DoctorPanel/DetailPatientProfile';
import DetailDoctorProfile from './components/PatientPanel/DetailDoctorProfile';

class App extends Component {

  componentDidMount(){
    firebase.auth.onAuthStateChanged(user_data => {
      this.props.userAuth(user_data);
    })
  }


  render() {
    return (      
      <div>
        <BrowserRouter>
          <div>
          <ButtonAppBar authUser = {this.props.user_profile}/>
            <Route exact path="/" component= {Landing}/>
            <Route exact path="/register" component= {Register}/>
            <Route exact path="/login" component= {Login}/>
            <Route exact path="/home" component= {Home}/>
            <Route exact path="/password-reset" component= {PasswordForget}/>
            <Route exact path="/register-patient" component= {PatientRegister}/>
            <Route exact path="/manage-doctors" component={ManageDoctors}/>
            <Route exact path="/add-doctors" component={AddNewDoctor}/>
            <Route exact path="/manage-inventory" component={ManageInventory}/>
            <Route exact path="/manage-patients" component={ManagePatients}/>
            <Route exact path="/patient-detail" component={DetailPatientProfile}/>
            <Route exact path="/insurance-information" component={SecondaryInformationForm}/>
            <Route exact path="/health-information" component={HealthInformation}/>
            <Route exact path="/order-medication" component={OrderMedication}/>
            <Route exact path="/book-appointment" component={BookAppointment}/>
            <Route exact path="/choose-doctors" component={DoctorsList}/>
            <Route exact path="/doctor-profile" component={DetailDoctorProfile}/>
            <Route exact path="/update-profile" component={Profile}/>
            <Route exact path="/404" component={Error404}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    user_profile
  } = state.authReducer;

  return {
    user_profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      userAuth: (values) => {
        dispatch(userAuth(values))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


// this is the main page of our app...