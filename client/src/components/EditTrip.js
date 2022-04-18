import React, {useState, useEffect} from 'react'
import axios from "axios"
import FileBase64 from "react-file-base64";
import {useNavigate, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import styles from './EditTrip.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import FormTrip from "./FormTrip";


const EditTrip = () => {

    const {id} = useParams();
    const [errors, setErrors] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [trip, setTrip] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
        axios.get(`http://localhost:8000/api/trips/${id}`)
        .then((res) => {
            console.log(res.data);
            setTrip(res.data);
            // setTitle(res.data.title);
            // setDescription(res.data.description);
            // setLocation(res.data.location);
            // setImage(res.data.image);
            setLoaded(true);
        })

    }, [])



    const editTrip = (tripParam) => {
        axios.put(`http://localhost:8000/api/trips/${id}`, tripParam)        
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/home");
        })
        .catch((err) => console.log(err))
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
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button>
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>

        {loaded &&
        <FormTrip 
        onSubmitProp = {editTrip} 
        initialTitle = {trip.title}
        initialDescription = {trip.description}
        initialLocation = {trip.location}
        initialSelectedFile = {trip.selectedFile}
        errors = {errors}
        btnText = "Edit Trip"
        /> 
        }
        
        
    </div>
)
}

export default EditTrip