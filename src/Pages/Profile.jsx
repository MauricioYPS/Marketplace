import React from "react";
import { useOutletContext } from "react-router-dom";

// --- Íconos para la UI ---
const CameraIcon = () => (
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
    className="w-5 h-5"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);
const UserCircleIcon = () => (
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
    className="w-8 h-8 text-yellow-600"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);
const KeyIcon = () => (
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
    className="w-5 h-5"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const ShoppingBagIcon = () => (
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
    className="w-8 h-8 text-yellow-600"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

// --- Datos de Ejemplo para las publicaciones del usuario ---
const mockUserProducts = [
  {
    id: 1,
    name: "Queso Siete Cueros",
    price: 12000,
    image: "Queso+Llanero",
    status: "Activo",
  },
  {
    id: 3,
    name: "Chinchorro de Moriche",
    price: 150000,
    image: "Artesanía",
    status: "Activo",
  },
  {
    id: 8,
    name: "Pan de Arroz",
    price: 5000,
    image: "Pan+de+Arroz",
    status: "Vendido",
  },
];

// --- Componente para la tarjeta de producto del usuario ---
const UserProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
    <div className="relative">
      <img
        src={`https://placehold.co/400x300/F5F5DC/333333?text=${product.image}`}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <span
        className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full text-white ${
          product.status === "Activo" ? "bg-green-600" : "bg-gray-500"
        }`}
      >
        {product.status}
      </span>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="font-semibold text-lg text-gray-800 flex-grow">
        {product.name}
      </h3>
      <p className="text-primary font-bold text-xl">
        ${product.price.toLocaleString("es-CO")} COP
      </p>
    </div>
    <div className="border-t p-3 bg-gray-50 flex justify-end gap-2">
      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
        Editar
      </button>
      <button className="text-sm font-medium text-red-600 hover:text-red-800">
        Eliminar
      </button>
    </div>
  </div>
);

export default function Profile() {
  // Se recibe la función 'handleLogout' desde el layout padre (StandarLayout.jsx)
  const { handleLogout } = useOutletContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Número de teléfono guardado (simulación)");
  };

  const handleAdvancedSettingsClick = () => {
    alert("Navegando a ajustes avanzados (simulación)");
  };

  return (
    <section id="profile" className="container mx-auto py-12 px-4 sm:px-6">
      {/* --- SECCIÓN DE INFORMACIÓN DEL PERFIL --- */}
      <div className="w-full flex items-center mb-2">
        <UserCircleIcon />
        <h1 className="ml-3 text-3xl lg:text-4xl font-bold text-green-900">
          Mi Perfil
        </h1>
      </div>
      <div className="w-full mb-8">
        <div className="border-t-2 border-yellow-500 w-32"></div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src="https://placehold.co/128x128/2C5234/FFFFFF?text=U"
                className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-500"
                alt="Foto de perfil"
              />
              <button
                className="absolute bottom-0 right-0 bg-green-800 text-white p-2 rounded-full hover:bg-green-900 transition-colors"
                aria-label="Cambiar foto de perfil"
              >
                <CameraIcon />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Nombre de Usuario
            </h2>
            <p className="text-gray-500">mapiripan_local@correo.com</p>
            <div className="border-t my-6"></div>

            {/* El botón ahora ejecuta la función 'handleLogout' al hacerle clic */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-green-900 mb-6">
              Información Personal
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  defaultValue="Nombre de Usuario"
                  readOnly
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="mapiripan_local@correo.com"
                  readOnly
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  defaultValue="3101234567"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm p-2 border"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-yellow-500 text-green-900 py-2 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Guardar Teléfono
                </button>
              </div>
            </form>
            <div className="border-t pt-6 mt-6">
              <div
                onClick={handleAdvancedSettingsClick}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-800 cursor-pointer transition-colors w-fit"
                role="button"
                tabIndex={0}
              >
                <KeyIcon />
                <span>Ajustes avanzados (ej. cambiar nombre)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- NUEVA SECCIÓN: MIS PUBLICACIONES --- */}
      <div className="mt-16">
        <div className="w-full flex items-center mb-2">
          <ShoppingBagIcon />
          <h2 className="ml-3 text-3xl font-bold text-green-900">
            Mis Publicaciones
          </h2>
        </div>
        <div className="w-full mb-8">
          <div className="border-t-2 border-yellow-500 w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockUserProducts.map((product) => (
            <UserProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}