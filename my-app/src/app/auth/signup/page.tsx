"use client"
import axios  from "axios";

import { useEffect, useState } from "react"

export default function Signup(){
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    async function postData(data:any) {
        try {
          let response = await axios.post(
            "http://localhost:4000/api/auth/signup",
            data
          );
          console.log("THIS IS RESPONSE:",response);
          console.log(response);
          alert("Form submitted Successfully");
        } catch (error) {
          console.log(error);
          alert("User Allready Exists");
        }
      }
    
      const handleOnSubmit = (event:any) => {
        event.preventDefault();
       
    
        postData({
          email: email,
          password: password,
        
        });
      };
    
    return(
     
        <>
        <div>
            <h1>Signup form</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="enter email here" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Submit</button>

            </form>
        </div>
        </>
    )
}