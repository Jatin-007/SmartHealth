import extend from 'extend';

const initialState = {
    user_profile: null,
    user_type: "",
    render_patient_list: [],
    // for chooseSpeciality action
    speciality_selected: "", 
    list_of_doctors: "",
    // showcasing the profile of the selected doctor by a patient
    selected_doctor_profile: "", 
    // for doctors
    patient_list_collections: [],
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
            return (extend, {}, state, {
                patient_list_collections: action.payload
            })    

        default:
            return state;    
    }
}