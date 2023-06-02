import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Employees } from "./components/Employees";
import { Empleade } from "./components/Empleade";
import { Login } from "./components/Login";
import { Nav } from "./components/Nav";
import { Register } from "./components/Register";
import { useUser } from "./context/UserContext";


// axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.baseURL = "https://backendloginregister.vercel.app/api";

function App() {
  const { user } = useUser();
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const Public = ({ children }) => {
    return !user.login ? children : <Navigate to="/employees" />;
  };

  const Private = ({ children }) => {
    return user.login ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Login />
            </Public>
          }
        />

        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />

        <Route
          path="/empleade"
          element={
            <Public>
              <Empleade />
            </Public>
          }
        />

        <Route
          path="/employees"
          element={
            <Private>
              <Employees />
            </Private>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
