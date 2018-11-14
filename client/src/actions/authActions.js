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

export function chooseSpeciality(val ){
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