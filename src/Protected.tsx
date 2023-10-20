import {useEffect} from 'react';
import React, { ReactElement } from "react";
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
    Component: React.FC;
  }
    const Protected: React.FC<ProtectedProps> = ({ Component }) => {
  const navigate=useNavigate();
  useEffect(()=>{
    let login = localStorage.getItem('login');
    if(!login){
        navigate('/');
    }
  })
  return (
    <>
      <Component />
    </>
  );
};
export default Protected;
