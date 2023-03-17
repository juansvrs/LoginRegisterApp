import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { Loading } from "./Loading";
import { ModalActions } from "./ModalActions";

export const Employees = () => {
  const { user } = useUser();
  const [empleados, setEmpleados] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/employee/geb");
      setEmpleados(data.data);
      setFilterData(data.data);
      setLoading(false);
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
      console.log("error en la funcion getEmployees", error.message);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const deleteEmployee = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete("/employee/delete/" + id);
        getEmployees();
        Swal.fire({
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  //   manejar modal
  const [employee, setEmployee] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = (edit, employee) => {
    setOpen(true);
    setEdit(edit);
    setEmployee(employee);
  };
  const onCloseModal = () => setOpen(false);

  // // busqueda desde backend
  // const search = async (value) => {
  //   try {
  //     if (value === "") {
  //       return getEmployees();
  //     }
  //     const { data } = await axios.get(`/employee/search/${value}`);
  //     setEmpleados(data.data);
  //   } catch (error) {
  //     console.log("error en search", error.message);
  //   }
  // };

  // busqueda desde el frontend
  const search = (value) => {
    let updatedData = [];
    if (value.length) {
      updatedData = empleados.filter((item) => {
        const startWith =
          item.nombres.toLowerCase().startsWith(value.toLowerCase()) ||
          item.apellidos.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.nombres.toLowerCase().includes(value.toLowerCase()) ||
          item.apellidos.toLowerCase().includes(value.toLowerCase());

        if (startWith) {
          return startWith;
        } else if (!startWith && includes) {
          return includes;
        } else return null;
      });
      setFilterData(updatedData);
    } else {
      setFilterData(empleados);
    }
  };

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button
              className="btn btn-primary"
              onClick={() => onOpenModal(false, {})}
            >
              <i className="fas fa-plus"></i> Add Empleado
            </button>
          </div>
          <div className="col-md-6 ml-auto">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                required
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Empleados de {user.name}</h4>
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="table-responsive-lg">
                    <table className="table table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Nombres</th>
                          <th>Apellidos</th>
                          <th>Identificación</th>
                          <th>Tipo de contrato</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filterData.map((item, i) => (
                          <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.nombres}</td>
                            <td>{item.apellidos}</td>
                            <td>{item.id}</td>
                            <td>{item.tcontrato}</td>
                            <td>
                              <button
                                className="btn btn-danger me-1"
                                onClick={() => deleteEmployee(item._id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                              <button
                                className="btn btn-warning"
                                onClick={() => onOpenModal(true, item)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalActions
        open={open}
        onCloseModal={onCloseModal}
        getEmployees={getEmployees}
        edit={edit}
        employee={employee}
      />
    </div>
  );
};
