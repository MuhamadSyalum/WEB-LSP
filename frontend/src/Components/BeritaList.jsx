import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BeritaList = () => {
  const [beritas, setBeritas] = useState([]);

  useEffect(() => {
    getBeritas();
  }, []);

  const getBeritas = async () => {
    const response = await axios.get("http://localhost:5000/beritas");
    setBeritas(response.data);
  };

  const deleteBerita = async (beritaId) => {
    await axios.delete(`http://localhost:5000/beritas/${beritaId}`);
    getBeritas();
  };

  return (
    <div>
      <h1 className="title">Beritas</h1>
      <h2 className="subtitle">List of Beritas</h2>
      <Link to="/beritas/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Berita Name</th>
            <th>keterangan</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beritas.map((berita, index) => (
            <tr key={berita.uuid}>
              <td>{index + 1}</td>
              <td>{berita.judul}</td>
              <td>{berita.keterangan}</td>
              <td>{berita.user.name}</td>
              <td>
                <Link
                  to={`/beritas/edit/${berita.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBerita(berita.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeritaList;