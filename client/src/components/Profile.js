import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import moment from "moment";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material';
import styles from './Profile.module.css';



const Profile = (props) => {

    const {username} = useParams();    
    const [tripListByUser, setTripListByUser] = useState([]);
    const {loggedInUser} = props;
    
    const [userDetails, setUserDetails] = useState({});

    const navigate = useNavigate();    

    
    //retrieving information of all users

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/allUsers"
    //     )
    //     .then((res) => {
    //         console.log(res)
    //         console.log(res.data)
    //         setAllUsers(res.data)  
    //         allUsers?.forEach(currentuser => {     
    //     // console.log(user.username)          
    //     if(username === currentuser.username) {
    //         console.log(currentuser)
    //         setUserDetails(currentuser)
    //     }    
    // })         
    //     })
    //     .catch((err) => console.log(err))
    // }, [])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${username}`)
        .then((res) => {
            setUserDetails(res.data)
        })
        .catch((err) => console.log(err))
    }, [])



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
        
        <Navbar bg="light" expand="lg" fixed="top"> 
                    <Container>
                        <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>   
                        <Navbar.Collapse className="d-flex justify-content-end">                           
                            <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            
                            {username === loggedInUser.username &&
                            <Link to = {"/add"} style={{textDecoration: "none", color:"gray"}} className="me-5"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Link>
                            }
                            
                            <button onClick={logoutHandler} className={styles.btn1}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button>                              
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>

        
        <div style={{marginBottom:"100px"}}></div> 


        
        <div className="d-flex justify-content-between w-75 mx-auto">
            <Container>
                <Row>
                    <Col sm={8}>
                        <div>
                            {tripListByUser?.map((trip,index) => {
                                return (
                                    <>
                                    <Card key={index} border = "light" className = "mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
                                        <Container>
                                            <Row>
                                                <Col sm={8}><Card.Title><Link to = {`/${trip._id}`}>{trip.title}</Link></Card.Title>
                                                <Card.Subtitle>{trip.location}</Card.Subtitle>
                                                <Card.Text className="mx-10">{trip.description.substring(0,200)} ... <Link to = {`/${trip._id}`} style={{textDecoration: "none", color:"gray",letterSpacing: "4px"}}> CONTINUE READING</Link></Card.Text>
                                                </Col>
                                                
                                                <Col sm={4}><Card.Img src={trip.selectedFile}   className="mt-20  shadow p-2 mb-5 bg-white rounded"></Card.Img></Col>
                                            </Row>
                                        </Container>               

                                    </Card>

                                    </>

                                    )                
                    })

        }
                        </div>
                    </Col>



                    <Col sm={4}>
                        <div>
                            <Card className="w-75 mt-20 shadow p-3 mb-5 mx-auto bg-white rounded">
                                <Card.Title>Hello, This is {username}</Card.Title> 
                                <img  src={userDetails?.avatar}  width="50px" height="auto" style={{color:"gray", marginBottom:"5px", borderRadius:"50%"}}></img> 

                                {username === loggedInUser.username &&
                                <Link to = {`/updateuser/${username}`} style={{textDecoration: "none", color:"gray", marginLeft:"5px", marginRight:"5px"}}><FontAwesomeIcon icon={faEdit} style={{display:"inline"}}></FontAwesomeIcon></Link> 
                                }

                                <Card.Subtitle style={{color:"gray", marginBottom:"5px"}}>{userDetails?.email}</Card.Subtitle>
                                <Card.Text>{userDetails?.bio}</Card.Text>
                            </Card>                
                        </div>
                    </Col>

                </Row>

            </Container>           


        </div>

    </div>
)
}

export default Profile