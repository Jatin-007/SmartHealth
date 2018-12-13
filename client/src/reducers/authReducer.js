import extend from 'extend';

const initialState = {
    user_profile: null,
    user_type: "",
    render_patient_list: [],
    // for chooseSpeciality action
    speciality_selected: "", 
    list_of_doctors: "",
    // showcasing the profile of the selected doctor by a patient
    selected_doctor_uid: "",
    selected_doctor_profile: "", 
    selected_doctor_booked_slots: "",
    // for doctors
    patient_list_collections: [],
    selected_patient_profile: "",
    selected_patient_profile_uid: "",
    // detail profile
    detail_user_profile: "",

}

export default function (state = initialState, action){
    switch(action.type){

        case 'USER_AUTH':
            return extend ({}, state, {
                user_profile: action.payload
            });

            // user_type_data holds the bulk data of the type of users available in the app
        case 'USER_TYPE':
            return extend ({}, state, {
                user_type: action.payload
            })

        case "CHOOSE_SPECIALITY":

            return extend ({}, state, {
                speciality_selected: action.speciality_selected,
                list_of_doctors: action.payload,
            })

        case "RENDER_PATIENT_LIST":
            return extend({}, state, {
                render_patient_list: action.payload,
            })
            
        case "DISPLAY_PATIENTS":
            return extend({}, state, {
                patient_list_collections: action.payload
            }) 
            
        case "DETAIL_USER_PROFILE":
            return extend({}, state, {
                detail_user_profile: action.payload
            })
            
        /// handling patient profile clicked by the doctor

        case "SELECTED_PATIENT_PROFILE":
            return extend({}, state, {
                selected_patient_profile: action.payload,
                selected_patient_profile_uid: action.patient_uid,
            })

        case "SELECTED_DOCTOR_PROFILE":
         
            return extend ({}, state, {
                selected_doctor_uid: action.uid,
                selected_doctor_profile: action.detail_profile, 
            })

        case "DOCTOR_BOOKED_SLOTS":
            return extend({}, state, {
                selected_doctor_booked_slots: action.booked_slots,
            })    

        default:
            return state;    
    }
}