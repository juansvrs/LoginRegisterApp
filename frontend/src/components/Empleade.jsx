import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Loading } from "./Loading"
import Swal from "sweetalert2";

export const Empleade = () => {
    const { actions,loading } = useUser();
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({ identificacion: ""});
    // const [loading, setLoading] = useState(false);
  
    const login =  (e) => {
       
        Swal.fire('Que se siente ser empleado y no jefe?')
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
                <i className="fas fa-user fa-5x"></i>
              </div>
              
              <div className="card-header text-center mt-3">
                <h4>INICIO DE SESIÓN DE EMPLEADE</h4>
              </div>
  
              <div className="card-body">
                {loading ? (
                  <Loading />
                ) : (
                  <form onSubmit={login}>
                    <div className="mb-3">
                      <label className="form-label">identificacion</label>
                      <input
                        name="identificacion"
                        className="form-control"
                        autoFocus
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="form-control btn btn-primary "
                    >
                      Entrar
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
  
