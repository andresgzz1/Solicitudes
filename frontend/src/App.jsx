import { useEffect, useState } from "react";
import Login from "./components/auth/Login";
import AdminPanel from "./pages/AdminPanel";
import ClientePanel from "./pages/ClientePanel";

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (user) => {
    setUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user)); 
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  if (!usuario) return <Login onLogin={handleLogin} />;

 
  if (usuario.rol === "admin") return <AdminPanel usuario={usuario} onLogout={handleLogout} />;
  if (usuario.rol === "cliente") return <ClientePanel usuario={usuario} onLogout={handleLogout} />;

  return null;
}

export default App;
