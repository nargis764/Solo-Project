import React,{useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome } from '@fortawesome/free-solid-svg-icons'

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
    

    return (
    <div>
        <Navbar bg="light" expand="lg" fixed="top">       
            <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>  
            <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>                       
        </Navbar>
        <Link to = {"/home"}>Go back to my homepage</Link>
        <Card style={{marginTop:"100px"}} className="w-75 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded">
            <Card.Title className="mx-auto">{trip.title}</Card.Title>            
            <p className="mx-auto">{trip.location}</p>
            <Card.Img src={trip.selectedFile} height="auto" className="w-75 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded"></Card.Img>    
            <p className="w-75 mx-auto">{trip.description}</p>                
            <Link to = {`/edit/${id}`}>Edit</Link>
        </Card>        
    </div>
)
}

export default ViewTrip