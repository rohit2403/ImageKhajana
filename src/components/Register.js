import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [passtype, setPasstype] = useState('password')

    function showPassword() {
        setPasstype('text')
    }

    function hidePassword() {
        setPasstype('password')
    }

    const register = async (e) => {
        console.log(name);
        console.log(registerEmail);
        console.log(registerPassword);
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );

            await updateProfile(auth.currentUser, { displayName: name })

            navigate('/uploadprofile')
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='loginForm'>
                <h3 id='loginhead'>Register Here</h3>

                <label className='lbl' >Name</label>
                <input
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    className='loginInp' type="text" placeholder="Name" id="username" />

                <label className='lbl' >Email</label>
                <input
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                    className='loginInp' type="text" placeholder="Email" id="username" />

                <label className='lbl' >Password</label>
                <input
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                    className='loginInp' type={passtype} placeholder="Password" id="password" />
                <div>
                    <span onClick={showPassword} style={{ cursor: 'pointer', color:"blue" }} >Show Password</span>
                    <span onClick={hidePassword} style={{ cursor: 'pointer', marginLeft:"30px", color:"blue" }}>Hide Password</span>
                </div>

                <button className='loginBTN' onClick={register}>SignUp</button>
                <NavLink to='/login'>Have account?</NavLink>
            </div>
        </>

    )
}

export default Register