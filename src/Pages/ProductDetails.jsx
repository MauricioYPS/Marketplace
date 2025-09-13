import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/reducers/productsSlice";

export default function ProductDetails() {
  const { id: productSelected } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = useMemo(
    () => products.find((p) => p._id === productSelected),
    [products, productSelected]
  );

  const related = useMemo(
    () =>
      products
        .filter((p) => p.category === product?.category && p._id !== productSelected)
        .slice(0, 5),
    [products, product?.category, productSelected]
  );

  // Galería: usa photoUrl + (opcional) product.photos (array)
  const photos = useMemo(() => {
    const arr = [];
    if (product?.photoUrl) arr.push(product.photoUrl);
    if (Array.isArray(product?.photos)) {
      for (const url of product.photos) if (url && !arr.includes(url)) arr.push(url);
    }
    return arr;
  }, [product]);

  const [activePhoto, setActivePhoto] = useState(0);
  useEffect(() => setActivePhoto(0), [productSelected]);

  function handleNavigate(id){
    navigate(`/productDetails/${id}`);
  }

  if (loading || !product) return <div className="text-center mt-10 min-h-screen">Cargando detalles...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  const priceCOP = (product.price ?? 0).toLocaleString("es-CO");
  const unit = product.unit ? ` / ${product.unit}` : "";
  const stock = Number.isFinite(product.stock) ? product.stock : null;


  const phone = product.user?.phone || product.user?.whatsapp;
  const waText = encodeURIComponent(`Hola, vi tu producto "${product.name}" en Mercado Local. ¿Sigue disponible?`);
  const waHref = phone ? `https://wa.me/${String(phone).replace(/\D/g, "")}?text=${waText}` : null;

  return (
    <div className="min-h-screen w-full bg-[#F8F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">


        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#2C5234] font-semibold cursor-pointer hover:underline"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            Volver
          </button>
        </div>


        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">


            <div>
              <div className="w-full aspect-square rounded-lg overflow-hidden shadow-sm">
                <img
                  src={photos[activePhoto] || "https://via.placeholder.com/800x800?text=Sin+imagen"}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>


              {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {photos.map((src, idx) => (
                    <button
                      key={src + idx}
                      onClick={() => setActivePhoto(idx)}
                      className={`relative rounded-md overflow-hidden border-2 ${activePhoto === idx ? "border-amber-500" : "border-transparent hover:border-amber-500"}`}
                      aria-label={`Foto ${idx + 1}`}
                    >
                      <img src={src} alt={`mini ${idx + 1}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>


            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold bg-amber-300/60 text-[#2C5234] px-3 py-1 rounded-full">
                {product.category || "General"}
              </span>

              <h1 className="text-2xl sm:text-4xl font-bold text-[#2C5234] my-3">
                {product.name}
              </h1>

              <p className="text-3xl sm:text-4xl font-bold text-[#2C5234] mb-4">
                ${priceCOP} <span className="text-xl sm:text-2xl font-normal text-gray-600">{unit}</span>
              </p>

              <div className="border-y border-gray-200 py-4 my-4">
                <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {product.description || "Sin descripción proporcionada."}
                </p>
              </div>

              {stock !== null && (
                <div className="mb-6">
                  <span className="text-lg font-semibold text-green-600">
                    {stock} {unit ? unit.replace("/", "").trim() : "disponibles"}
                  </span>
                </div>
              )}


              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg mb-3">Información del vendedor</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={product.user?.photo || "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"}
                    alt="Vendedor"
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/60"
                  />
                  <div>
                    <p className="font-bold text-[#2C5234]">
                      {product.user?.name || "Usuario desconocido"}
                    </p>

                    <p className="text-sm text-gray-500">Miembro verificado</p>
                  </div>
                </div>
              </div>


              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-white text-lg font-semibold"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 .25C5.52.25.25 5.52.25 12c0 2 .5 3.9 1.45 5.6L0 24l6.6-1.7A11.74 11.74 0 0 0 12 23.75c6.48 0 11.75-5.27 11.75-11.75 0-3.14-1.22-6.08-3.23-8.52ZM12 21.5c-1.86 0-3.6-.5-5.13-1.46l-.37-.22-3.9 1 1.05-3.8-.25-.39A9.49 9.49 0 1 1 21.5 12 9.49 9.49 0 0 1 12 21.5Zm5.22-7.14c-.29-.14-1.7-.83-1.96-.92-.26-.1-.45-.14-.64.14s-.74.92-.9 1.1c-.16.18-.33.2-.62.07a7.73 7.73 0 0 1-2.27-1.4 8.52 8.52 0 0 1-1.58-1.95c-.17-.3-.02-.46.12-.6.12-.12.28-.32.42-.48.14-.16.19-.27.29-.46.1-.2.05-.37-.02-.52-.08-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.54-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.06 2.9 1.21 3.1c.15.2 2.08 3.18 5.03 4.46.7.3 1.24.48 1.67.61.7.22 1.35.19 1.86.11.57-.09 1.7-.7 1.95-1.38.24-.67.24-1.25.17-1.38-.07-.14-.26-.22-.55-.36Z"/></svg>
                  Contactar por WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 bg-gray-300 text-gray-600 text-lg font-semibold cursor-not-allowed"
                  title="El vendedor no tiene WhatsApp configurado"
                >
                  WhatsApp no disponible
                </button>
              )}
            </div>
          </div>
        </div>


        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C5234] mb-6">Productos similares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {related.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              onClick={() => handleNavigate(item._id)}>
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base sm:text-lg line-clamp-2">{item.name}</h3>
                  <p className="text-[#2C5234] font-bold text-lg sm:text-xl mt-1">
                    ${item.price.toLocaleString("es-CO")} COP
                  </p>
                  {item.unit && <p className="text-gray-500 text-sm">{item.unit}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
