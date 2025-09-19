import { NavLink } from "react-router-dom";

// 1. El componente ahora recibe la prop { isLoggedIn }
export default function Header({ isLoggedIn }) {
  const linkBase =
    "nav-link px-4 py-2 rounded-full font-medium transition-colors";
  const linkActive = "bg-primary text-white";
  const linkInactive = "hover:bg-gray-200 text-gray-800";

  return (
    <header className="bg-[#F8F7F2] sticky top-0 z-50 shadow-sm text-gray-800">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* LOGO y NAV LINKS DESKTOP (se mantienen igual) */}
        <div className="flex items-center space-x-2">
          <NavLink to="/" className="text-2xl font-bold text-primary">
            Mercado<span className="text-accent">Local</span>
          </NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Noticias
          </NavLink>
        </div>

        {/* PERFIL / USER */}
        <div className="flex items-center space-x-4">
          {/* 2. Se añade una condición (ternario) aquí */}
          {isLoggedIn ? (
            // Si isLoggedIn es true, muestra el botón de perfil
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 p-1.5 rounded-full transition-colors ${
                  isActive ? "bg-primary text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img
                src="https://placehold.co/40x40/2C5234/FFFFFF?text=U"
                alt="Perfil"
                className="w-8 h-8 rounded-full border-2 border-accent"
              />
              <span className={`hidden sm:block font-medium pr-3`}>
                Mi Perfil
              </span>
            </NavLink>
          ) : (
            // Si isLoggedIn es false, muestra el botón de ingresar
            <NavLink
              to="/login" // Asegúrate de tener una ruta /login en App.jsx
              className="bg-primary text-white px-4 py-2 rounded-full font-medium"
            >
              Ingresar
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
