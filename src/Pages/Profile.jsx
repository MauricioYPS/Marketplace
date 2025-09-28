import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, fetchProductsByUser } from "../store/actions/authActions";
import { useS3Image } from "../hooks/useS3Image";

// --- Íconos Mejorados para la UI ---
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
    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
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
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);
const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);
const SpinnerIcon = () => (
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
);

// --- Componente de Tarjeta de Producto (Diseño Mejorado) ---
const UserProductCard = ({ product }) => {
  const title = product.name ?? product.title ?? "Producto";
  const rawSource =
    product.photoUrl ??
    product.imageUrl ??
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null);
  const { url } = useS3Image(rawSource);
  const fallback = `https://placehold.co/400x300/F5F5DC/333333?text=${encodeURIComponent(
    title
  )}`;
  const imageSrc = url ?? fallback;
  const statusLabel =
    product.status ?? (product.available === false ? "Inactivo" : "Activo");
  const priceLabel =
    typeof product.price === "number"
      ? product.price.toLocaleString("es-CO")
      : product.price ?? "N/D";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary">
      <div className="w-full sm:w-48 flex-shrink-0">
        <img
          src={imageSrc}
          alt={title}
          className="h-48 w-full object-cover sm:h-full"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-800 truncate">{title}</h3>
          <p className="text-primary font-extrabold text-2xl mt-1">
            {priceLabel !== "N/D" ? `$${priceLabel}` : "N/D"}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                statusLabel === "Activo" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            <p className="text-sm text-gray-600 font-medium">{statusLabel}</p>
          </div>
        </div>
        <div className="border-t pt-3 mt-3 flex justify-end gap-4">
          <button
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Editar producto"
          >
            <EditIcon /> Editar
          </button>
          <button
            className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
            aria-label="Eliminar producto"
          >
            <DeleteIcon /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente Skeleton para el estado de carga (NUEVO DISEÑO) ---
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row animate-pulse">
    <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-200 flex-shrink-0"></div>
    <div className="p-5 flex flex-col flex-grow justify-between w-full">
      <div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="border-t pt-3 mt-3 flex justify-end gap-4">
        <div className="h-5 bg-gray-200 rounded w-20"></div>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

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
    productsContent = Array.from({ length: 3 }).map((_, index) => (
      <SkeletonCard key={index} />
    ));
  } else if (normalizedProductsError) {
    productsContent = (
      <div className="col-span-full bg-white p-8 rounded-xl shadow-md text-center">
        <p className="text-red-500">{normalizedProductsError}</p>
      </div>
    );
  } else if (!userProducts || userProducts.length === 0) {
    productsContent = (
      <div className="col-span-full bg-white p-8 rounded-xl shadow-md text-center">
        <p className="text-gray-500">
          Aún no tienes productos publicados. ¡Anímate a vender!
        </p>
      </div>
    );
  } else {
    productsContent = userProducts.map((product) => (
      <UserProductCard key={product._id ?? product.id} product={product} />
    ));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Guardando cambios (simulación)");
  };

  const handleAdvancedSettingsClick = () => {
    alert("Navegando a ajustes avanzados (simulación)");
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

  const fullName =
    user?.name || user?.lastName
      ? `${user?.name ?? ""} ${user?.lastName ?? ""}`.trim()
      : "Usuario";

  return (
    <div className="bg-slate-50 min-h-screen">
      <section id="profile" className="container mx-auto py-12 px-4 sm:px-6">
        <div className="w-full flex items-center mb-2">
          <UserCircleIcon />
          <h1 className="ml-3 text-3xl lg:text-4xl font-bold text-green-900">
            Mi Perfil
          </h1>
        </div>
        <div className="w-full mb-10">
          <div className="border-t-2 border-yellow-500 w-32" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl sticky top-24">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={
                    user?.photoUrl ??
                    "https://placehold.co/128x128/2C5234/FFFFFF?text=U"
                  }
                  className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-500 object-cover"
                  alt="Foto de perfil"
                />
                <button
                  className="absolute bottom-0 right-0 bg-green-800 text-white p-2 rounded-full hover:bg-green-900 transition-colors shadow-md hover:scale-110"
                  aria-label="Cambiar foto de perfil"
                >
                  <CameraIcon />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 truncate">
                {fullName}
              </h2>
              <p className="text-gray-500 truncate">
                {user?.email ?? "correo@ejemplo.com"}
              </p>
              <div className="border-t my-6" />
              <button
                onClick={handleLogout}
                disabled={authLoading}
                className="w-full flex justify-center items-center bg-red-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {authLoading && <SpinnerIcon />}
                {authLoading ? "Cerrando..." : "Cerrar Sesión"}
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 rounded-xl shadow-xl h-full">
              <h3 className="text-2xl font-bold text-green-900 mb-6">
                Información Personal
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre completo
                  </label>
                  <div className="mt-1 flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      id="nombre"
                      defaultValue={user?.name ?? ""}
                      className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      id="apellido"
                      defaultValue={user?.lastName ?? ""}
                      className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                      placeholder="Apellido"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      id="email"
                      defaultValue={user?.email ?? ""}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cambiar contraseña
                  </label>
                  <div className="relative mt-1">
                    <KeyIcon />
                    <input
                      type="password"
                      id="password"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                      placeholder="Nueva contraseña"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                    placeholder="Ingresa tu número"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleAdvancedSettingsClick}
                    className="text-sm font-medium text-accent hover:text-yellow-500 transition-colors"
                  >
                    Ajustes avanzados
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-green-800 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBagIcon />
            <h3 className="text-2xl font-bold text-green-900">Mis Productos</h3>
          </div>
          <div className="space-y-6">{productsContent}</div>
        </div>
      </section>
    </div>
  );
}
