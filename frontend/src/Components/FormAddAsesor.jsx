import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddAsesor = () => {
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState(null);
  const [met, setMet] = useState("");
  const [profil, setProfil] = useState("");
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const saveAsesor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("foto", foto);
    formData.append("met", met);
    formData.append("profil", profil);
    try {
      await axios.post("http://localhost:5000/asesors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/asesors");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Asesor</h1>
      <h2 className="subtitle">Tambah Asesor Baru</h2>
      <form onSubmit={saveAsesor}>
        <p className="has-text-centered">{msg}</p>
        <div className="field">
          <label className="label">Nama</label>
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Asesor"
          />
        </div>
        <div className="field">
          <label className="label">Foto</label>
          <div className="file">
            <label className="file-label">
              <input
                type="file"
                className="file-input"
                onChange={loadImage}
              />
              <span className="file-cta">Pilih File</span>
            </label>
          </div>
          {preview && (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview" />
            </figure>
          )}
        </div>
        <div className="field">
          <label className="label">Met</label>
          <input
            type="text"
            className="input"
            value={met}
            onChange={(e) => setMet(e.target.value)}
            placeholder="Met"
          />
        </div>
        <div className="field">
          <label className="label">Profil</label>
          <textarea
            className="textarea"
            value={profil}
            onChange={(e) => setProfil(e.target.value)}
            placeholder="Profil Asesor"
          ></textarea>
        </div>
        <button type="submit" className="button is-success">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default FormAddAsesor;
