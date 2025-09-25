import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/actions/authActions";

const linkBase = "nav-link px-4 py-2 rounded-full font-medium transition-colors";
const linkActive = "bg-primary text-white";
const linkInactive = "hover:bg-gray-200 text-gray-800";

export default function Header({ isLoggedIn: isLoggedInProp }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading } = useSelector((state) => state.auth);

  const derivedIsLoggedIn = Boolean(token);
  const isSigningOut = loading && Boolean(token);
  const isLoggedIn = typeof isLoggedInProp === "boolean" ? isLoggedInProp : derivedIsLoggedIn;

  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap();
    } catch (error) {
      // El error ya se maneja en el estado global
    } finally {
      navigate("/login");
    }
  };

  return (
    <header className="bg-[#F8F7F2] sticky top-0 z-50 shadow-sm text-gray-800">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
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

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
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
                <span className="hidden sm:block font-medium pr-3">
                  Mi Perfil
                </span>
              </NavLink>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="bg-transparent border border-primary text-primary px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSigningOut ? "Cerrando..." : "Cerrar sesion"}
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
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