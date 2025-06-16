import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        correo,
        password,
      });

      onLogin(response.data.usuario);
    } catch {
      setError("Verifica tus credenciales y vuelve a intentarlo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-sm flex">
        {/* Borde Lateral Destacado */}
        <div className="w-4 bg-gradient-to-b from-blue-500 to-indigo-600"></div>

        <div className="p-8 flex-1">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">
            Inicio de Sesión
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Schwager Solicitudes
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md"
                role="alert"
              >
                <p>{error}</p>
              </div>
            )}
            <div>
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="correo"
                placeholder="usuario@dominio.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
                required
                aria-label="Correo electrónico"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
                required
                aria-label="Contraseña"
              />
            </div>
            <button
              type="submit"
              className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white transition duration-200 ease-in-out
                ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Conectando...
                </>
              ) : (
                "Continuar"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;