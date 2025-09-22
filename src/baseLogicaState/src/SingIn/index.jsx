import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import  { login} from "../store/actions/authActions.js"

export default function SingIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.authStore);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({email, password}));
    };

    const LoginWithGoogle = () => {
        window.location.href="http://localhost:8080/api/auth/signin/google";
    };

    const loading = authStore.loading;
    const error = authStore.error;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            {/* espacio por navbar fijo */}
            <div className="h-28" />

            <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Panel visual (solo estética) */}
                    <div className="hidden lg:block relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
                        <img
                            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                            alt="travel"
                            className="w-full h-[520px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <h2 className="text-2xl font-bold">Welcome back</h2>
                            <p className="text-slate-300">Pick up your next adventure where you left off.</p>
                        </div>
                    </div>

                    {/* Card de login (misma lógica y botones) */}
                    <div className="w-full max-w-md mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full mt-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full mt-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                                    required
                                />
                            </div>

                            {/* Botón submit — SIN cambios de funcionalidad */}
                            <button
                                type="submit"
                                className="w-full btn btn-solid btn-lg"
                                onSubmit={handleSubmit}
                            >
                                Login
                            </button>

                            {loading && <p className="text-sm text-slate-300">Loading...</p>}
                            {error && <p className="text-sm text-red-400">{error}</p>}
                        </form>

                        {/* Botón Login con Google — MISMO onClick */}
                        <button
                            type="submit"
                            className="w-full mt-4 btn btn-glass"
                            onClick={()=>LoginWithGoogle()}>
                            Login GOOGlE
                        </button>

                        <p className="mt-4 text-sm text-center text-slate-300">
                            Don't have an account?{" "}
                            <a href="/singUp" className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
