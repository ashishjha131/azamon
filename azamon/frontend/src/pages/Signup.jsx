import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/signup.css";

const Signup=()=>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    // const [otp, setOtp] = useState(0);
    // const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    console.log(name, email, password);

    async function handleSubmit(){
        try{
            const response = await fetch("http://localhost:5000/api/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email, 
                password: password
            })
            
        });
        const data = await response.json();
        if(response.status === 201){
            setMessage("User created successfully");
            
            navigate("/login");
        }
        else if(response.status === 400){
            if(data.code === "1"){
                setMessage("Enter all the details");
            }
            else if(data.code === "2"){
                setMessage("User already exist");
            }
        }
        else if(response.status === 500){
            setMessage("Server error 500");
        }
        else{
            setMessage("Something went wrong");
        }
        }
        catch(error){
            setMessage("unable to connect to server");
        }
   }

   console.log(message);
//    async function submitOtp(){
//     const response = await fetch("http://localhost:5000/api/auth/register",{
        
//     })
//    }
        

    return(
        <>
            <div className="signup">
                <h2>Create Account</h2>
                <input placeholder="Name" 
                 onChange={(e => setName(e.target.value))}></input>

                 <input placeholder="Email" type="email"
                 onChange={(e => setEmail(e.target.value))}></input>

                 <input placeholder="Password" type="password" value={password}
                 onChange={(e => setPassword(e.target.value))}></input>

                 <button className="signup-button" 
                 onClick={handleSubmit}>Submit</button>

                 <p>{message}</p>
            </div>
            {/* (<div>
                <label>Enter otp</label>
                <input onChange={(e)=>setOtp(e.target.value)}></input>
                <button onClick={submitOtp}>Submit</button>
            </div>) */}
        </>
    )
}

export default Signup;