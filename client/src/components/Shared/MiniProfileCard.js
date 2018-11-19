import React, {Component} from 'react';

class MiniProfileCard extends Component {

    renderShareProfile(){
        const {objkey, val} = this.props;
        console.log('asd', val);
        console.log('asd', objkey);
    }

    render(){
        const {objkey} = this.props;
        return (
            <div className="mini-profile-card">
                <h2>{objkey}</h2>
                <hr/>
                {this.renderShareProfile()}
            </div>
        )
    }
}

export default MiniProfileCard;