import React from 'react'
import './About.css'
import DP from './OwnDP.png'
import { BsLinkedin } from 'react-icons/bs'
import { FaGithubSquare } from 'react-icons/fa'


const About = () => {
    return (
        <div className="aboutMain">
            <div className="child">
                <div className="childleft">
                    <img src={DP} width="320px" alt="Profile" />
                </div>
                <div className="childright">
                    <div className="content">
                        <h1> Rohit Tiwari </h1>
                        <p>I am currently pursuing my Bachelors in Electronics Engineering from Kamla Nehru Institute Of Technology.I am an enthusiast Sport Programmer and Web developer with knowledge of technology like HTML, CSS, JavaScript, React.js, Node.js, firebase, MongoDB, Express.js etc.</p>
                        <h3>Fullstack Developer and Sport Programmer</h3>
                        <div className="socialAbout">
                            
                            <a href='https://github.com/rohit2403' target="_blank" rel="noreferrer"><FaGithubSquare/> Github</a >
                            <a href="https://www.linkedin.com/in/rohit-tiwari-413835196/" target="_blank" rel="noreferrer"><BsLinkedin/>  LinkedIn</a >
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default About