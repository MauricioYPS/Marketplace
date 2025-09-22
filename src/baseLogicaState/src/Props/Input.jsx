import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../store/reducers/cityReducer";
import { useEffect, useRef } from "react";

export default function Input() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.cities);
  const debounceRef = useRef(null);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: 'cities/changeSearch', payload: searchTerm });
      dispatch(fetchCities(searchTerm));
    }, 250);
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <div className="fixed left-0 right-0 z-30 top-24 md:top-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="glassbar px-3 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/home')}
              className="btn btn-muted"
            >
              Home
            </button>
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300/70" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.035 12.164l3.776 3.775 1.06-1.06-3.776-3.776A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                placeholder="Search cities..."
                defaultValue={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
