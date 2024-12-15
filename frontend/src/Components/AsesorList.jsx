import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AsesorList = () => {
  const [asesors, setAsesors] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getAsesors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/asesors");
        setAsesors(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAsesors();
  }, []);

  const deleteAsesor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/asesors/${id}`);
      setAsesors(asesors.filter((asesor) => asesor.id !== id));
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Asesor</h1>
      <h2 className="subtitle">Daftar Asesor</h2>
      <p className="has-text-centered">{msg}</p>
      <Link to="/asesors/add" className="button is-primary mb-3">
        Tambah Asesor
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Foto</th>
            <th>Met</th>
            <th>Profil</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {asesors.map((asesor, index) => (
            <tr key={asesor.id}>
              <td>{index + 1}</td>
              <td>{asesor.nama}</td>
              <td>
                <figure className="image is-64x64">
                  <img src={asesor.url} alt={asesor.nama} />
                </figure>
              </td>
              <td>{asesor.met}</td>
              <td>{asesor.profil}</td>
              <td>
                <Link
                  to={`/asesors/edit/${asesor.id}`}
                  className="button is-small is-info mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteAsesor(asesor.id)}
                  className="button is-small is-danger"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsesorList;
