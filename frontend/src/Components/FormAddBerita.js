import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBerita = () => {
  const [judul, setJudul] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveBerita = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/beritas", {
        judul: judul,
        keterangan: keterangan,
      });
      navigate("/beritas");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">beritas</h1>
      <h2 className="subtitle">Add New Berita</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveBerita}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Berita Judul"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">keterangan</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder="Keterangan"
                  />
                </div>
              </div>

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
      </div>
    </div>
  );
};

export default FormAddBerita;
