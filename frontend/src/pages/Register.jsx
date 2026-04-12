import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { API_URL } from "../constants/constants";

export default function Register(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e)=>{

    e.preventDefault();

    try{

      const res = await fetch(`${API_URL}/api/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      if(res.ok){
        alert("Registration successful");
        navigate("/login");
      }else{
        alert("Registration failed");
      }

    }catch(err){
      alert("Server not responding (Render sleep ho sakta hai)");
    }

  };

  return(
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Register</h2>

        <form onSubmit={handleRegister}>

          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="auth-btn" type="submit">
            Register
          </button>

        </form>

        <div className="auth-link">
          Already have an account?  
          <Link to="/login"> Login here </Link>
        </div>

      </div>
    </div>
  );
}