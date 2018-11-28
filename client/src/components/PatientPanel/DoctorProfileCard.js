import React, {Component} from 'react';
import dr_avatar from '../../assets/dr_avatar.png'
  
  
  class Avatar extends Component {
    render() {
          const style = {
            width: this.props.width || 50,
            height: this.props.height || 50,
            backgroundColor: "#d3d3d3",
          }; 

      return (
       <div className="avatar" >
             <img src={dr_avatar} alt="doctor-profile" className={style}/> 
        </div>
      );
    }
  }
  
  class MainPanel extends Component {
    render() {
      const {info} = this.props;
      const personal_information = info.personal_information;
      const work = info.work;

      const name = `${personal_information.first_name} ${personal_information.last_name}`;
      
      return (
       <div>
          <div className="top">
              <Avatar 
              /> 
              <h2>{name}</h2>
              <hr />
              <h3>{personal_information.email}</h3>
              <h4>{personal_information.city}, {personal_information.province}</h4>
              <h5>{personal_information.country}</h5>

          </div>
          
          <div className="bottom">
            <h3>Work Summary</h3>
            <hr />
            <h3>{work.specialization}</h3>
            <h5>Years of experience: {work.years_of_exp}</h5>
            <p>{work.summary}</p>
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
  