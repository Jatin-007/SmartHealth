import React from 'react';
import errorImage from '../../assets/errorImage.png';

const ErrorPage = () => {
    return (
        <div className ="error-page">
            <h2> Whoops! </h2>
            <p>Something went wrong</p>
            <img src={errorImage} alt="test"/>
        </div>
    )
}

export default ErrorPage;