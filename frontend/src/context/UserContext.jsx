import axios from "axios";
import Swal from "sweetalert2";
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();
const initialState = { login: false, token: "", name: "" };

export const UserProvider = (props) => {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("user"));
    initial ? initial.login && setUser(initial) : setUser(initialState);
  }, []);

  const actions = async (dataUser, navigate) => {
    try {
      let resp = {};
      setLoading(true);
      dataUser.nombre
        ? (resp = await axios.post("/register", dataUser))
        : (resp = await axios.post("/login", dataUser));

      if (resp.data.ok) {
        const userLogin = {
          login: true,
          token: resp.data.data.token,
          name: resp.data.data.nombre,
        };
        localStorage.setItem("user", JSON.stringify(userLogin));
        setLoading(false);
        setUser(userLogin);
        // navigate("/employees");
        Swal.fire({
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
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

  const exit = () => {
    setUser(initialState);
    localStorage.removeItem("user");
  };

  const value = {
    actions,
    user,
    exit,
    loading,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser error");
  }
  return context;
}
