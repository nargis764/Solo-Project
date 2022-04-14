import React, {useState} from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import {useNavigate, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import styles from './SetProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
//import {faHome } from '@fortawesome/free-solid-svg-icons'
    

const SetProfile = () => {

    const {username} = useParams();

    const [bio, setBio] = useState("");    
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();



    const updateProfile = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/${username}`, {
            bio: bio,
            avatar: avatar,
            email: email
        })
        .then((res) => {
            console.log(res);
            navigate("/home");
        })
        .catch((err) => {
            console.log(err);
        })
    }


    const logoutHandler = (e) => {
        axios.post("http://localhost:8000/api/users/logout",
        {},

        { withCredentials:true },

        )

        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })

        .catch((err) => console.log(err)
        )

    }


return (
    <div>

        <Navbar bg="light" expand="lg" fixed="top"> 
                    <Container className="justify-content-between">
                        <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>   
                        <Navbar.Collapse className="justify-content-end">                            
                            <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <button onClick = {logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button>
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>

            <Form onSubmit={updateProfile} className={styles.form}>
            {/* <div>
                <label>username</label>
                <input type = "text" value = {username} onChange = {(e) => setUsername(e.target.value)}/>
            </div>     */}
            <Form.Group>
                <Form.Label>About Me</Form.Label>
                <Form.Control 
                type = "text" 
                value = {bio}
                placeholder="About Me" 
                onChange = {(e) => setBio(e.target.value)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Avatar</Form.Label>                
                <Form.Control 
                type = "text" 
                value = {avatar} 
                onChange = {(e) => setAvatar(e.target.value)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>                
                <Form.Control 
                type = "text" 
                value = {email}
                placeholder="Email" 
                onChange = {(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <button>
            Edit Profile
            </button>
        </Form>
    </div>
)
}

export default SetProfile