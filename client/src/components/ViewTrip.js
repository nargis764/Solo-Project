import React,{useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './ViewTrip.module.css';
import { CircularProgress } from '@mui/material';
import Comments from "./Comments"


const ViewTrip = (props) => {

    const [trip, setTrip] = useState({});
    
    //const [temp, setTemp] = useState("");
   // const [comment, setComment] = useState([]);
    const {id} = useParams(); 
    const navigate = useNavigate();

    // const [text, setText] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:8000/api/trips/${id}`)
        .then((res) => {
            console.log(res.data);
            setTrip(res.data)
        })
        .catch((err) => console.log(err))
    },[])


    // useEffect(() => {
    //     axios.get("http://localhost:8000/weather")
    //     .then((res) => {
    //         console.log(res.data)
    //         setTemp(res.data)
    //     })    
    //     .catch((err) => console.log(err))

    // }, [])


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

    // const postComment = (text,postId) => {
    //     axios.put(`http://localhost:8000/api/comment`,{
    //         text: text,
    //         postId: postId
            
    //     },

    //     { withCredentials:true },

    //     )
    //     .then((res) => {
    //         console.log(res)
    //         console.log(res.data)

    //         const newComment = res.data.comments.map((thistrip) => {
    //             if(thistrip._id === res.data._id) {                                      
    //                 return res.data;
    //             } else {                    
    //                 return thistrip
    //             }                
                
    //         })

    //         console.log(newComment)
    //         setComment({...comment , newComment})
    //     })
        
    // }


    const postComment = (text,postId) => {
        
        axios.put(`http://localhost:8000/api/comment`,{
            text: text,
            postId: postId
            
        },

        { withCredentials:true },

        )
        .then((res) => {
            console.log(res)
            console.log(res.data)

            const newComment = res.data.comments.map((thistrip) => {
                if(thistrip._id === res.data._id) {                                      
                    return res.data;
                } else {                    
                    return thistrip
                }                
                
            })

            // console.log(newComment)
            setTrip({...trip , comments:newComment})            
        })
        
    }



    return (
    <div>
        <Navbar bg="light" expand="lg" fixed="top"> 
                    <Container>
                        <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>   
                        <Navbar.Collapse className="d-flex justify-content-end">      
                    
                            <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button>                              
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>


        <Card style={{marginTop:"100px"}} className="w-75 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded">
            <Card.Title className="mx-auto">{trip.title}</Card.Title> 
            {/* <p>{temp}</p>            */}
            <p className="mx-auto">{trip.location}</p>
            <Card.Img src={trip.selectedFile} height="auto" className="w-75 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded"></Card.Img> 
            <p className="my-2"> {trip.postedBy?.username}</p>  
            <Card.Text className="w-75 mx-auto">{trip.description}</Card.Text>  
            <Card.Text> <div style={{backgroundColor: "lightgray", height:"1px"}} className="w-75 mx-auto"></div></Card.Text> 
            


            {
            trip?.comments?.map((record) => {
                return (  
                    
                        <Card.Text key={record._id} className="w-75 mx-auto bg-light"><span style={{fontWeight:"bold"}}>{record.postedBy?.username} </span>{record.text}</Card.Text>
            )
                                
            })
            
            }

                    
        <Comments tripId={trip._id} onSubmitProp={postComment}/>    
        </Card>  
    

        
    </div>
)
}

export default ViewTrip