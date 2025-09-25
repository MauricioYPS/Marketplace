import React, { useState, useEffect } from "react";

// --- Datos de Ejemplo Actualizados ---
// Se ha añadido 'publisher' y se ha expandido 'excerpt' a 'description'
const mockArticles = [
  {
    id: 1,
    title:
      "Jornada de vacunación para niños y adultos mayores en el centro de salud",
    publisher: "Alcaldía de Mapiripán",
    description:
      "La alcaldía de Mapiripán, en conjunto con el hospital local, anuncia una jornada de vacunación masiva los días 18 y 19 de septiembre. Se aplicarán dosis de refuerzo contra el COVID-19, así como las vacunas del esquema regular para niños menores de 5 años. Se recomienda a la comunidad asistir con su carné de vacunación.",
    category: "Salud Pública",
    date: "2025-09-15",
    image:
      "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=1920&auto-format&fit=crop",
  },
  {
    id: 2,
    title: "Inicia la construcción del nuevo puente sobre el Caño Limón",
    publisher: "Gobernación del Meta",
    description:
      "La Gobernación del Meta ha dado inicio oficial a las obras del nuevo puente vehicular que conectará las veredas de El Progreso y La Esmeralda. Este proyecto, esperado por años, mejorará significativamente el transporte de productos agrícolas y reducirá los tiempos de viaje para los habitantes de la zona. Se estima que la obra esté completada en 12 meses.",
    category: "Infraestructura",
    date: "2025-09-14",
    image:
      "https://images.unsplash.com/photo-1652924751926-0677d5c80fdb?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title:
      "Festival del Joropo y la Canta Criolla: Fechas y artistas confirmados",
    publisher: "Casa de la Cultura",
    description:
      "Mapiripán se prepara para su tradicional festival, que se celebrará del 10 al 12 de octubre. Este año, el evento contará con la participación de artistas de talla nacional como El Cholo Valderrama y Walter Silva. Habrá concursos de baile, gastronomía local y muestras artesanales. ¡No te lo pierdas!",
    category: "Cultura",
    date: "2025-09-12",
    image:
      "https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/styles/imagen_noticia/public/field/image/joropo-torneo-internacional-2024.png?itok=5ITihxSA",
  },
];

// --- Íconos para la UI ---
const CalendarIcon = () => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const BuildingIcon = () => (
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
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <line x1="9" y1="9" x2="15" y2="15"></line>
    <line x1="15" y1="9" x2="9" y2="15"></line>
  </svg>
);
const NewsIcon = () => (
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
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
    <path d="M12 16h.01" />
    <path d="M16 16h.01" />
  </svg>
);

// --- Componente de Artículo de Noticia (NUEVO DISEÑO) ---
const NewsArticle = ({ article }) => {
  const formattedDate = new Date(article.date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-shadow duration-300 hover:shadow-2xl">
      <div className="md:w-2/5 flex-shrink-0">
        <img
          src={article.image}
          alt={article.title}
          className="h-64 w-full object-cover md:h-full"
        />
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <BuildingIcon />
            <span className="font-medium">{article.publisher}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <span>{formattedDate}</span>
          </div>
        </div>
        <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold self-start my-2">
          {article.category}
        </span>
        <h2 className="text-2xl lg:text-3xl font-bold text-green-900 mt-2">
          {article.title}
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          {article.description}
        </p>
      </div>
    </article>
  );
};

// --- Componente Skeleton para el estado de carga (NUEVO DISEÑO) ---
const SkeletonArticle = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row animate-pulse">
    <div className="md:w-2/5 h-64 md:h-auto bg-gray-200"></div>
    <div className="p-6 md:p-8 w-full">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

export default function Noticias() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1500); // 1.5 segundos para ver el efecto de carga

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section id="noticias" className="container mx-auto py-12 px-4 sm:px-6">
        <div className="w-full flex items-center mb-2">
          <NewsIcon />
          <h1 className="ml-3 text-3xl lg:text-4xl font-bold text-green-900">
            Últimas Noticias
          </h1>
        </div>
        <div className="w-full mb-10">
          <div className="border-t-2 border-yellow-500 w-32"></div>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SkeletonArticle key={index} />
              ))
            : articles.map((article) => (
                <NewsArticle key={article.id} article={article} />
              ))}
        </div>
      </section>
    </div>
  );
}
