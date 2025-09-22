import React, { useState, useEffect } from "react";
import { fetchCountries } from "../store/reducers/cityReducer"

const RegisterForm = () => {

    const LoginWithGoogle = () => {
        window.location.href = "http://localhost:8080/api/auth/signin/google";
    };

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        photoUrl: "",
        country: "",
    });
    const [countries, setCountries] = useState([]); // Estado para almacenar los países
    const [loading, setLoading] = useState(true); // Estado para el indicador de carga
    const [error, setError] = useState(null);
    console.log(countries);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Failed to register. if you have an account log in")
                return;
            }

            const data = await response.json();
            alert("User registered successfully!");
            console.log("Success:", data);
        } catch (err) {
            console.error("Network error:", err);
            setError("A network error occurred. Please try again.");
        }
    };

    useEffect(() => {
        // Función para obtener los datos
        const getCountries = async () => {
            try {
                const data = await fetchCountries(); // Llama a la función
                setCountries(data.response); // Guarda los datos en el estado
            } catch (error) {
                setError('No se pudo traer la información'); // Maneja el error
            } finally {
                setLoading(false); // Finaliza el indicador de carga
            }
        };
        getCountries(); // Llama a la función al montar el componente
    }, []);

    // Muestra un mensaje de carga
    if (loading) return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            <div className="h-28" />
            <p className="text-center py-24 text-slate-300">Cargando países...</p>
        </div>
    );

    // Muestra un mensaje de error si ocurrió un problema
    if (error) return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            <div className="h-28" />
            <p className="text-center py-24 text-red-400">Error: {error}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            {/* espacio por navbar fijo */}
            <div className="h-28" />

            <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Panel visual (solo estética) */}
                    <div className="hidden lg:block relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
                        <img
                            src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop"
                            alt="travel"
                            className="w-full h-[520px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <h2 className="text-2xl font-bold">Create your account</h2>
                            <p className="text-slate-300">Plan smarter, travel better.</p>
                        </div>
                    </div>

                    {/* Card de registro (misma lógica y botones) */}
                    <div className="w-full max-w-md mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
                        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full mt-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className="w-full mt-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full mt-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Photo URL</label>
                                <input
                                    type="url"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    placeholder="Enter your photo URL"
                                    className="w-full mt-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                                    required
                                />
                            </div>

                            {/* Conservamos tu input type="select" y el <select> original: no toco la lógica */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Country</label>
                                <input
                                    type="select"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Enter your country"
                                    className="w-full mt-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                                    required
                                />
                            </div>

                            <select
                                name="country"
                                id=""
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full h-12 mt-2 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40
                                           [color-scheme:dark]"
                            >
                                {countries.map((country,index) => (
                                    <option
                                        key={index}
                                        name="country"
                                        type="select"
                                        className="bg-slate-900 text-slate-100"
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>

                            {/* Botón submit — SIN cambios de funcionalidad */}
                            <button
                                type="submit"
                                className="w-full btn btn-solid btn-lg"
                            >
                                Register
                            </button>

                            {/* Botón Login con Google — MISMO onClick */}
                            <button
                                type="submit"
                                className="w-full mt-4 btn btn-glass"
                                onClick={() => LoginWithGoogle()}>
                                Login GOOGlE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
