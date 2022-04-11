import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
//import { Typography, Container, Grow, Grid } from '@mui/material';
import moment from "moment";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material';


const Profile = (props) => {

    const {username} = useParams();
    const [tripListByUser, setTripListByUser] = useState([]);

    const navigate = useNavigate();
    

    useEffect(() => {
        axios.get(`http://localhost:8000/api/tripsbyuser/${username}`,

        { withCredentials: true }  
        
        )
        .then((res) => {
            console.log(res)
            console.log(res.data)
            setTripListByUser(res.data)
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
        !tripListByUser.length ? <CircularProgress /> : ( 

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
        
        <div style={{marginBottom:"100px"}}></div> 

        <div className="d-flex justify-content-between w-75 mx-auto">
            <div>
                {tripListByUser.map((trip,index) => {

            return (
            <>
                <Card key={index} border = "light" className = "mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
                <div className= "d-flex justify-content-between">
                    <Card style = {{border:"none"}}>
                        <Card.Title><Link to = {`/${trip._id}`}>{trip.title}</Link></Card.Title>                
                        <Card.Subtitle>{trip.location}</Card.Subtitle>                
                        <Card.Text className="mx-10">{trip.description}</Card.Text>
                        {/* <Card.Subtitle>Hello, This is {trip.postedBy?.email}</Card.Subtitle> */}
                    </Card>
                    
                    {/* <div>
                        <img src={trip.selectedFile} width="200px" height="150px" className="mt-20 shadow p-2 mb-5 bg-white rounded"></img>        
                    </div>                     */}

                    <Card.Img src={trip.selectedFile} width="200px" height="150px" className="mt-20 shadow p-2 mb-5 bg-white rounded"></Card.Img>

                </div>
                

                </Card>

            </>
            )
        
        
        })

        }
            </div>

            <div>
                <Card className="w-50 mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
                    <Card.Title>Hello, This is {username}</Card.Title>
                    
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Card.Text>

                </Card>
                
            </div>
        

        </div>
        )

    </div>
)
}

export default Profile
