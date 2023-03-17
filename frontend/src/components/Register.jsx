import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Loading } from "./Loading";

export const Register = () => {
  const navigate = useNavigate();
  const { actions } = useUser();
  const [dataUser, setDataUser] = useState({
    correo: "",
    password: "",
    nombre: "",
  });

  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    await actions(dataUser, navigate);
    setLoading(false);
  };

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="container text-center">
              <i className="fas fa-user-plus fa-5x"></i>
            </div>
            <div className="card-header text-center mt-3">
              <h4>Registro de Jefe</h4>
            </div>

            <div className="card-body">
              {loading ? (
                <Loading />
              ) : (
                <form onSubmit={register}>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      name="correo"
                      className="form-control"
                      autoFocus
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="form-control btn btn-primary "
                  >
                    Login
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
