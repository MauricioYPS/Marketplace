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
    if (loading) return <p>Cargando países...</p>;

    // Muestra un mensaje de error si ocurrió un problema
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input
                            type="url"
                            name="photoUrl"
                            value={formData.photoUrl}
                            onChange={handleChange}
                            placeholder="Enter your photo URL"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="select"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Enter your country"
                            
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                            
                        />
                    </div>
                    <select name="country" id=""
                    value={formData.country} onChange={handleChange} required
                    >
                                            {countries.map((country,index) => (
                            <option key={index} name="country" type="select" >
                                {country.name}    
                            </option>
                        ))}
                    </select>

                    {/* <select name="country" id="">
                        {countries.map((country,index) => (
                            <option key={index} name="country" type="select" value={formData.country} onChange={handleChange} required>
                                {country.name}    
                            </option>
                        ))}
                    </select> */}
                    {/* <div>
                        <h1>Lista de Países</h1>
                        <ul>
                            {countries.map((country,index) => (
                                <li key={index}>{country.response}</li> // Ajusta según tu estructura de datos
                            ))}
                        </ul>
                    </div> */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-slate-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
                        onClick={() => LoginWithGoogle()}>
                        Login GOOGlE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;


