
import { useState } from "react";

export default function ProfileBussiness() {
  const [activeTab, setActiveTab] = useState("info"); 

  return (
    <section id="perfil" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
          Mi Perfil de Vendedor
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Columna Izquierda: Tarjeta de Perfil */}
          <div className="lg:col-span-1 space-y-8 lg:sticky top-28">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src="https://placehold.co/128x128/FF7E5F/FFFFFF?text=Logo"
                  alt="Foto de perfil"
                  className="rounded-full w-full h-full object-cover border-4 border-white shadow-md"
                />
                <button
                  className="absolute bottom-0 right-0 bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-800 transition"
                  type="button"
                >
                  {/* <Camera className="w-4 h-4" /> */}
                </button>
              </div>
              <h3 className="text-2xl font-bold text-green-800">
                Asadero El Cumaral
              </h3>
              <p className="text-gray-500">Juan Pérez</p>
              <div className="mt-4 text-left space-y-3">
                <p className="flex items-center text-gray-700">
                  {/* <Mail className="w-4 h-4 mr-3 text-orange-500" /> juan.perez@email.com */}
                </p>
                <p className="flex items-center text-gray-700">
                  {/* <Phone className="w-4 h-4 mr-3 text-orange-500" /> 310 123 4567 */}
                </p>
                <p className="flex items-center text-gray-700">
                  {/* <MessageCircle className="w-4 h-4 mr-3 text-orange-500" /> 310 987 6543 */}
                </p>
              </div>
            </div>

            {/* Estado de Formalización */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-bold text-lg text-green-800 mb-4 text-center">
                Estado de Formalización
              </h4>

              {/* Caso 1: Completo (oculto) */}
              <div className="text-center p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg hidden">
                {/* <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" /> */}
                <p className="font-semibold text-green-800">¡Felicitaciones!</p>
                <p className="text-sm text-green-700">
                  Tu negocio se encuentra al día y formalizado.
                </p>
              </div>

              {/* Caso 2: En Proceso (visible) */}
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                <div className="flex items-center gap-3 mb-3">
                  {/* <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0" /> */}
                  <p className="font-semibold text-yellow-800">
                    Estás en proceso. ¡Sigue así!
                  </p>
                </div>
                <p className="text-sm text-yellow-700 mb-4">
                  Completa los siguientes requisitos para estar al 100%:
                </p>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Certificado de Bomberos</li>
                  <li>Curso de manipulación de alimentos</li>
                </ul>
                <button
                  className="w-full mt-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-600 text-sm transition"
                  type="button"
                >
                  Continuar Proceso
                </button>
              </div>

              {/* Caso 3: No Iniciado (oculto) */}
              <div className="text-center p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg hidden">
                {/* <FileX2 className="w-12 h-12 text-red-500 mx-auto mb-2" /> */}
                <p className="font-semibold text-red-800">¡Impulsa tu negocio!</p>
                <p className="text-sm text-red-700 mb-4">
                  Aún no has iniciado tu proceso de formalización.
                </p>
                <button
                  className="w-full mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 text-sm transition"
                  type="button"
                >
                  Iniciar Proceso Ahora
                </button>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Contenido Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {/* Pestañas de Navegación */}
              <div className="flex border-b mb-6">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`py-3 px-6 font-semibold text-gray-600 border-b-2 ${
                    activeTab === "info"
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent hover:text-orange-500"
                  }`}
                >
                  Editar Información
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-3 px-6 font-semibold text-gray-600 border-b-2 ${
                    activeTab === "products"
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent hover:text-orange-500"
                  }`}
                >
                  Mis Productos
                </button>
              </div>

              {/* Contenido Pestaña 1: Editar Información */}
              {activeTab === "info" && (
                <div id="editInfoTab">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">
                    Información de la Cuenta
                  </h3>
                  <form
                    className="space-y-6"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nombre del Negocio
                        </label>
                        <input
                          type="text"
                          defaultValue="Asadero El Cumaral"
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tu Nombre Completo
                        </label>
                        <input
                          type="text"
                          defaultValue="Juan Pérez"
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de Teléfono
                        </label>
                        <input
                          type="tel"
                          defaultValue="310 123 4567"
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de WhatsApp
                        </label>
                        <input
                          type="tel"
                          defaultValue="310 987 6543"
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Correo Electrónico (no editable)
                      </label>
                      <input
                        type="email"
                        defaultValue="juan.perez@email.com"
                        readOnly
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                      />
                    </div>

                    <div className="text-right pt-4">
                      <button
                        type="submit"
                        className="bg-green-700 text-white font-bold py-2 px-5 rounded-full hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Contenido Pestaña 2: Mis Productos */}
              {activeTab === "products" && (
                <div id="productsTab">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-green-800">
                      Mis Productos y Servicios
                    </h3>
                    <button
                      className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition flex items-center gap-2"
                      type="button"
                    >
                      {/* <PlusCircle className="w-5 h-5" /> */}
                      <span>Subir Producto</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Producto 1 */}
                    <div className="bg-gray-50 rounded-xl overflow-hidden border">
                      <img
                        src="https://placehold.co/400x300/FF7E5F/FFFFFF?text=Producto+1"
                        alt="Producto 1"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-green-800">
                          Carne a la Llanera
                        </h4>
                        <p className="text-lg font-bold text-orange-500">
                          $35.000
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button
                            className="w-full bg-green-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-green-700 transition"
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            className="w-full bg-gray-200 text-gray-700 text-sm font-bold py-2 px-3 rounded-lg hover:bg-gray-300 transition"
                            type="button"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Producto 2 */}
                    <div className="bg-gray-50 rounded-xl overflow-hidden border">
                      <img
                        src="https://placehold.co/400x300/FF7E5F/FFFFFF?text=Producto+4"
                        alt="Producto 4"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-green-800">
                          Picada para 2
                        </h4>
                        <p className="text-lg font-bold text-orange-500">
                          $50.000
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button
                            className="w-full bg-green-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-green-700 transition"
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            className="w-full bg-gray-200 text-gray-700 text-sm font-bold py-2 px-3 rounded-lg hover:bg-gray-300 transition"
                            type="button"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
