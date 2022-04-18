import React, {useState} from 'react';
import SignIn from "../components/SignIn";
import Register from "../components/Register";
// import MapContainer from "../components/MapContainer";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from './SignInSignUp.module.css';


const SignInSignUp = (props) => {

const [showSignIn, setShowSignIn] = useState(false);
const [showSignUp, setShowSignUp] = useState(false);

const handleCloseSignIn = () => setShowSignIn(false);
const handleShowSignIn = () => setShowSignIn(true);

const handleCloseSignUp = () => setShowSignUp(false);
const handleShowSignUp = () => setShowSignUp(true);


    return (
        <div>
            <div>
                {/* <img src="https://cdn.pixabay.com/photo/2019/12/12/15/16/bangladesh-4690978_960_720.jpg"                    
                className="w-100" height="auto"
                style = {{objectFit:"cover"}}></img> */}

                <Navbar bg="light" expand="lg" fixed="top"> 
                    <Container className="justify-content-between">
                        <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>   
                        <Navbar.Collapse className="justify-content-end">    

                        <button className={styles.button2} variant="primary" onClick={handleShowSignUp}>
                            Sign Up
                        </button>
            
                        <Button className={styles.button1} variant="primary" onClick={handleShowSignIn}>
                            Log In
                        </Button>                        
                            
                        </Navbar.Collapse>
                    </Container>                                             
                </Navbar>

                <img src="https://cdn.pixabay.com/photo/2019/12/12/15/16/bangladesh-4690978_960_720.jpg" className={styles.img} />

                <div className={styles.centered}>
                    <h1>Lorem ipsum dolor sit amet</h1>
                    <h2>Lorem ipsum dolor sit amet</h2>
                </div>
            
            </div>
            
            {/* <MapContainer/> */}
        
            <SignIn handleClose = {handleCloseSignIn} handleShowSignIn = {handleShowSignIn} handleShowSignUp = {handleShowSignUp} show = {showSignIn} setShow = {setShowSignIn}/> 
            <Register handleClose = {handleCloseSignUp} handleShowSignIn = {handleShowSignIn} handleShowSignUp = {handleShowSignUp} show = {showSignUp} setShow = {setShowSignUp}/>
        </div>
    )
}


export default SignInSignUp;
