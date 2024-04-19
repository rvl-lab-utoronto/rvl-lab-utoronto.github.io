import React,{Component} from 'react'
import { useEffect } from 'react';

const Error404 = () => {
  useEffect(() => {
    window.location.href = '/404.html'; // Specify the path to your static 404 page
  }, []);

  return null; // Returns null because we're redirecting
};

export default Error404;
