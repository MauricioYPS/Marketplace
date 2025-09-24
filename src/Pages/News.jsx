import React, { useState, useEffect, } from 'react';

const mockArticles = [
    {
        id: 1,
        title: 'Jornada de vacunación para niños y adultos mayores en el centro de salud',
        excerpt: 'La alcaldía de Mapiripán, en conjunto con el hospital local, anuncia una jornada de vacunación masiva los días 18 y 19 de septiembre...',
        category: 'Salud Pública',
        date: '2025-09-15',
        image: 'Vacunación+Comunitaria'
    },
    {
        id: 2,
        title: 'Inicia la construcción del nuevo puente sobre el Caño Limón',
        excerpt: 'La Gobernación del Meta ha dado inicio a las obras del nuevo puente que conectará varias veredas, mejorando el transporte de productos agrícolas.',
        category: 'Infraestructura',
        date: '2025-09-14',
        image: 'Construcción+de+Puente'
    },
    {
        id: 3,
        title: 'Festival del Joropo y la Canta Criolla: Fechas y artistas confirmados',
        excerpt: 'Mapiripán se prepara para su tradicional festival. Este año contará con la participación de artistas de talla nacional e internacional.',
        category: 'Cultura',
        date: '2025-09-12',
        image: 'Festival+de+Joropo'
    },
    {
        id: 4,
        title: 'Productores locales celebran exitosa cosecha de yuca amarga',
        excerpt: 'A pesar de las condiciones climáticas, los agricultores de la región reportan una de las mejores cosechas de yuca de los últimos cinco años.',
        category: 'Agricultura',
        date: '2025-09-10',
        image: 'Cosecha+de+Yuca'
    },
    {
        id: 5,
        title: 'Jóvenes de Mapiripán se destacan en torneo deportivo departamental',
        excerpt: 'El equipo de fútbol juvenil "Centauros del Llano" obtuvo el segundo lugar en la copa departamental, un logro histórico para el municipio.',
        category: 'Deporte',
        date: '2025-09-08',
        image: 'Equipo+de+Fútbol+Juvenil'
    },
];

// --- Componente de Tarjeta de Noticia ---
const NewsCard = ({ article }) => {
    const formattedDate = new Date(article.date).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group h-full flex flex-col">
            <div className="overflow-hidden">
                <img 
                    src={`https://placehold.co/600x400/F5F5DC/333333?text=${article.image}`} 
                    alt={article.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold self-start">{article.category}</span>
                <h3 className="font-bold text-xl mt-3 mb-2 text-gray-800 flex-grow">{article.title}</h3>
                <p className="text-gray-600 text-base mb-4">{article.excerpt}</p>
                <p className="text-gray-500 text-sm font-medium mt-auto">{formattedDate}</p>
            </div>
        </div>
    );
};

export default function Noticias() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            try {
                setArticles(mockArticles);
                setError(null);
            } catch (err) {
                setError("No se pudieron cargar las noticias.");
                setArticles([]);
            } finally {
                setLoading(false);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    const renderSkeletons = () => {
        return Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-6">
                    <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
                    <div className="h-6 bg-gray-300 rounded w-5/6 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        ));
    };

    return (
        <section id="noticias" className="container mx-auto py-16 px-6 font-sans">
            <div className="w-full flex mb-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-yellow-600">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16"/>
                    <path d="M16 2v4"/><path d="M8 2v4"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M12 16h.01"/><path d="M16 16h.01"/>
                </svg>
                <h1 className="ml-3 text-4xl font-bold text-green-900">Últimas Noticias</h1>
            </div>
            <div className="w-full mb-10">
                <div className="border-t-2 border-yellow-500 w-32"></div>
            </div>

            {error && <div className="text-center p-10 text-red-700 bg-red-100 rounded-lg">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? renderSkeletons() : articles.map(article => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}
