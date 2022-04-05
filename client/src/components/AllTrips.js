import axios from 'axios'
import React, {useEffect} from 'react'
import {Link} from "react-router-dom"
//import { Typography, Container, Grow, Grid } from '@mui/material';
import moment from "moment";
//import {useNavigate} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
//import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome } from '@fortawesome/free-solid-svg-icons'
import styles from './AddTrip.module.css';

const AllTrips = (props) => {

    const {trips, setTrips} = props;

    //const navigate = useNavigate();

    useEffect (() => {
        axios.get("http://localhost:8000/api/trips")
        .then((res) => {
            console.log(res.data);
            setTrips(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

    const deleteTrip = (idFromDelete) => {        
        axios.delete(`http://localhost:8000/api/trips/${idFromDelete}`)
        .then((res) =>{
            console.log(res);
            console.log(res.data);
            //deleting from DOM
            setTrips(trips.filter(trip => trip._id !== idFromDelete))
        })
        .catch((err) => console.log(err))
        }

return (
    <div>
        
        {
            trips.map((trip,index) => {
                return (
                    <>
                    <Navbar bg="light" expand="lg" fixed="top" className="mb-10"> 
                    <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>
                    <Link to = {"/"} style={{textDecoration: "none", color:"gray"}}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                    <Link to = {"/add"} style={{textDecoration: "none", color:"gray"}}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Link>
                    <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />                    
                    <Button variant="outline-success">Search</Button>
                    </Form>               
                    </Navbar>
                    
                    <Card key={index} border="light" style={{marginTop:"100px"}} className="w-50 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded">                
                    <Card.Title className="mt-2" style={{letterSpacing: "2px"}}><Link to = {`/${trip._id}`} >{trip.title}</Link></Card.Title> 
                    <Link to = {`/edit/${trip._id}`} style={{textDecoration: "none", color:"gray"}}><FontAwesomeIcon icon={faEdit} style={{display:"inline"}}></FontAwesomeIcon></Link> 
                    <button style={{color:"gray",border:"none", background:"white",width:"10px"}} onClick={(e) =>{deleteTrip(trip._id)}}><FontAwesomeIcon icon={faTrashCan} style={{display:"inline"}}></FontAwesomeIcon></button>                             
                    <Card.Subtitle className="my-2">{trip.location}</Card.Subtitle>  
                    <Card.Subtitle className="mb-3">Posted: {moment(trip.postedAt).fromNow()}</Card.Subtitle>
                    <img src={trip.selectedFile} width="400" height="300"></img>                         
                    <Card.Text className="mt-3">{trip.description.substring(0,300)} ...</Card.Text>     
                    <Card.Subtitle style={{letterSpacing: "4px", textDecoration: "none"}} className="mx-auto mb-3"><Link to = {`/${trip._id}`} style={{textDecoration: "none", color:"gray"}}> CONTINUE READING</Link></Card.Subtitle> 
                    <div style={{backgroundColor: "#53c3b5", width: "60px", height:"2px", margin:"auto"}}></div>                                                    
                    </Card>
                </>
                )
                
        })

        }    
    </div>
)
}

export default AllTrips