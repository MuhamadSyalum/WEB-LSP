import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AsesorDetail = () => {
  const { id } = useParams();
  const [asesor, setAsesor] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getAsesor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/asesors/${id}`);
        const data = await response.json();
        setAsesor(data);
      } catch (error) {
        console.error("Error fetching asesor:", error);
        setMsg("Gagal memuat data detail asesor.");
      }
    };
    getAsesor();
  }, [id]);

  if (!asesor) return <p>{msg || "Memuat detail asesor..."}</p>;

  return (
    <div className="asesor-detail">
      <h1>{asesor.nama}</h1>
      <img src={asesor.url} alt={asesor.nama} className="asesor-photo" />
      <p>Met: {asesor.met}</p>
      <p>Profil: {asesor.profil}</p>
    </div>
  );
};

export default AsesorDetail;
