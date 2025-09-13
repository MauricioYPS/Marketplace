import { NavLink } from "react-router-dom"
import cta from '../assets/ctaTemporal.jpg'
export default function Body() {

    return (
        <>
            <section id="inicio" class="flex flex-col items-center justify-center py-12 px-6 md:px-12 lg:px-24">

                <section id="ctaSection" class="w-full ">
                    <div id="tabletsCta" class="hidden md:block lg:hidden">
                        <div class="relative rounded-lg shadow-lg overflow-hidden mb-12 h-96 flex items-center justify-center text-center text-white">
                            <img src={cta} alt="Paisaje llanero" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-black/40"></div>
                            <div class="relative p-8">
                                <h1 class="text-5xl font-bold mb-4">Bienvenido a tu mercado en Mapiripán</h1>
                                <p class="text-xl mb-6 max-w-2xl mx-auto">Encuentra productos, servicios, noticias y eventos de nuestra comunidad. ¡Apoya lo nuestro!</p>
                                <NavLink to="/marketplace" className="flex items-center btn btn-accent text-lg text-center">
                                    Explorar Marketplace
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div id="desktopCta" class="hidden lg:block">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-12 flex flex-col md:flex-row items-center">
                            <div class=" p-8 md:w-1/2">
                                <h1 class="text-4xl font-bold text-primary mb-4">Bienvenido a tu mercado local en Mapiripán</h1>
                                <p class="text-gray-600 mb-6">Encuentra productos, servicios, noticias y eventos de nuestra comunidad. ¡Apoya lo nuestro!</p>
                                <button class="btn btn-primary" onclick="navigateTo('marketplace')">
                                    <NavLink to="/marketplace" className="">
                                        Explorar Marketplace <i data-lucide="arrow-right" class="ml-2 w-5 h-5"></i>
                                    </NavLink>
                                </button>
                            </div>
                            <div class="md:w-1/2 h-64 md:h-auto w-full">
                                {/* <div class="absolute inset-0 bg-black/50 w-full"></div> */}

                                <img src={cta} alt="Paisaje llanero " />
                                
                            </div>
                        </div>
                    </div>
                    <div id="mobileCta" className="md:hidden">
                        <div className="relative rounded-lg shadow-lg overflow-hidden mb-12 h-96 flex items-center justify-center text-center text-white">
                            <img src={cta} alt="Paisaje llanero" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="relative p-8">
                                <h1 className="text-5xl font-bold mb-4">Bienvenido a tu mercado en Mapiripán</h1>
                                <p className="text-xl mb-6 max-w-2xl mx-auto">Encuentra productos, servicios, noticias y eventos de nuestra comunidad. ¡Apoya lo nuestro!</p>
                                <NavLink to="/marketplace" className="flex items-center btn btn-accent text-lg text-center">
                                    Explorar Marketplace
                                </NavLink>
                            </div>
                        </div>
                    </div>

                </section>

                <div className="w-[100%]">
                    <div className="w-full flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="megaphone" class="lucide lucide-megaphone w-8 h-8 text-accent"><path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"></path><path d="M8 6v8"></path></svg>
                        <h2 class="text-3xl font-bold text-primary mb-2 ml-2">Anuncios Importantes</h2>
                    </div>

                    <div className="w-full text-accent mb-6 ">
                        <div className=" border-1 rounded-md"></div>
                    </div>

                    <div class="grid md:grid-cols-3 gap-8 mb-12">
                        <div class="card p-6">
                            <div class="flex items-center gap-4 mb-4">
                                <div class="bg-accent p-3 rounded-full"><i data-lucide="megaphone" class="text-primary"></i></div>
                                <h3 class="text-xl font-semibold text-primary">Alcaldía Municipal</h3>
                            </div>
                            <p class="text-gray-600">Jornada de vacunación canina y felina este Sábado en el parque principal. ¡No faltes!</p>
                        </div>
                        <div class="card p-6">
                            <div class="flex items-center gap-4 mb-4">
                                <div class="bg-accent p-3 rounded-full"><i data-lucide="lightbulb" class="text-primary"></i></div>
                                <h3 class="text-xl font-semibold text-primary">Empresa de Energía</h3>
                            </div>
                            <p class="text-gray-600">Corte programado del servicio para el día Lunes de 8am a 2pm en el barrio El Centro.</p>
                        </div>
                        <div class="card p-6">
                            <div class="flex items-center gap-4 mb-4">
                                <div class="bg-accent p-3 rounded-full"><i data-lucide="droplets" class="text-primary"></i></div>
                                <h3 class="text-xl font-semibold text-primary">Acueducto Local</h3>
                            </div>
                            <p class="text-gray-600">Recomendamos hacer uso racional del agua durante la temporada de verano que se aproxima.</p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="shopping-basket" class="lucide lucide-shopping-basket w-8 h-8 text-accent"><path d="m15 11-1 9"></path><path d="m19 11-4-7"></path><path d="M2 11h20"></path><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"></path><path d="M4.5 15.5h15"></path><path d="m5 11 4-7"></path><path d="m9 11 1 9"></path></svg>
                        <h2 class="text-3xl font-bold text-primary mb-2 ml-2">Destacados del Marketplace</h2>
                    </div>

                    <div className="w-full text-accent mb-6 ">
                        <div className=" border-1 rounded-md"></div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        <div class="card">
                            <img src="https://placehold.co/400x300/F5F5DC/333333?text=Queso+Llanero" alt="queso llanero" class="w-full h-40 object-cover" />
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">Queso Siete Cueros</h3>
                                <p class="text-primary font-bold text-xl">$12,000 COP</p>
                                <p class="text-gray-500 text-sm">por Libra</p>
                            </div>
                        </div>
                        <div class="card">
                            <img src="https://placehold.co/400x300/F5F5DC/333333?text=Artesanía" alt="Artesanía local" class="w-full h-40 object-cover" />
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">Chinchorro de Moriche</h3>
                                <p class="text-primary font-bold text-xl">$150,000 COP</p>
                                <p class="text-gray-500 text-sm">Unidad</p>
                            </div>
                        </div>
                        <div class="card">
                            <img src="https://placehold.co/400x300/F5F5DC/333333?text=Miel+de+Abejas" alt="Miel de abejas" class="w-full h-40 object-cover" />
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">Miel Pura de Finca</h3>
                                <p class="text-primary font-bold text-xl">$20,000 COP</p>
                                <p class="text-gray-500 text-sm">Botella 500ml</p>
                            </div>
                        </div>
                        <div class="card">
                            <img src="https://placehold.co/400x300/F5F5DC/333333?text=Servicio" alt="Servicio de Jardinería" class="w-full h-40 object-cover" />
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">Servicio de Jardinería</h3>
                                <p class="text-primary font-bold text-xl">A convenir</p>
                                <p class="text-gray-500 text-sm">Contactar</p>
                            </div>
                        </div>
                        <div class="card hidden lg:block">
                            <img src="https://placehold.co/400x300/F5F5DC/333333?text=Plátano+Hartón" alt="Plátano" class="w-full h-40 object-cover" />
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">Plátano Hartón</h3>
                                <p class="text-primary font-bold text-xl">$2,000 COP</p>
                                <p class="text-gray-500 text-sm">Racimo</p>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}