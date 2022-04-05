import React, {useState} from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import styles from './AddTrip.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome } from '@fortawesome/free-solid-svg-icons'
    

const AddTrip = () => {
    const [tripDetails, setTripDetails] = useState({title:"", description:"", location:"", selectedFile:""})
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [location, setLocation] = useState("");
    // const [selectedFile, setSelectedFile] = useState("");

    const navigate = useNavigate(); 

    const createTrip = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/trips", 
        tripDetails
        )
        .then((res) => {
            console.log(res.data);
            navigate("/")
        })
        .catch((err) => console.log(err))
    }

return (
    <div>
        <Navbar bg="light" expand="lg" fixed="top">       
            <Navbar.Brand className="mx-5">Dream Pray Travel</Navbar.Brand>            
            <Link to = {"/"} style={{textDecoration: "none", color:"gray"}}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
        </Navbar>
        
        <Form onSubmit = {createTrip} className={styles.form}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value = {tripDetails.title} onChange={(e) => setTripDetails({...tripDetails, title: e.target.value})}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value = {tripDetails.description} onChange={(e) => setTripDetails({...tripDetails, description: e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value = {tripDetails.location} onChange={(e) => setTripDetails({...tripDetails, location: e.target.value})}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <FileBase64 type = "file" multiple={false} onDone={({ base64 }) => setTripDetails({ ...tripDetails, selectedFile: base64 })} />        
            </Form.Group>
            
            <button className="mx-auto">Add my trip</button>
        </Form>
    </div>
)
}

export default AddTrip