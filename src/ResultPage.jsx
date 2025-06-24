import React, { useEffect } from "react";
import questions from "./questions";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ResultPage() {
  const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
  const correct = userAnswers.reduce((a,ans,i)=>a+(ans===questions[i].answer),0);
  let level="A1";
  if(correct>=21) level="C1";
  else if(correct>=18) level="B2";
  else if(correct>=14) level="B1";
  else if(correct>=10) level="A2";

  useEffect(()=>{
    addDoc(collection(db,"results"),{correct,total:questions.length,level,timestamp:Timestamp.now()});
  },[]);

  const generatePDF=()=>{
    const docDef={content:[
      {text:'Seviye Tespit Sonucu',style:'h',alignment:'center'},
      {text:`Doğru: ${correct} / ${questions.length}`,margin:[0,20,0,0]},
      {text:`Seviye: ${level}`,margin:[0,10]},
      {text:`Tarih: ${new Date().toLocaleString('tr-TR')}`,margin:[0,10]},
      {text:'Tebrikler! Seviyene uygun kaynaklara bakabilirsin.',margin:[0,20]}
    ],styles:{h:{fontSize:18,bold:true}}};
    pdfMake.createPdf(docDef).download('seviye-sonucu.pdf');
  };

  return (
    <div className="container">
      <h2>Test Sonucu</h2>
      <p>Doğru: {correct} / {questions.length}</p>
      <h3>Seviye: {level}</h3>
      <button onClick={generatePDF}>PDF olarak indir</button>
      <button style={{marginLeft:'1rem'}} onClick={()=>window.location='#/'}>Ana Sayfa</button>
    </div>
  );
}

export default ResultPage;