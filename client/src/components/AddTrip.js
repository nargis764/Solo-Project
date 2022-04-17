import React, {useState} from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import styles from './AddTrip.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashCan, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
//import {faHome } from '@fortawesome/free-solid-svg-icons'
    

const AddTrip = (props) => {

    const [tripDetails, setTripDetails] = useState({title:"", description:"", location:"",longitude:"", latitude:"", selectedFile:""})
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [location, setLocation] = useState("");
    // const [selectedFile, setSelectedFile] = useState("");
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate(); 

    const createTrip = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/trips", 
        tripDetails,

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

                
        <Form onSubmit = {createTrip} method="post" className={styles.form}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value = {tripDetails.title} onChange={(e) => setTripDetails({...tripDetails, title: e.target.value})}/>
            </Form.Group>

            {
                errors.title? 
                <p style={{color:"red"}}>{errors.title.message}</p>
                :null
            }

            
        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={4} name="description" value = {tripDetails.description} onChange={(e) => setTripDetails({...tripDetails, description: e.target.value})}/>
        </Form.Group>

            {
                errors.description? 
                <p style={{color:"red"}}>{errors.description.message}</p>
                :null
            }

            <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value = {tripDetails.location} onChange={(e) => setTripDetails({...tripDetails, location: e.target.value})}/>
            </Form.Group>

            {
                errors.location? 
                <p style={{color:"red"}}>{errors.location.message}</p>
                :null
            }

            {/* <Form.Group className="mb-3">
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="text" name="location" value = {tripDetails.longitude} onChange={(e) => setTripDetails({...tripDetails, longitude: e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control type="text" name="location" value = {tripDetails.latitude} onChange={(e) => setTripDetails({...tripDetails, latitude: e.target.value})}/>
            </Form.Group> */}
            
            <Form.Group className="mb-3">
                <FileBase64 type = "file" multiple={false} onDone={({ base64 }) => setTripDetails({ ...tripDetails, selectedFile: base64 })} />                            
            </Form.Group>

            
            {
                errors.selectedFIle? 
                <p style={{color:"red"}}>{errors.selectedFile.message}</p>
                :null
            }

            {/* <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Small file input example</Form.Label>
                <Form.Control type="file" size="sm" />
            </Form.Group> */}
            
            <button className={styles.button1}>Add my trip</button> 
            {/* <Button variant="primary" className="btn-primary">Add my trip</Button> */}

        </Form>
    </div>
)
}

export default AddTrip