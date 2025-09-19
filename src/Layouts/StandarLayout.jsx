import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// Se usan las rutas correctas con la 'P' mayúscula
import Footer from "../Props/Footer";
import Header from "../Props/Header";

export default function StandarLayout() {
  // Estado para simular si el usuario ha iniciado sesión.
  // Inicia en 'false' para que la app cargue en modo "no logueado".
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true); // Cambia el estado a "logueado"
    navigate("/profile"); // Redirige al perfil
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false); // Cambia el estado a "no logueado"
    navigate("/"); // Redirige al Home
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#F8F7F2] sticky top-0 z-50 shadow-sm">
        {/* Pasamos el estado al Header para que sepa qué botón mostrar */}
        <Header isLoggedIn={isLoggedIn} />
      </header>
      <main className="flex-grow">
        {/* Pasamos ambas funciones a las páginas hijas (SignIn, Profile, etc.) 
          a través del 'context' del Outlet.
        */}
        <Outlet context={{ handleLogin, handleLogout }} />
      </main>
      <footer className="bg-primary text-white">
        <Footer />
      </footer>
    </div>
  );
}

