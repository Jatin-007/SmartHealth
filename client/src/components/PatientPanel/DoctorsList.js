import React, {Component} from 'react';
import {connect} from 'react-redux';
import {database} from '../../firebase/config';

import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {selectedDoctorProfile, doctorBookedSlots} from '../../actions/authActions';

class DoctorsList extends Component {

    constructor(props){
        super(props);

        this.state = {
            renderRedirect: false,
            data: "",
            filtered_data: ""
        }
    }

    async handleClick(uid){

        await database.ref(`USERS/DOCTOR/detail_user_data/${uid}`).on('value', (snapshot) => {
            const detail_profile = snapshot.val();
            this.props.selectedDoctorProfile(uid, detail_profile);
            this.setState({renderRedirect: true});
        })

        await database.ref(`USERS/DOCTOR/availability/${uid}`).on('value', (snapshot) => {
            const booked_slots = snapshot.val();
            this.props.doctorBookedSlots(booked_slots);
        })
    }

    renderTable() {
        const {list_of_doctors} = this.props;

        return Object.keys(list_of_doctors).map((data, index) => {
                const innervalue = list_of_doctors[data];
                    if( typeof(innervalue) === "object"){
                        const name = `${innervalue.first_name} ${innervalue.last_name}`;
                        const email = `${innervalue.email}`;
                        const city = `${innervalue.city}`;
                        const years_of_experience = `${innervalue.years_of_exp}`;
                    
                    return (
                    <TableRow key={index} className="detail-patient-div" onClick={() => this.handleClick(data)}>
                         <TableCell>
                         {index + 1}
                         </TableCell>
                         <TableCell>{name}</TableCell>
                         <TableCell>{email}</TableCell>
                         <TableCell>{city}</TableCell>
                         <TableCell>{years_of_experience}</TableCell>
                     </TableRow>
                    )
                }
        })
    }

    filterList(e){

        const data = this.state.data
        const query = e.target.value.toLowerCase();

        let filtered_data = Object.values(data).filter(vals => {
            const nested_obj = vals;
            const personal_information = nested_obj.personal_information;
            const work = nested_obj.work;
            const specialization = work.specialization;

            console.log(data, vals);

            if(personal_information.first_name.toLowerCase().search(query) !== -1){
                return data;
            }
            if(personal_information.last_name.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(personal_information.email.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(personal_information.city.toLowerCase().search(query) !== -1){
                return data;
            }
            else if(specialization.toLowerCase().search(query) !== -1){
                return data;
            }
        });

        this.setState({filtered_data});
    }

    componentDidMount(){
        const {list_of_doctors} = this.props;
        if(list_of_doctors){
            this.setState({
                data: list_of_doctors,
                filtered_data: list_of_doctors
            })
        }
    }

    renderForm = () => {
        return (
            <div>
                <form>
                    <TextField
                        id="outlined-full-width"
                        label="Search"
                        style={{ margin: 8 }}
                        placeholder="Search for doctor by their name email, city or specialization"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.filterList.bind(this)}
                    />
                </form>
            </div>
        )
    }

    displayList(){

        const {speciality_selected, list_of_doctors} = this.props;
        return (
            <div>
                <h2>Showing a list of {speciality_selected} doctors</h2>
                <hr/>
                
                <div className="display-table-list">
                    <Paper>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Index</TableCell>
                                <TableCell>Doctor Name</TableCell>
                                <TableCell>email</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Years of experience</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.renderTable()}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                
            </div>
        )
    }

    render (){

        const {speciality_selected} = this.props;
        console.log(this.state);


        if(!speciality_selected) {
            return <Redirect to="/book-appointment"/>
        }
        if(this.state.renderRedirect === true){
            return <Redirect to="/doctor-profile"/>
        }
        
        return (
            <div>
                {this.displayList()}
            </div>
        )
    }
};

const mapStateToProps = state => {
    const {
        speciality_selected,
        list_of_doctors,
    }=state.authReducer;

    return {
        speciality_selected,
        list_of_doctors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedDoctorProfile: (uid, detail_profile) => {
            dispatch(selectedDoctorProfile(uid, detail_profile));
        },
        doctorBookedSlots: (booked_slots) => {
            dispatch(doctorBookedSlots(booked_slots));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsList);