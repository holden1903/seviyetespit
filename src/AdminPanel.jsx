import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

function AdminPanel() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "results"));
      setResults(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    window.location = "/login";
  };

  return (
    <div className="container">
      <h2>Admin Panel - Sonuçlar</h2>
      <button onClick={handleLogout} style={{float:"right"}}>Çıkış Yap</button>
      <table>
        <thead>
          <tr><th>#</th><th>Doğru</th><th>Toplam</th><th>Seviye</th><th>Tarih</th></tr>
        </thead>
        <tbody>
          {results.map((item,index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.correct}</td>
              <td>{item.total}</td>
              <td>{item.level}</td>
              <td>{item.timestamp?.toDate().toLocaleString("tr-TR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;