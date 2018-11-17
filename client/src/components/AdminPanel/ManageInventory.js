import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {database} from '../../firebase/config';

class ManageInventory extends Component {
    constructor(props){
        super(props);

        this.state = {
            inventory: [],
        }
    }

    async componentWillMount(){
        const {user_type} = this.props;

        if(user_type === "ADMIN"){
            await database.ref('/USERS/ADMIN/inventory').on('value', (snapshot) => {
                this.setState({inventory: snapshot.val()});
            })
        }
    }

    test(){
        const {user_type} = this.props;
        if(user_type){
        if(user_type === "ADMIN"){

            const inventory_list = this.state.inventory;
            console.log(inventory_list);

            return Object.keys(inventory_list).map(med => {
                return (
                    <ul>
                    <li>{med}</li>
                    <li>{inventory_list[med]}</li>
                    </ul>
                )
            })
            
        }

        else if(user_type === "PATIENT" || user_type === "DOCTOR")
        {
            return <Redirect to="/404" />
        }
    }
}

    render() {
        const {user_profile, user_type} = this.props;

            return (
                <div>
                    {this.test()}
                </div>
            )
    }
}

const mapStateToProps = state => {
    const {
        user_profile,
        user_type,
    }= state.authReducer;

    return {
        user_profile,
        user_type,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps)(ManageInventory);