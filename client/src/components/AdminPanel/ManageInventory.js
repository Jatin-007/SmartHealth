import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {database} from '../../firebase/config';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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

    renderTable(){
        const {user_type} = this.props;
        if(user_type){
        if(user_type === "ADMIN"){

            const inventory_list = this.state.inventory;
            console.log(inventory_list);

            return Object.keys(inventory_list).map(med => {
                return (
                    <TableRow key={med}>
                        <TableCell component="th" scope="row">
                        {med}
                        </TableCell>
                        <TableCell numeric>{inventory_list[med]}</TableCell>
                        <TableCell>
                        <Button variant="fab" mini color="secondary" aria-label="Add">
                           <AddIcon />
                        </Button>
                        </TableCell>
                    </TableRow>
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

            return (
                <div>
                    <h2>Available Medication in clinic</h2>
                    <hr/>
                    <div className="display-table-list">
                        <Paper>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Medicine name</TableCell>
                                    <TableCell numeric>Quantity</TableCell>
                                    <TableCell></TableCell>
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