import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Cards() {
  const navigate = useNavigate();
  const { cities } = useSelector((state) => state.cities);

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city, i) => (
          <div key={city._id} className={`card card-hover overflow-hidden ${i<9 ? 'animate-fade-in-up' : ''}`} style={{animationDelay: `${(i%9)*40}ms`}}>
            <div className="relative">
              <img src={city.photo} alt={city.name} className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white drop-shadow-sm">{city.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-white/15 border border-white/20">{city.country}</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-200/90 line-clamp-3">{city.description}</p>
              <button className="mt-4 w-full btn btn-solid" onClick={() => navigate(`/citySelected/${city._id}`)}>View Itinerary</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
