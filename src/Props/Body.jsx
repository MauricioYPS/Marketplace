import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// --- Se mantienen los imports de Redux para conectar con tu backend ---
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/reducers/productsSlice";

// --- Íconos para la UI ---
const MegaphoneIcon = () => (
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
    <path d="M12 6V4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4v-2" />
    <path d="M12 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8" />
    <path d="M12 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
  </svg>
);
const ShoppingBasketIcon = () => (
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
    <path d="m15 11-1 9"></path>
    <path d="m19 11-4-7"></path>
    <path d="M2 11h20"></path>
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"></path>
    <path d="M4.5 15.5h15"></path>
    <path d="m5 11 4-7"></path>
    <path d="m9 11 1 9"></path>
  </svg>
);
const ArrowRightIcon = () => (
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
    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const TagIcon = () => (
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
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// --- Datos para el Carrusel ---
const featuredPosts = [
  {
    id: 1,
    title: "Jornada de vacunación para niños y adultos mayores",
    description:
      "La alcaldía de Mapiripán, en conjunto con el hospital local, anuncia una jornada de vacunación masiva los días 18 y 19 de septiembre.",
    category: "Salud Pública",
    date: "2025-09-15",
    imageUrl:
      "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=1920&auto-format&fit=crop",
    link: "/news",
  },
  {
    id: 2,
    title: "Inicia la construcción del nuevo puente sobre el Caño Limón",
    description:
      "La Gobernación del Meta ha dado inicio oficial a las obras del nuevo puente vehicular que conectará las veredas de El Progreso y La Esmeralda.",
    category: "Infraestructura",
    date: "2025-09-14",
    imageUrl:
      "https://images.unsplash.com/photo-1652924751926-0677d5c80fdb?q=80&w=1632&auto-format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/news",
  },
  {
    id: 3,
    title: "Festival del Joropo: Fechas y artistas confirmados",
    description:
      "Mapiripán se prepara para su tradicional festival, que se celebrará del 10 al 12 de octubre. El evento contará con la participación de artistas de talla nacional.",
    category: "Cultura",
    date: "2025-09-12",
    imageUrl:
      "https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/styles/imagen_noticia/public/field/image/joropo-torneo-internacional-2024.png?itok=5ITihxSA",
    link: "/news",
  },
];

// --- Datos para Anuncios ---
const announcements = [
  {
    title: "Alcaldía Municipal",
    text: "Jornada de vacunación canina y felina este Sábado en el parque principal.",
  },
  {
    title: "Empresa de Energía",
    text: "Corte programado del servicio para el día Lunes de 8am a 2pm en el barrio El Centro.",
  },
  {
    title: "Acueducto Local",
    text: "Recomendamos hacer uso racional del agua durante la temporada de verano.",
  },
];

// --- Componente de Tarjeta de Producto ---
const ProductCard = ({ product }) => {
  // --- LÓGICA MEJORADA PARA ENCONTRAR LA IMAGEN ---
  const imageSrc =
    product.imageUrl ??
    product.photoUrl ??
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : `https://placehold.co/400x500/F5F5DC/333333?text=${encodeURIComponent(
          product.name
        )}`);

  return (
    <Link
      to={`/productDetails/${product.id ?? product._id}`}
      className="block group"
    >
      <div className="relative h-80 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {product.name}
          </h3>
          <p className="text-lg font-semibold text-yellow-300 drop-shadow-md">
            ${product.price?.toLocaleString("es-CO")} COP
          </p>
          <p className="text-sm text-gray-200">{product.unit}</p>
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-white font-semibold">
            Ver producto <ArrowRightIcon />
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- Skeleton para la carga de productos ---
const SkeletonProductCard = () => (
  <div className="relative h-80 rounded-xl bg-gray-200 animate-pulse"></div>
);

export default function Body() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Lógica de Redux para traer los productos ---
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? featuredPosts.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === featuredPosts.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="bg-slate-50 w-full">
      {/* --- SECCIÓN DE HÉROE / CARRUSEL --- */}
      <section className="relative h-[70vh] min-h-[500px] w-full group">
        <div
          style={{
            backgroundImage: `url(${featuredPosts[currentIndex].imageUrl})`,
          }}
          className="w-full h-full bg-center bg-cover duration-500"
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div
            className="relative p-8 z-10 flex flex-col items-center transition-all duration-500"
            key={currentIndex}
          >
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full font-semibold border border-white/30">
              <TagIcon />
              <span>{featuredPosts[currentIndex].category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold my-4 max-w-4xl leading-tight drop-shadow-lg">
              {featuredPosts[currentIndex].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-200 drop-shadow-md">
              {featuredPosts[currentIndex].description}
            </p>
            <NavLink
              to={featuredPosts[currentIndex].link}
              className="bg-yellow-500 text-primary font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 group/button flex items-center"
            >
              Ver más detalles
              <div className="ml-2 group-hover/button:translate-x-1 transition-transform">
                <ArrowRightIcon />
              </div>
            </NavLink>
          </div>
        </div>
        <div
          onClick={prevSlide}
          className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors"
        >
          <ChevronLeftIcon />
        </div>
        <div
          onClick={nextSlide}
          className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors"
        >
          <ChevronRightIcon />
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center gap-2">
          {featuredPosts.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === slideIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-16">
        {/* --- SECCIÓN DE ANUNCIOS IMPORTANTES --- */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <MegaphoneIcon />
            <h2 className="text-3xl font-bold text-green-900">
              Anuncios Importantes
            </h2>
          </div>
          <div className="w-full mt-2 mb-8">
            <div className="border-t-2 border-yellow-500 w-32" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {announcements.map((ann, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {ann.title}
                </h3>
                <p className="text-gray-600">{ann.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECCIÓN DE DESTACADOS DEL MARKETPLACE (CONECTADA AL BACKEND) --- */}
        <div>
          <div className="flex items-center gap-3">
            <ShoppingBasketIcon />
            <h2 className="text-3xl font-bold text-green-900">
              Destacados del Marketplace
            </h2>
          </div>
          <div className="w-full mt-2 mb-8">
            <div className="border-t-2 border-yellow-500 w-32" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonProductCard key={index} />
              ))
            ) : productsError ? (
              <p className="col-span-full text-red-500">
                Error:{" "}
                {productsError.message ||
                  "No se pudieron cargar los productos."}
              </p>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id ?? product._id}
                  product={product}
                />
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <NavLink
              to="/marketplace"
              className="bg-primary text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105 group flex items-center mx-auto w-fit"
            >
              Explorar todo el Marketplace
              <ArrowRightIcon />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
