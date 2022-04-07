import axios from "axios";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";


const Profile = (props) => {

    const {username} = useParams();
    const [tripListByUser, setTripListByUser] = useState([]);
    

    useEffect(() =>{
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



return (
    <div>
        <h1>{username}</h1>

        {tripListByUser.map((trip,index) => {

            return <div key={index}>
            
                <p>{trip.title}</p>
                <p>{trip.description}</p>
                <p>{trip.location}</p>

            </div>
        
        
        })

        }

    </div>
)
}

export default Profile
