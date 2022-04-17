import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import moment from "moment";
import {useNavigate} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
//import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material';
import styles from './AllTrips.module.css';


const AllTrips = (props) => {

    const {trips, setTrips} = props;
    const [user, setUser] = useState({});
   // const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    

    useEffect (() => {
        axios.get("http://localhost:8000/api/trips")
        .then((res) => {
            //setIsLoading(true);
            console.log(res.data);            
            setTrips(res.data);
           // setIsLoading(false);
        })
        .catch((err) => console.log(err))
    }, [])


    const deleteTrip = (idForDelete) => {        
        axios.delete(`http://localhost:8000/api/trips/${idForDelete}`)
        .then((res) =>{
            console.log(res);
            console.log(res.data);
            //deleting from DOM
            setTrips(trips.filter(trip => trip._id !== idForDelete))
        })
        .catch((err) => console.log(err))
        }

        useEffect(() => {
            axios.get("http://localhost:8000/api/users",

            { withCredentials: true }
            
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setUser(res.data);
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
        {/* !trips.length ? <CircularProgress /> : (  */}

        <Navbar bg="light" expand="lg" fixed="top"> 
                    <Container>
                        <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>   
                        <Navbar.Collapse className="d-flex justify-content-end">                            
                            {/* <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <Link to = {"/add"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Link>
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button> */}
                            <Link to = {"/home"} style={{textDecoration: "none", color:"gray"}} ><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                            <Link to = {"/add"} style={{textDecoration: "none", color:"gray"}} className="mx-5"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Link>
                            <button onClick={logoutHandler} style={{color:"gray",border:"none", background:"white",width:"10px"}} className="me-5"><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button> 
                            <Link to={`/user/profile/${user.username}`}><img style={{border:"1px solid gray", borderRadius:"50%", height:"35px", width:"35px"}} src={user.avatar}></img></Link>                             
                        </Navbar.Collapse>
                    </Container>                                             
        </Navbar>


        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                height={500}
                style = {{objectFit:"cover"}}
                src="https://peakvisor.com/img/news/mount-rainier-national-park.jpg"
                alt="First slide"
            />           
            </Carousel.Item>

            <Carousel.Item>
                <img
                className="d-block w-100"
                height={500}
                style = {{objectFit:"cover"}}
                src="https://d3mqmy22owj503.cloudfront.net/05/500005/images/poi/picture-lake-mount-shuksan/698-best-road-trips-in-washington-state--mount-baker-highway--picture-lake-1.jpg"
                alt="Second slide"
            />    
            </Carousel.Item> 

            <Carousel.Item>
                <img
                className="d-block w-100"
                height={500}
                style = {{objectFit:"cover"}}      
                src="https://2m2q113e0bb82dsmjh4b8hcg-wpengine.netdna-ssl.com/wp-content/uploads/2022/01/Upper-Antelope-Canyon.jpg"
                alt="Third slide"
                />   
            </Carousel.Item>
        </Carousel>

        <div style={{marginBottom:"40px"}}></div>         

    
                
        {
            trips.map((trip,index) => {
                return (
                    <>                  
                    
                    <Card key={index} border="light" className="w-50 mx-auto mt-20 shadow p-3 mb-5 bg-white rounded">
                        <div className="d-flex justify-content-between">
                            {/* <img style={{border:"1px solid gray", borderRadius:"50%", height:"35px", width:"35px"}} src={trip.postedBy?.avatar}></img> */}
                            <Link to={`/user/profile/${trip.postedBy?.username}`}> {trip.postedBy?.username}</Link> 
                    

                            {/* the loggedin user can only edit or delete their post */}
                            {trip.postedBy?.username === user.username &&

                            <div className="d-flex justify-content-around">
                                <Link to = {`/edit/${trip._id}`} style={{textDecoration: "none", color:"gray", marginLeft:"5px", marginRight:"5px"}}><FontAwesomeIcon icon={faEdit} style={{display:"inline"}}></FontAwesomeIcon></Link>
                                <button style={{color:"gray",border:"none", background:"white", width:"10px", marginRight:"5px"}} onClick={(e) =>{deleteTrip(trip._id)}}><FontAwesomeIcon icon={faTrashCan} style={{display:"inline"}}></FontAwesomeIcon></button>                             
                            </div>  

                            } 


                        </div>    
                                
                        <Card.Title className="mt-2" style={{letterSpacing: "2px"}}><Link to = {`/${trip._id}`}>{trip.title}</Link></Card.Title> 
                        <Card.Subtitle className="mb-3">Posted: {moment(trip.postedAt).utcOffset('-08:00').fromNow()}</Card.Subtitle>
                        <Card.Subtitle className="my-2">{trip.location}</Card.Subtitle> 
                        <Card.Img src={trip.selectedFile}></Card.Img>                         
                        <Card.Text className="mt-3">{trip.description.substring(0,300)} ...</Card.Text>     
                        <Card.Subtitle style={{letterSpacing: "4px", textDecoration: "none"}} className="mx-auto mb-3"><Link to = {`/${trip._id}`} style={{textDecoration: "none", color:"gray"}}> CONTINUE READING</Link></Card.Subtitle> 
                        <div style={{backgroundColor: "#53c3b5", width: "60px", height:"2px", margin:"auto"}}></div>                                                    
                    </Card>
                </>
                )
                
        })

        } 
        
        {/* )   */}
    </div>
)
}

export default AllTrips