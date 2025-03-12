import React,{Component} from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';



const Error404 = () => {
  return (
    <iframe
      src={`${process.env.PUBLIC_URL}/404.html`} // Ensure the file is inside "public/"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="404 Not Found"
    />
  );
};

export default Error404;