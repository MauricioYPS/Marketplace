import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCities } from "../store/reducers/cityReducer";
import { useEffect, useState } from "react";

export default function Itinerary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: citySelected } = useParams();

  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const { city, itineraries } = useSelector((state) => {
    const c = state.cities.cities.find((x) => x._id === citySelected);
    const its = c?.itinerary ? [c.itinerary] : [];
    return { city: c, itineraries: its };
  });

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  if (!city) return <p className="text-center py-24 text-slate-400">City not found</p>;

  const likeCount = (it) => (liked ? (it.likes || 0) + 1 : it.likes || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">

      <div className="h-28" />

      <section className="relative w-full">
        <div
          className="relative h-[42vh] sm:h-[48vh] lg:h-[56vh] w-full overflow-hidden"
        >
          <img
            src={city.photo}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />
          <div className="relative max-w-6xl mx-auto h-full px-4 flex items-end">
            <div className="pb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow">
                {city.name}
              </h1>
              <p className="mt-2 text-slate-200/90">
                {city.continent} • {city.country}
              </p>
              <button
                onClick={() => navigate("/cities")}
                className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                           bg-slate-800/70 border border-slate-700 hover:bg-slate-700 active:bg-slate-600
                           transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back to Cities
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-cyan-500/20 text-cyan-300 px-3 py-1 text-xs font-semibold border border-cyan-400/30">
                  {city.badge}
                </span>
                <span className="text-sm text-slate-300">{city.continent}, {city.country}</span>
              </div>
              <p className="mt-4 text-slate-200/90 leading-relaxed">
                {city.description}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6 shadow-xl">
            <div className="aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/10">
              <img
                src={city.photo}
                alt={city.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                <p className="opacity-70">Country</p>
                <p className="font-semibold text-slate-100">{city.country}</p>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                <p className="opacity-70">Continent</p>
                <p className="font-semibold text-slate-100">{city.continent}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Itineraries</h2>

          {itineraries && itineraries.length > 0 ? (
            <div className="mt-6 space-y-8">
              {itineraries.map((it) => (
                <article
                  key={it._id}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={it.photoPerson}
                        alt={it.namePerson}
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-slate-100">{it.nameActivity}</p>
                        <p className="text-sm text-slate-300">By {it.namePerson}</p>
                      </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-white/10">
                      <img
                        src={it.photoActivity}
                        alt={it.nameActivity}
                        className="w-full h-[240px] sm:h-[320px] object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300">Price:</span>
                        <div className="flex items-center">
                          {Array.from({ length: it.price || 0 }).map((_, idx) => (
                            <img
                              key={idx}
                              src="https://cdn-icons-png.freepik.com/128/1479/1479433.png"
                              alt="price-icon"
                              className="h-5 w-5 sm:h-6 sm:w-6"
                            />
                          ))}
                        </div>
                      </div>

                      <span className="text-slate-300">Duration: {it.duration} Hs</span>

                      <button
                        onClick={() => setLiked((v) => !v)}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm
                                   bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/15
                                   transition-colors"
                      >
                        <img
                          src={
                            liked
                              ? "https://cdn-icons-png.freepik.com/512/15118/15118349.png"
                              : "https://cdn-icons-png.freepik.com/512/14351/14351140.png"
                          }
                          alt="like"
                          className={`h-5 w-5 sm:h-6 sm:w-6 ${liked ? "animate-pulse" : ""}`}
                        />
                        <span className="text-slate-200">{likeCount(it)}</span>
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(it.hashtags || []).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-semibold
                                     bg-cyan-500/15 text-cyan-200 border border-cyan-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-slate-300">View more</p>
                        <button
                          onClick={() => setOpen((v) => !v)}
                          className="rounded-md p-2 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 transition"
                          aria-expanded={open}
                          aria-controls={`more-${it._id}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                               fill="currentColor" className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}>
                            <path fillRule="evenodd"
                                  d="M11.47 13.28a.75.75 0 001.06 0l7.5-7.5a.75.75 0 10-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 10-1.06 1.06l7.5 7.5Z"
                                  clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      <div
                        id={`more-${it._id}`}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-slate-300">
                              This section is under construction! Soon you’ll find activities, schedules,
                              tips and more details for <span className="font-semibold text-slate-100">{it.nameActivity}</span>.
                            </p>
                            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                              <img
                                className="h-6 w-6"
                                src="https://cdn-icons-png.freepik.com/512/8176/8176754.png"
                                alt="construction"
                              />
                              Coming soon
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-slate-400 italic text-center">No itineraries yet for this city</p>
          )}
        </div>
      </section>
    </div>
  );
}
