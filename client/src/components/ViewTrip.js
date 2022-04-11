import React,{useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material';

const ViewTrip = () => {

    const [trip, setTrip] = useState({});
    const {id} = useParams();   
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trips/${id}`)
        .then((res) => {
            console.log(res.data);
            setTrip(res.data)
        })
        .catch((err) => console.log(err))
    },[])


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
                    <Container>
                        <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>   
                        <Navbar.Collapse className="d-flex justify-content-end">                            
                            {/* <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <Link to = {"/add"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Link>
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button> */}
                            <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button>                              
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>


        <Card style={{marginTop:"100px"}} className="w-75 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded">
            <Card.Title className="mx-auto">{trip.title}</Card.Title>            
            <p className="mx-auto">{trip.location}</p>
            <Card.Img src={trip.selectedFile} height="auto" className="w-75 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded"></Card.Img> 
            <p className="my-2"> {trip.postedBy?.username}</p>  
            <p className="w-75 mx-auto">{trip.description}</p>                            
            
        </Card>        
    </div>
)
}

export default ViewTrip