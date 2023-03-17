import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import 'react-responsive-modal/styles.css';

export const ModalActions = ({
  open,
  onCloseModal,
  getEmployees,
  edit,
  employee,
}) => {
  const initialState = {
    nombres: "",
    apellidos: "",
    id: "",
    tcontrato: "Fijo",
  };

  const [dataEmployee, setDataEmployee] = useState(initialState);
  const tcontratos = ["Fijo", "Temporal", "Practicante"];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    edit ? setDataEmployee(employee) : setDataEmployee(initialState);
    //eslint-disable-next-line
  }, [edit, employee]);

  const handleChange = (e) => {
    setDataEmployee({ ...dataEmployee, [e.target.name]: e.target.value });
  };

  const actions = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let resp = {};
      edit
        ? (resp = await axios.put(
            `/employee/update/${employee._id}`,
            dataEmployee
          ))
        : (resp = await axios.post("/employee", dataEmployee));
      Swal.fire({
        icon: "success",
        title: resp.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      onCloseModal();
      getEmployees();
    } catch (error) {
      setLoading(false);
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("error en la funcion actions", error.message);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="card">
          <div className="card-header">
            <h5>{edit ? "Update Empleado" : "Add Empleado"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={actions}>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombres"
                  required
                  autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.nombres}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.apellidos}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Identificación</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.id}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de contrato</label>
                <select
                  name="tcontrato"
                  className="form-select"
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.tcontrato}
                >
                  {tcontratos.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              {!loading ? (
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    {edit ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary form-control" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {edit ? " Actualizando" : " Guardando"}
                </button>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
