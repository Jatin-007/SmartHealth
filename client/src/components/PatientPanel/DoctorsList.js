import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class DoctorsList extends Component {

    displayList(){
        console.log('works');
        return (
            <div>
                test
            </div>
        )
    }

    render (){
        const {speciality_selected, list_of_doctors} = this.props;

        // const renderList = speciality_selected ? this.displayList() : <Redirect to="/book-appointment"/>
        return (
            <div>
                {this.displayList()}
                {speciality_selected}
            </div>
        )
    }
};

const mapStateToProps = state => {
    const {
        speciality_selected,
        list_of_doctors,
    }=state.authReducer;

    console.log(speciality_selected);

    return {
        speciality_selected,
        list_of_doctors,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         chooseSpeciality: (val) => {
//             dispatch(chooseSpeciality(val));
//         },
//     }
// }

export default connect(mapStateToProps)(DoctorsList);