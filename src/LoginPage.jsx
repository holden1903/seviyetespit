import React,{useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function LoginPage(){
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [err,setErr]=useState('');
  const nav=useNavigate();
  const onSubmit=async e=>{e.preventDefault();
    try{await signInWithEmailAndPassword(auth,email,pass);nav('/admin');}
    catch{setErr('Giriş başarısız');}
  };
  return (
    <div className="container">
      <h2>Admin Giriş</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="E-posta" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Şifre" value={pass} onChange={e=>setPass(e.target.value)} required/>
        <button type="submit">Giriş Yap</button>
      </form>
      {err && <p style={{color:'red'}}>{err}</p>}
    </div>
  );
}
export default LoginPage;