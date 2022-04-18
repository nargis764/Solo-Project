import React,{useState} from 'react'
import Form from "react-bootstrap/Form";
import FileBase64 from "react-file-base64";
import styles from './AddTrip.module.css';

const FormTrip = (props) => {

    const {initialTitle, initialDescription, initialLocation, initialSelectedFile, onSubmitProp, errors} = props;
    const [tripDetails, setTripDetails] = useState({title: initialTitle, description: initialDescription, location: initialLocation, selectedFile: initialSelectedFile})
    // const [tripDetails, setTripDetails] = useState({title:"", description:"", location:"",longitude:"", latitude:"", selectedFile:""})
    

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmitProp(tripDetails)
    }


return (
    <div>
        <Form onSubmit = {submitHandler} method="post" className={styles.form}>
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

export default FormTrip