import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SideBar() {

    const routes = [
        { to: "/", text: "Home",requiredAuth: false }, ,
        { to: "/cities", text: "Cities",requiredAuth: true },
    ]
    const token = useSelector((state) => state.authStore.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick() {
        navigate("/cities");
        setOpen(false);
    }

    function handleClickLogin() {
        navigate("/singIn")
        setOpen(false);
    }

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex justify-between items-center p-4 bg-cyan-600 text-white sm:hidden  rounded-2xl border-2 w-96vw w-96">
            </div>

            <div className="ml-3 z-50 relative sm:block hidden">
                <button className="bg-white flex justify-center" onClick={() => setOpen(!open)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full h-full fixed top-0 left-0 right-0 border-2 backdrop-blur-sm z-40`} onClick={() => setOpen(false)}></div>

                <div className={`${open ? "w-96" : "w-0"} bg-cyan-600 min-h-screen fixed top-0 left-0 transition-all duration-300 overflow-hidden z-50`}>
                    {open && (
                        <div className="pt-3">
                            <button className="flex ml-3 bg-slate-400 p-2 rounded-lg mt-2 text-white mb-14" onClick={() => setOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            {routes.map((route, index) => 
                                (!route.requiredAuth || token) && (
                                <button className="w-full text-center bg-center text-white text-2xl hover:bg-slate-200 cursor-pointer py-3 mb-2 hover:text-slate-950 flex justify-center" key={index} onClick={() => navigate(route.to)}>{route.text}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
