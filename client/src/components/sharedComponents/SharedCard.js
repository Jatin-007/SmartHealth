import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import doctor_image from '../../assets/doctor-image.jpg';
import DoctorsList from '../PatientPanel/DoctorsList';

import {connect} from 'react-redux';
import {chooseSpeciality} from '../../actions/authActions';

class SharedCard extends Component {

    handleClick(val){
        this.props.chooseSpeciality(val);
        return <div>
                TEST
            </div>
    }
 
    render(){
        const {profile} = this.props; 

        const renderProfile =() => {
            return Object.keys(profile).map(val => {
                return (
                    <Card className="doctor-card-div" key={val}>
                        <CardActionArea>
                            <CardMedia className="doc-image">
                                <img src = {doctor_image} alt="test"/>
                            </CardMedia>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {val.toUpperCase()}
                            </Typography>
                            <Typography component="p">
                                {profile[val].summary}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className="card-action-button-div">
                            <Button size="small" color="primary" onClick={() => this.handleClick(val)}>
                            Select
                            </Button>
                        </CardActions>
                    </Card>
                )
            })
        }

        return (
            <div className="book-appointment-div">
                {renderProfile()}
            </div>   
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chooseSpeciality: (val) => {
            dispatch(chooseSpeciality(val));
        },
    }
}

export default connect(null, mapDispatchToProps)(SharedCard);