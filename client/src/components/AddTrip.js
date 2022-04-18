import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import styles from './AddTrip.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
//import {faHome } from '@fortawesome/free-solid-svg-icons'
import FormTrip from "./FormTrip"
    

const AddTrip = (props) => {

    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate(); 

    const createTrip = (tripParams) => {
        
        axios.post("http://localhost:8000/api/trips", 
        tripParams,

        { withCredentials:true }

        )
        .then((res) => {
            console.log(res.data);
            navigate("/home")
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data);
            setErrors(err.response.data.errors);
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

                
        <FormTrip 
        initialTitle=""
        initialDescription = ""
        initialLocation = ""
        initialSelectedFile = ""
        errors={errors}
        onSubmitProp = {createTrip}
        btnText = "Add Trip"
        />

    </div>
)
}

export default AddTrip