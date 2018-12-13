import React, {Component} from 'react';
import people from '../../assets/people.png'
  
  
  class Avatar extends Component {
    render() {
          const style = {
            width: this.props.width || 50,
            height: this.props.height || 50,
            backgroundColor: "#d3d3d3",
          }; 

      return (
       <div className="avatar" >
             <img src={people} alt="patient-profile" className={style}/> 
        </div>
      );
    }
  }
  
  class MainPanel extends Component {
    render() {
      const {info} = this.props;
      const personal_information = info.personal_information;
      const emergency_contact = info.emergency_contact;
      const insurance_information = info.insurance_information;
      const common_health_information = info.common_health_information;
      
      const name = `${personal_information.first_name} ${personal_information.last_name}`;
      
      return (
       <div>
          <div className="top">
              <Avatar 
              /> 
              <h1>{name}</h1>
              {common_health_information.blood_group ? <h5>Blood Group: {common_health_information.blood_group}</h5> : ""}
              <hr />
              <h2>{personal_information.phone} | {personal_information.email}</h2>
              <h4>{personal_information.city}, {personal_information.province}</h4>
          </div>
          
          <div className="bottom">
            <h2>Insurance Information</h2>
            <hr />
            <h3>{insurance_information.name}</h3>
            <h5>{insurance_information.insurance_number}</h5>
            <h5>{insurance_information.expiry_date}</h5>
          </div>
          
          <div className="bottom">
            <h2>Emergency Contact Information</h2>
            <hr />
            <h3>{emergency_contact.name}</h3>
            <h4>{emergency_contact.relationship}</h4>
            <h5>{emergency_contact.mobile}</h5>
          </div>
        </div>
      );
    }
  }
  
  
  class DoctorProfileCard extends Component {
    render() {
        const {user} = this.props;

      return (
        <div id="user-profile">
          <MainPanel info={user} />
        </div>
      )
    }
  }
  
  export default DoctorProfileCard;
  