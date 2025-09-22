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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onSubmit={handleSubmit}>
                        Login
                    </button>

                    
                    {loading && <p className="text-sm text-gray-600">Loading...</p>}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </form>
                <button
                        type="submit"
                        className="w-full bg-slate-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
                        onClick={()=>LoginWithGoogle()}>
                        Login GOOGlE
                    </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a href="/singUp" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};