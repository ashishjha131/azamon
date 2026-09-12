import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import "../styles/login.css";
import { useContext } from "react";

const Login=()=>{
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    console.log(email, password);

    async function handleSubmit(){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, 
                password: password
            })
            
        });
        const data = await response.json();
        if(response.status === 200){
            login(data.token, data)
            setMessage("User logged in successfully");
            navigate("/");
        }
        else if(response.status === 400){
            if(data.code === "1"){
                setMessage("Enter all the details");
            }
            else if(data.code === "2"){
                setMessage("Password doesn't match");
            }
            else{
                setMessage("User doesn't exist");
            }
        }
        else if(response.status === 500){
            setMessage("Server error 500");
        }
        }
        catch(error){
            console.error("FETCH ERROR:", error);
            setMessage("unable to connect to server");
        }
   }
   console.log(message);

        

    return(
        <>
            <div className="login">
                <h2>Login</h2>
                

                 <input placeholder="Email" type="email"
                 onChange={(e => setEmail(e.target.value))}></input>

                 <input placeholder="Password" type="password" value={password}
                 onChange={(e => setPassword(e.target.value))}></input>

                 <button className="login-button" 
                 onClick={handleSubmit}>Submit</button>

                 <p>{message}</p>
            </div>
        </>
    )
}

export default Login;