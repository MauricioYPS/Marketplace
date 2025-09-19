import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Login() {

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 to-cyan-100 w-full">
      
      <header className="bg-[#F8F7F2]  shadow-sm text-gray-800 w-full">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <NavLink
              to="/"
              className="text-2xl font-bold text-primary"
            >
              Mercado<span className="text-accent">Local</span>
            </NavLink>
          </div>
        </nav>
      </header>

      <div className="relative w-full max-w-md m-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Iniciar Sesión</h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="tucorreo@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-orange-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Ingresar
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="font-medium text-orange-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
