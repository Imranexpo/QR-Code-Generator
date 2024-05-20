import React, { useState } from 'react'
import './App.css';

const Code = () => {
  const [img,setImg] =useState("")
  const [loading, setLoading] =useState(false);
  const [qrData, setqrData] =useState("https://www.tutorjoes.in/")
  const [qrSize, setSize] =useState("150");
  async function generate(){
    setLoading(true);
    try{
       const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(qrData)}`;
       setImg(url);
    }catch(error){
      console.error("Error generating QR code", error);
    }finally{
      setLoading(false);
    }
  }
  function download(){
    fetch(img)
    .then ((Response)=>Response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href =URL.createObjectURL(blob);
      link.download ="QRcode.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    });
  }
 
  return (
    <div className='app-container'>
        <h1>QR code Generator</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className='qr-code-image' alt=''/>}
        <div>
            <label htmlFor='dataInput' className='input-label'>
                Dtaa for QR code:
            </label>
            <input type='text' id='dataInput' placeholder='Enter the data for QR code' value={qrData} onChange={(e)=>setqrData(e.target.value)}/>
            <label htmlFor='sizeInput' className='input-label'>
                Image size (e.g.,150):
            </label>
            <input type='text' id='sizeInput' value={qrSize} placeholder='Enter the Image size' onChange={(e)=>setSize(e.target.value)}/>
            <button className='generate-btn' disabled={loading} onClick={generate}>Generate QR code</button>
            <button className='download-btn' onClick={download} >Download QR code</button>
        </div>
      <p className='footer'>Designed by <a href='https://www.youtube.in'>Me</a></p>
    </div>
  )
}

export default Code;