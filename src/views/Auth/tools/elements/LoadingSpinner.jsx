// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'
import { HashLoader, GridLoader, MoonLoader, FadeLoader } from 'react-spinners';

const LoadingSpinner = (props) => {
    return (
        <div className="loading-spinner">
            <div className='loding_spinner_icon'>
                <FadeLoader loading color="#3e8030" />
                {props.text ?
                    <h4>{props.text}</h4>
                    :
                    ""
                }
            </div>
        </div>
    );
};

export default LoadingSpinner;
