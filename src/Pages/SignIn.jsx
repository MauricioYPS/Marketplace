import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthFeedback } from "../store/actions/authActions";

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary h-10 w-10"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
      
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthFeedback());
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error || message) {
      dispatch(clearAuthFeedback());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl border">
          <div className="text-center mb-6">
            <NavLink
              to="/"
              className="flex items-center justify-center space-x-2"
            >
              <LogoIcon />
              <span className="text-3xl font-bold text-primary">
                Mercado<span className="text-accent">Local</span>
              </span>
            </NavLink>
            <p className="text-gray-600 mt-2">
              Bienvenido de vuelta a tu comunidad
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electronico
              </label>
              <div className="relative mt-1">
                <MailIcon />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contrasena
              </label>
              <div className="relative mt-1">
                <LockIcon />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="********"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {message && !error && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-primary font-bold text-lg py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            No tienes una cuenta?{" "}
            <NavLink
              to="/register"
              className="font-semibold text-primary hover:text-accent"
            >
              Registrate aqui
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}
