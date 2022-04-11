import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Modal from "react-bootstrap/Modal";


const Register = (props) => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const {show, setShow, handleShow, handleClose} = props;

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            {
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
            },
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                // setUser({
                //     username: "",
                //     email: "",
                //     password: "",
                //     confirmPassword: "",
                // });
                setConfirmReg(
                    "Thank you for Sign in",
                );
                setErrors({}); 
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })

    }


    return (
        <div>     

            {/* using the Modal to display the Sign up pop up */}

            <Modal showOverlay={false} show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title style={{margin:"auto"}}>
                        Sign up
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}

                    <form onSubmit={register}>
                        <FormGroup>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            />

                            {errors.username ? (
                                <span className="error-text">
                                    {errors.username.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />

                            {errors.email ? (
                                <span className="error-text">
                                    {errors.email.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            {errors.password ? (
                                <span className="error-text">
                                    {errors.password.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword ? (
                                <span className="error-text">
                                    {errors.confirmPassword.message}
                                </span>
                            ) : null}
                            
                        </FormGroup>

                        <button style={{background:"#0d6efd", width:"470px", height: "40px", color:"#ffffff", borderRadius: "5px", border:"none"}}>Sign Up</button>
            
                    </form>
        
                </Modal.Body>


                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}>SignIn</Button> 
                </Modal.Footer> */}
    
            </Modal> 
    

        </div>
    )
}


export default Register;