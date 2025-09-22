import { useEffect, useMemo, useState } from "react";
import Input from "../Props/Input.jsx";
import Cards from "../Props/Card.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/** Minimal country -> continent map (fallback if city.continent is not present) */
const COUNTRY_CONTINENT = {
  // Americas
  "Argentina":"Americas","Brazil":"Americas","Canada":"Americas","Chile":"Americas","Colombia":"Americas","Mexico":"Americas","Peru":"Americas","United States":"Americas","USA":"Americas","Uruguay":"Americas","Venezuela":"Americas",
  // Europe
  "France":"Europe","Germany":"Europe","Italy":"Europe","Spain":"Europe","United Kingdom":"Europe","Portugal":"Europe","Netherlands":"Europe","Greece":"Europe","Sweden":"Europe","Norway":"Europe","Poland":"Europe","Russia":"Europe",
  // Asia
  "Japan":"Asia","China":"Asia","India":"Asia","South Korea":"Asia","Singapore":"Asia","Thailand":"Asia","Turkey":"Asia","United Arab Emirates":"Asia","UAE":"Asia","Indonesia":"Asia","Vietnam":"Asia","Israel":"Asia",
  // Africa
  "Egypt":"Africa","South Africa":"Africa","Morocco":"Africa","Kenya":"Africa","Tunisia":"Africa",
  // Oceania
  "Australia":"Oceania","New Zealand":"Oceania",
};

function getContinent(city){
  if (city.continent) return city.continent;
  if (city.region) return city.region;
  if (COUNTRY_CONTINENT[city.country]) return COUNTRY_CONTINENT[city.country];
  return "Other";
}

function ListRow({ city }){
  const navigate = useNavigate();
  return (
    <div className="list-row card overflow-hidden">
      <div className="thumb">
        <img src={city.photo} alt={city.name} />
      </div>
      <div className="content">
        <div className="title-row">
          <h3 className="title">{city.name}</h3>
          <span className="chip">{city.country}</span>
        </div>
        <p className="desc">{city.description}</p>
      </div>
      <div className="actions">
        <button className="btn btn-solid" onClick={() => navigate(`/citySelected/${city._id}`)}>View Itinerary</button>
      </div>
    </div>
  );
}

export default function Cities() {
  const [firstLoad] = useState(() => !sessionStorage.getItem("cities_seen"));
  const { cities, search } = useSelector(state => state.cities);
  const [loading, setLoading] = useState(firstLoad);

  // UI state
  const [view, setView] = useState("grid"); // 'grid' | 'list'
  const [continent, setContinent] = useState("All");
  const [country, setCountry] = useState("All");

  // mark seen once
  useEffect(() => { if (firstLoad) sessionStorage.setItem("cities_seen", "1"); }, [firstLoad]);

  // brief loading shimmer when search changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [search]);

  // Build facets
  const facets = useMemo(() => {
    const withMeta = cities.map(c => ({...c, __continent: getContinent(c)}));
    const continents = Array.from(new Set(withMeta.map(c => c.__continent))).sort();
    const filteredByCont = continent === "All" ? withMeta : withMeta.filter(c => c.__continent === continent);
    const countries = Array.from(new Set(filteredByCont.map(c => c.country))).sort();
    return { withMeta, continents, countries };
  }, [cities, continent]);

  // Filter pipeline
  const filtered = useMemo(() => {
    let arr = facets.withMeta;
    if (continent !== "All") arr = arr.filter(c => c.__continent === continent);
    if (country !== "All") arr = arr.filter(c => c.country === country);
    return arr;
  }, [facets.withMeta, continent, country]);

  const resultsText = useMemo(() => {
    const n = filtered.length;
    if (!search && continent === "All" && country === "All") return `${n} results`;
    const parts = [];
    if (search) parts.push(`“${search}”`);
    if (continent !== "All") parts.push(continent);
    if (country !== "All") parts.push(country);
    return `${n} result${n === 1 ? "" : "s"} for ${parts.join(" · ")}`;
  }, [filtered.length, search, continent, country]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-[11rem] md:pt-[13rem]">
      {/* fixed search bar */}
      <Input />

      {/* page header with filters + view toggle */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-10 md:mt-12">
        <div className={`card p-5 ${firstLoad ? "animate-fade-in-up" : ""}`}>
          <div className="flex flex-col gap-4">
            {/* title + results + view toggle */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Cities</h1>
                <p className="text-slate-300/90 text-sm md:text-base">{resultsText}</p>
              </div>
              {/* view toggle */}
              <div className="segmented">
                <button
                  className={`seg-btn ${view === "grid" ? "active" : ""}`}
                  onClick={() => setView("grid")}
                  aria-pressed={view === "grid"}
                >
                  Grid
                </button>
                <button
                  className={`seg-btn ${view === "list" ? "active" : ""}`}
                  onClick={() => setView("list")}
                  aria-pressed={view === "list"}
                >
                  List
                </button>
              </div>
            </div>

            {/* filters */}
            <div className="filters">
              <div className="filter">
                <label>Continent</label>
                <select value={continent} onChange={e => { setContinent(e.target.value); setCountry("All"); }}>
                  <option value="All">All</option>
                  {facets.continents.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                </select>
              </div>
              <div className="filter">
                <label>Country</label>
                <select value={country} onChange={e => setCountry(e.target.value)}>
                  <option value="All">All</option>
                  {facets.countries.map(co => <option key={co} value={co}>{co}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* results */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {loading ? (
          <div className="py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="h-56 w-full skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-2/3 skeleton rounded" />
                  <div className="h-3 w-full skeleton rounded" />
                  <div className="h-3 w-5/6 skeleton rounded" />
                  <div className="h-10 w-full skeleton rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24">
            <h2 className="mt-10 text-3xl font-semibold text-center">Oops, no matches…</h2>
            <div className="flex justify-center">
              <img className="object-cover h-52 opacity-80" src="https://png.pngtree.com/png-vector/20240310/ourmid/pngtree-sad-humanoid-robot-png-image_11931020.png" alt="" />
            </div>
          </div>
        ) : view === "grid" ? (
          <div className={`${firstLoad ? "animate-fade-in-up" : ""}`}>
            {/* Reuse existing grid cards; Cards reads from Redux and ignores our filtered list,
                so we render a simple grid ourselves to respect filters. */}
            <div className="py-10">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((city, i) => (
                  <div key={city._id} className="card card-hover overflow-hidden bg-white/[.04] border border-white/10" style={{animationDelay: `${(i%9)*40}ms`}}>
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
                      <a href={`/citySelected/${city._id}`} className="mt-4 w-full btn btn-solid inline-flex justify-center">View Itinerary</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* List view */
          <div className="py-8 space-y-4">
            {filtered.map((c) => <ListRow key={c._id} city={c} />)}
          </div>
        )}
      </section>
    </div>
  );
}
