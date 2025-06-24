import React, { useEffect } from "react";
import questions from "./questions";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ResultPage() {
  const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
  const correct = userAnswers.reduce((acc, answer, idx) =>
    acc + (answer === questions[idx].answer ? 1 : 0), 0);
  let level = "A1";
  if (correct >= 21) level = "C1";
  else if (correct >= 18) level = "B2";
  else if (correct >= 14) level = "B1";
  else if (correct >= 10) level = "A2";

  useEffect(() => {
    const saveResult = async () => {
      try {
        await addDoc(collection(db, "results"), {
          correct, total: questions.length, level, timestamp: Timestamp.now()
        });
      } catch (e) {
        console.error("Firebase'e veri kaydedilemedi:", e);
      }
    };
    saveResult();
  }, []);

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: 'Seviye Tespit Sonucu', style: 'header' },
        { text: `Doğru: ${correct} / ${questions.length}`, style: 'subheader' },
        { text: `Seviye: ${level}`, style: 'subheader' },
        { text: `Tarih: ${new Date().toLocaleString("tr-TR")}`, style: 'subheader' },
        { text: 'Tebrikler! Seviyene uygun kaynaklara bakabilirsin.', style: 'text' }
      ],
      styles: {
        header: { fontSize: 22, bold: true, alignment: 'center' },
        subheader: { fontSize: 16, margin: [0,10,0,0] },
        text: { fontSize: 12, margin: [0,10,0,0] }
      }
    };
    pdfMake.createPdf(docDefinition).download('seviye-sonucu.pdf');
  };

  return (
    <div className="container">
      <h2>Test Sonucu</h2>
      <p>Doğru: {correct} / {questions.length}</p>
      <h3>Seviye: {level}</h3>
      <button onClick={generatePDF}>PDF olarak indir</button>
      <button onClick={() => window.location = "/"} style={{marginLeft: "1rem"}}>Ana Sayfaya Dön</button>
    </div>
  );
}

export default ResultPage;