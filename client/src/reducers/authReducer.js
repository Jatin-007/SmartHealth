import extend from 'extend';

const initialState = {
    user_profile: null,
    user_type: null,
    // for chooseSpeciality action
    speciality_selected: "", 
    list_of_doctors: "",
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

            console.log(action.speciality_selected, ":", action.payload);

            return extend ({}, state, {
                speciality_selected: action.speciality_selected,
                list_of_doctors: action.payload,
            })

        default:
            return state;    
    }
}