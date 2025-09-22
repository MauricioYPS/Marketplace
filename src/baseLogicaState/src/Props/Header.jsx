import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", auth: false },
  { to: "/cities", label: "Cities", auth: true },
];

export default function Header() {
  const user = useSelector((s) => s.authStore.user);
  const token = useSelector((s) => s.authStore.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl container-px">
        <div className="mt-4 glassbar">
          <div className="flex items-center justify-between px-4 py-3">

            <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 grid place-items-center font-bold text-white shadow-lg animate-float">M</div>
              <span className="text-lg font-semibold tracking-wide group-hover:opacity-90">MyTinerary</span>
            </button>


            <nav className="hidden md:flex items-center gap-2">
              {links.map((l) => (!l.auth || token) && (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl transition ${isActive ? "bg-cyan-600/30 text-white" : "text-slate-200 hover:bg-white/5"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>


            <div className="hidden md:flex items-center gap-3">
              {!token ? (
                <>
                  <button onClick={() => navigate("/singIn")} className="btn btn-muted">Login</button>
                  <button onClick={() => navigate("/singUp")} className="btn btn-primary">Register</button>
                </>
              ) : (
                <>
                  <button onClick={() => dispatch({ type: "logout" })} className="btn btn-muted">Logout</button>
                  <img
                    src={user?.photoUrl || "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-white/20 object-cover"
                  />
                </>
              )}
            </div>


            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl bg-white/10 border border-white/10" aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3.75 6.75h16.5v1.5H3.75v-1.5ZM3.75 11.25h16.5v1.5H3.75v-1.5Zm0 4.5h16.5v1.5H3.75v-1.5Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>


          {open && (
            <div className="md:hidden px-4 pb-4 animate-fade-in-up">
              <div className="flex flex-col gap-2">
                {links.map((l) => (!l.auth || token) && (
                  <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">{l.label}</NavLink>
                ))}
                {!token ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { setOpen(false); navigate("/singIn"); }} className="btn btn-muted w-full">Login</button>
                    <button onClick={() => { setOpen(false); navigate("/singUp"); }} className="btn btn-primary w-full">Register</button>
                  </div>
                ) : (
                  <button onClick={() => { setOpen(false); dispatch({ type: "logout" }); }} className="btn btn-muted">Logout</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
