import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async (e)=>{

e.preventDefault();

const res = await fetch("http://localhost:8080/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
});

const data = await res.json();

if(res.ok){

localStorage.setItem("token",data.token);
localStorage.setItem("userId",data.userId);

navigate("/");

}else{

alert(data.message || "Login failed");

}

};

return(

<div className="auth-container">

<div className="auth-card">

<h2 className="auth-title">Login</h2>

<form onSubmit={handleLogin}>

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
Login
</button>

</form>

<div className="auth-link">

Don't have an account?  
<Link to="/register"> Register here </Link>

</div>

</div>

</div>

);

}