import React, { useState } from 'react'
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom"
import './Login.css'
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const login = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            navigate("/")
        } catch (error) {
            toast.error(error.message.slice(15), {
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
            <ToastContainer/>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='loginForm'>
                <h3 id='loginhead'>Login Here</h3>

                <label className='lbl' >Email</label>
                <input
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                    className='loginInp' type="text" placeholder="Email" />

                <label className='lbl' >Password</label>
                <input
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                    className='loginInp' type="password" placeholder="Password"  />

                <button className='loginBTN' onClick={login}>SignIn</button>

                <NavLink to='/register' id='createAcc'>Create account?</NavLink>
            </div>
        </>
    )
}

export default Login