import React,{useState, useEffect} from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
//import { Typography, Container, Grow, Grid } from '@mui/material';
import moment from "moment";
import {useNavigate} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material';

const AllUsers = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/allUsers"
        )
        .then((res) => {
            console.log(res)
            console.log(res.data)
            setAllUsers(res.data)  
    //         allUsers?.forEach(user => {     
    //     // console.log(user.username)          
    //     if(username === user.username) {
    //         console.log(user)
    //         setUserDetails(user)
    //     }    
    // })         
        })
        .catch((err) => console.log(err))
    }, [])


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
                        <Navbar.Brand className="mx-5 text-primary">Dream Pray Travel</Navbar.Brand>   
                        <Navbar.Collapse className="d-flex justify-content-end">                            
                            {/* <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <Link to = {"/add"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Link>
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button> */}
                            <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button>                              
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>

        {allUsers.map((alluser,index) => {
            return (
                    <> 
                    <img src={alluser.avatar} height="50px" width="50px"></img>                 
                    <p>{alluser.email}</p>
                    <p>{alluser.bio}</p>
 
                    
                    </>
                    )            
        })}
    
    </div>
)
}

export default AllUsers