import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, fetchProductsByUser } from "../store/actions/authActions";

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



const UserProductCard = ({ product }) => {

  const title = product.name ?? product.title ?? 'Producto';
  const imageSrc =
    product.imageUrl ??
    product.photoUrl ??
    (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : undefined) ??
    `https://placehold.co/400x300/F5F5DC/333333?text=${encodeURIComponent(title)}`;
  const statusLabel =
    product.status ?? (product.available === false ? 'Inactivo' : 'Activo');
  const priceLabel =
    typeof product.price === 'number'
      ? product.price.toLocaleString('es-CO')
      : product.price ?? 'N/D';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <span
          className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full text-white ${statusLabel === 'Activo' ? 'bg-green-600' : 'bg-gray-500'
            }`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-800 flex-grow">
          {title}
        </h3>
        <p className="text-primary font-bold text-xl">
          {priceLabel !== 'N/D' ? `$${priceLabel} COP` : 'Precio no disponible'}
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
};

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const userId = user?._id;
  const { products: userProducts, loading: productsLoading, error: productsError } = useSelector((state) => state.products);


  useEffect(() => {
    if (userId) {
      dispatch(fetchProductsByUser());
    }
  }, [dispatch, userId]);

  const normalizedProductsError =
    typeof productsError === "string" ? productsError : productsError?.message;

  let productsContent;

  if (productsLoading) {
    productsContent = (
      <p className="col-span-full text-sm text-gray-500">Cargando tus productos...</p>
    );
  } else if (normalizedProductsError) {
    productsContent = (
      <p className="col-span-full text-sm text-red-500">{normalizedProductsError}</p>
    );
  } else if (!userProducts || userProducts.length === 0) {
    productsContent = (
      <p className="col-span-full text-sm text-gray-500">Aun no tienes productos publicados.</p>
    );
  } else {
    productsContent = userProducts.map((product) => (
      <UserProductCard
        key={product._id ?? product.id}
        product={product}
      />
    ));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Numero de telefono guardado (simulacion)");
  };

  const handleAdvancedSettingsClick = () => {
    alert("Navegando a ajustes avanzados (simulacion)");
  };

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
    } catch (error) {
      // El estado global ya maneja el error si ocurre
    } finally {
      navigate("/login");
    }
  };

  const fullName = user?.name || user?.lastName
    ? `${user?.name ?? ""} ${user?.lastName ?? ""}`.trim()
    : "Usuario";

    
  return (
    <section id="profile" className="container mx-auto py-12 px-4 sm:px-6">
      <div className="w-full flex items-center mb-2">
        <UserCircleIcon />
        <h1 className="ml-3 text-3xl lg:text-4xl font-bold text-green-900">
          Mi Perfil
        </h1>
      </div>
      <div className="w-full mb-8">
        <div className="border-t-2 border-yellow-500 w-32" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={user?.photoUrl ?? "https://placehold.co/128x128/2C5234/FFFFFF?text=U"}
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
            <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
            <p className="text-gray-500">{user?.email ?? "correo@ejemplo.com"}</p>
            <div className="border-t my-6" />
            <button
              onClick={handleLogout}
              disabled={authLoading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {authLoading ? "Cerrando..." : "Cerrar sesion"}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-green-900 mb-6">
              Informacion Personal
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <div className="mt-1 flex gap-4">
                  <input
                    type="text"
                    id="nombre"
                    defaultValue={user?.name ?? ""}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Nombre"
                  />
                  <input
                    type="text"
                    id="apellido"
                    defaultValue={user?.lastName ?? ""}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electronico
                </label>
                <div className="relative mt-1 flex items-center">
                  <KeyIcon />
                  <input
                    type="email"
                    id="email"
                    defaultValue={user?.email ?? ""}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Cambiar contrasena
                </label>
                <div className="relative mt-1">
                  <KeyIcon />
                  <input
                    type="password"
                    id="password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Nueva contrasena"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Numero de telefono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ingresa tu numero"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  onClick={handleAdvancedSettingsClick}
                  className="text-sm font-medium text-accent hover:text-yellow-500"
                >
                  Ajustes avanzados
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBagIcon />
          <h3 className="text-2xl font-bold text-green-900">Mis productos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {productsContent}
        </div>
      </div>
    </section>
  );
}
