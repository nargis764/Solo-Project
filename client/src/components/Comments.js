import React, {useState} from 'react'
import Form from "react-bootstrap/Form";


const Comments = (props) => {

    
    const {tripId,onSubmitProp} = props;
    const [comment, setComment] = useState("")

    const submitHandler = (e) => {
            e.preventDefault();
            onSubmitProp(comment, tripId)
            setComment("");        
    }

return (
    // <div>
    //     <Form  className="w-50 mx-auto" onSubmit={(e) => {
    //         e.preventDefault()
    //         console.log(e.target)
    //         console.log(e.target[0].value)
    //         postComment(e.target[0].value, trip._id)
    //         setComment("");
    //         }}>
            
    //         <Form.Control type = "text" placeholder = 'Write a comment..'/>
    //         {/* <button>Post</button> */}
    //     </Form>
    // </div>

    

    <div>
        <Form  className="w-50 mx-auto" onSubmit={submitHandler}>            
            <Form.Control 
            type = "text" 
            value = {comment}
            onChange = {(e) => setComment(e.target.value)}
            placeholder = 'Write a comment..'
            />
            {/* <button>Post</button> */}
        </Form>
        
    </div>
)
}

export default Comments