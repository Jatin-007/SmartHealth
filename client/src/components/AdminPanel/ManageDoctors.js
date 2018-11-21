import React, {Component} from 'react';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';
import {Link, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class ManageDoctors extends Component {

    async componentWillMount(){
        const {user_profile, user_type} = this.props;

        if(user_profile && user_type){
            if(user_type === "ADMIN"){
                await database.ref('/USERS/ADMIN/inventory').on('value', (snapshot) => {
                    this.setState({inventory: snapshot.val()});
                })
            }
            else if(user_type === "PATIENT" || "DOCTOR"){
                return <Redirect to="/404" />
            }
        }
    }

    render() {
        return (
            <div>
                <h3>Manage Doctors</h3>
                <hr/>
                
                <div>
                    <p>CRUD OPERATIONS HERE</p>
                </div>

                <div>
                    <hr/>
                    <Link to="/add-doctors">
                        <Button variant="contained" color="default">
                            Add a Doctor
                            <CloudUploadIcon/>
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

const MapStateToProps = state => {
    const {
        user_profile,
        user_type
    } = state.authReducer;

    return {
        user_profile,
        user_type
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(ManageDoctors);