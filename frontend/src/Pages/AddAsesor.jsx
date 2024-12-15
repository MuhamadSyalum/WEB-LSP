import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAsesor = () => {
  const [nama, setNama] = useState("");
  const [met, setMet] = useState("");
  const [profil, setProfil] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveAsesor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", nama);
    formData.append("met", met);
    formData.append("profil", profil);
    try {
      await axios.post("http://localhost:5000/asesors", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/asesors");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveAsesor}>
          <div className="field">
            <label className="label">Nama Asesor</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Asesor"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Metode</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={met}
                onChange={(e) => setMet(e.target.value)}
                placeholder="Metode Konsultasi"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Profil</label>
            <div className="control">
              <textarea
                className="textarea"
                value={profil}
                onChange={(e) => setProfil(e.target.value)}
                placeholder="Profil Asesor"
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Foto</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsesor;