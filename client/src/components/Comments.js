import React, {useState, useRef} from 'react'

const Comments = (props) => {

  const {trip} = props;

  const [comments, setComments] = useState([1,2,3,4])
  const [comment, setComment] = useState("");


  // const submitHandler = () => {
  //   const finalComment = `${user.username}: ${comment}`;

    

  // }

  return (
    <div>
      <h1>Comments</h1>
      {comments.map((comment,index) => (
        <div key = {index}>
          Comment {index}
        </div>
      )
        
      )}

      <h2>Post a comment</h2>
      <input 
      type="text" 
      value= {comment}
      onChange={(e) => setComment(e.target.value)}      
      />

      {/* <button disabled={!comment} onClick = {submitHandler}>comment</button> */}

    </div>
  )
}

export default Comments
