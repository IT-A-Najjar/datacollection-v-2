import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../lottie/erroe404.json';
import { useLocation } from 'react-router-dom';
export default function Error404() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <Lottie 
	    options={defaultOptions}
        width={40+'%'}
      />
    </div>
  )
}