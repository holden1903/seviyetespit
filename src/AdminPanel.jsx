import React,{useEffect,useState} from "react";
import { collection,getDocs } from "firebase/firestore";
import { auth,db } from "./firebase";

function AdminPanel(){
  const [res,setRes]=useState([]);
  useEffect(()=>{getDocs(collection(db,"results")).then(s=>setRes(s.docs.map(d=>({id:d.id,...d.data()}))));},[]);
  const out=()=>{auth.signOut();window.location='#/login';};
  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <button style={{float:'right'}} onClick={out}>Çıkış</button>
      <table><thead><tr><th>#</th><th>Doğru</th><th>Toplam</th><th>Seviye</th><th>Tarih</th></tr></thead>
      <tbody>{res.map((r,i)=><tr key={r.id}><td>{i+1}</td><td>{r.correct}</td><td>{r.total}</td><td>{r.level}</td><td>{r.timestamp?.toDate().toLocaleString('tr-TR')}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
export default AdminPanel;