import React, {Component} from 'react';
import { database } from '../../firebase/config';
import SharedCard from '../sharedComponents/SharedCard';

class BookAppointment extends Component {
    constructor(props){
        super(props);

        this.state = {
            doctors: "",
        }
    }

    componentDidMount(){
        database.ref('USERS/DOCTOR/specialization').on('value', (snapshot) => {
            this.setState({doctors: snapshot.val()});
        })
    }

    render (){
        const {doctors} = this.state;

        return (
            <div>
                <div>
                <h3>Select a specialization</h3>
                <hr/>
            </div>
                <SharedCard profile={doctors}/>
            </div>
        )
    }
}

export default BookAppointment;