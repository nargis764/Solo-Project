import React, {useState, useEffect} from 'react'
import axios from "axios"
import FileBase64 from "react-file-base64";
import {useNavigate, useParams} from "react-router-dom";

const EditTrip = () => {
    const [tripDetails, setTripDetails] = useState({title:"", description:"", location:"", selectedFile:""})
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [location, setLocation] = useState("");
    // const [image, setImage] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trips/${id}`)
        .then((res) => {
            console.log(res.data);
            setTripDetails(res.data);
            // setTitle(res.data.title);
            // setDescription(res.data.description);
            // setLocation(res.data.location);
            // setImage(res.data.image);
        })

    }, [])

    const editTrip = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/trips/${id}`, tripDetails)        
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => console.log(err))
    }

return (
    <div>
        <form onSubmit = {editTrip}>
            <input type="text" name="title" value = {tripDetails.title} onChange={(e) => setTripDetails({...tripDetails, title: e.target.value})}/>
            <input type="text" name="description" value = {tripDetails.description} onChange={(e) => setTripDetails({...tripDetails, description: e.target.value})}/>
            <input type="text" name="location" value = {tripDetails.location} onChange={(e) => setTripDetails({...tripDetails, location: e.target.value})}/>
            <FileBase64 type = "file" multiple={false} onDone={({ base64 }) => setTripDetails({ ...tripDetails, selectedFile: base64 })} />        
            <button>Edit my trip</button>
        </form>
    </div>
)
}

export default EditTrip