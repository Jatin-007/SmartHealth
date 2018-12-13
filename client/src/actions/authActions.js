import {database} from '../firebase/config';

export function userAuth(values){
    return {
        type: 'USER_AUTH',
        payload: values
    }
}

export function userTypeAction(user_data, uid){
    
    let user_type = null;
    if(user_data[uid]){
        user_type = user_data[uid].type;
    }
    else if(!user_data[uid]){
        user_type = 'PATIENT';
    }
    
    return {
        type: "USER_TYPE",
        payload: user_type
    }
}

export function chooseSpeciality(val){
    let data = {};
    database.ref(`USERS/DOCTOR/specialization/${val}`).on('value', (snapshot) => {
        data = snapshot.val();
    })

    // chooseSpeciality
    return {
        type: "CHOOSE_SPECIALITY",
        payload: data,
        speciality_selected: val,
    }
}

// this is the list of all uids which are added whenever a new patient registers
export function renderPatientList(val){
    return {
        type: "RENDER_PATIENT_LIST",
        payload: val,
    }
}

// this is the list which is shown in doctor panel for all the registered patients
export function displayPatients(payload){
    return {
        type: "DISPLAY_PATIENTS",
        payload,
    }
}

export function detailUserProfile(val) {
    return {
        type: "DETAIL_USER_PROFILE",
        payload: val
    }
}

export function selectedPatientProfile (profile , uid) {
    return {
        type: "SELECTED_PATIENT_PROFILE",
        payload: profile,
        patient_uid: uid,
    }
}

export function selectedDoctorProfile (uid, detail_profile) {

    return {
        type: "SELECTED_DOCTOR_PROFILE",
        uid,
        detail_profile
    }
}

export function doctorBookedSlots (booked_slots) {
    // holds all booked slots which needs to be disabled during book appointment

    return {
        type: "DOCTOR_BOOKED_SLOTS",
        booked_slots
    }
}