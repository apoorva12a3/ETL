import React from 'react'
import { Navigate } from 'react-router-dom'; 
import Hero from '../components/Hero'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'



export default function Home1() {
    const accessToken=sessionStorage.getItem("jwtToken");
    if(!accessToken){
        return <Navigate to="/" />
      }
    return (
        <div>
            {/* <Navbar /> */}
            <Hero />
            <Main />
            <Footer />
        </div>
    )
}