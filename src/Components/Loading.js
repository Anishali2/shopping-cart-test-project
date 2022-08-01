import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json';
import { useNavigate } from 'react-router-dom';
export default function Loading() {
    const navigate = useNavigate()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    React.useEffect(() => {
      setTimeout(() => {
        navigate("/")
      }, 2700);
    }, [])
    
    return (
      <div style={{marginTop:100}}>
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    );
  }