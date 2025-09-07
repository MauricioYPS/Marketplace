import { NavLink } from "react-router-dom"
export default function Body() {

    return (
        <>
            <section id="inicio" class="flex flex-col items-center justify-center py-12 px-6 md:px-12 lg:px-24">
                
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

                        <img src="https://placehold.co/800x600/2C5234/F8F7F2?text=Foto+del+Llano" alt="paisaje llanero" class="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-[100%]">
                    <h2 class="text-3xl font-bold text-primary mb-6">Anuncios Importantes</h2>
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

                    <h2 class="text-3xl font-bold text-primary mb-6">Destacados del Marketplace</h2>
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