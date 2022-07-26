import React, {useEffect } from 'react'
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate } from 'react-router-dom';
import AllFolder from './AllFolder';
import NavBar from './NavBar';

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser == null) {
        navigate("/login");
        return;
      }
    });
  },[])

  return (
    <>
      <NavBar/>
      <AllFolder/>
    </>
  )
}

export default Home