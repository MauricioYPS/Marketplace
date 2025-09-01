import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/reducers/productsSlice";

export default function ProductDetails() {
  const { id: productSelected } = useParams();
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
      products.filter(
        (p) => p.category === product?.category && p._id !== productSelected
      ).slice(0, 4),
    [products, product?.category, productSelected]
  );

  if (loading || !product) return <div className="text-center mt-10 h-screen">Cargando detalles...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full h-screen flex flex-col p-6 gap-6 ">
      {/* Zona superior: imagen + detalles */}
      <div className="flex w-full h-[80%] gap-4 border-2 border-red-500">
        <div className="w-[60%] h-full bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border-2 border-blue-500 ">
          <img
            src={product.photoUrl || "https://via.placeholder.com/150"}
            alt={product.name || "Producto desconocido"}
            className="object-contain h-full border-2 border-red-500"
          />
        </div>
        <div className="w-[40%] h-full flex flex-col border-2 border-green-500 ">
          {/* Datos del usuario */}
          <div className="flex items-center gap-3 justify-end mt-4 border-2 border-yellow-500">
            <span className="text-sm text-gray-700 font-medium">
              {product.user?.name || "Usuario desconocido"}
            </span>
            <img
              src={product.user?.photo || "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"}
              alt="Usuario"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="w-[2%]"></div>
          </div>
          <div className="space-y-2 border-2 border-blue-500 w-[96%]">
            <p className="text-3xl font-bold text-gray-900">{product.name}</p>
            <p className="text-xl font-semibold text-amber-600">
              ${product.price.toLocaleString()} COP
            </p>
            <p className="text-gray-700 text-base">{product.description}</p>
            <p className="text-sm text-gray-500">Categoría: {product.category}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>


        </div>
      </div>

      {/* Zona inferior: productos relacionados */}
      <div className="h-[40%] w-full">
        <h2 className="text-xl font-bold mb-2">Productos similares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
          {related.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col justify-between"
            >
              <div className="h-28 flex justify-center items-center overflow-hidden">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>
              <div className="text-sm font-semibold text-gray-900 truncate mt-2">
                {item.name}
              </div>
              <div className="text-sm text-amber-600 font-bold">
                ${item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
