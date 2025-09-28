import { useS3Image } from "../hooks/useS3Image";

const buildPlaceholder = (name) =>
  `https://placehold.co/400x300/F5F5DC/333333?text=${encodeURIComponent(name ?? "Producto")}`;

const ProductGridItem = ({ product, onNavigate }) => {
  const rawSource =
    product.photoUrl ??
    product.imageUrl ??
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null);
  const { url } = useS3Image(rawSource);
  const placeholder = buildPlaceholder(product.name);
  const priceLabel =
    typeof product.price === "number"
      ? product.price.toLocaleString("es-CO")
      : product.price ?? "";

  return (
    <div className="relative select-none rounded-sm overflow-hidden bg-[#F8F7F2] hover:border-1">
      <button
        onClick={() => onNavigate(product._id)}
        className="block w-full"
        aria-label={product.name}
      >
        <div className="relative w-full bg-white aspect-[4/3] md:aspect-[5/4]">
          {url ? (
            <img
              src={url}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <img
              src={placeholder}
              alt="Sin imagen"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
            />
          )}
        </div>
      </button>

      <div className="px-3 py-2 md:px-4 md:py-3">
        <div className="mb-1">
          <span className="inline-flex items-center text-sm px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            {product.category || "General"}
          </span>
        </div>

        <button
          onClick={() => onNavigate(product._id)}
          title={product.name}
          className="text-sm md:text-[15px] leading-5 text-gray-900 text-left overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] min-h-[2.4rem]"
        >
          {product.name}
        </button>

        <div className="mt-1 flex items-baseline gap-1">
          <p className="text-base md:text-[15px] font-semibold text-amber-600">
            {priceLabel ? `$${priceLabel} COP` : "Precio no disponible"}
          </p>
          {product.unit && <span className="text-xs text-gray-500">/ {product.unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductGridItem;