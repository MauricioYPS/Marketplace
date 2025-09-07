import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

export default function Header() {
    const linkBase =
        "nav-link px-4 py-2 rounded-full font-medium transition-colors";
    const linkActive = "bg-primary text-white";
    const linkInactive = "hover:bg-gray-200 text-gray-800";

    return (<>
        <div class="">
            {/* <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary h-8 w-8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                    <a href="#" class="text-2xl font-bold text-primary">Mercado<span class="text-accent">Local</span></a>
                </div>
                <div class="hidden md:flex items-center space-x-2">
                    <a class="nav-link active" data-target="inicio">Inicio</a>
                    <a class="nav-link" data-target="marketplace">Marketplace</a>
                    <a class="nav-link" data-target="noticias">Noticias</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a class="nav-link flex items-center gap-2" data-target="perfil">
                        <img src="https://placehold.co/40x40/2C5234/FFFFFF?text=U" alt="foto de perfil" />
                        <span class="hidden sm:block">Mi Perfil</span>
                    </a>
                </div>
            </nav> */}
            <header className="bg-[#F8F7F2] sticky top-0 z-50 shadow-sm text-gray-800">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    {/* LOGO */}
                    <div className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <NavLink
                            to="/"
                            className="text-2xl font-bold text-primary"
                        >
                            Mercado<span className="text-accent">Local</span>
                        </NavLink>
                    </div>

                    {/* NAV LINKS DESKTOP */}
                    <div className="hidden md:flex items-center space-x-2">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : linkInactive}`
                            }
                        >
                            Inicio
                        </NavLink>

                        <NavLink
                            to="/marketplace"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : linkInactive}`
                            }
                        >
                            Marketplace
                        </NavLink>

                        {/* Puedes activar esto cuando tengas la ruta de noticias */}
                        {/* <NavLink
            to="/news"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Noticias
          </NavLink> */}
                    </div>

                    {/* PERFIL / USER */}
                    <div className="flex items-center space-x-4">
                        <button className="nav-link flex items-center gap-2">
                            <img
                                src="https://placehold.co/40x40/2C5234/FFFFFF?text=U"
                                alt="Perfil"
                                className="w-8 h-8 rounded-full border-2 border-accent"
                            />
                            <span className="hidden sm:block">Mi Perfil</span>
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    </>)
}