import React,{Component} from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';




const Error404 = () => {
  useEffect(() => {
    window.location.href = `${process.env.PUBLIC_URL}/404.html`; // Specify the path to your static 404 page
  }, []);

  return null; // Returns null because we're redirectin


  
};

export default Error404;

