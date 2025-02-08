/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { addToWishlist } from "../../redux/features/wishlistSlice";


const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist);

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToCart(product))
    toast.success('Product Added Successfully!');
  }

  const handleAddWishlist = (e, product) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist!");
  };

  return (
    <div className="max-w-xs bg-white overflow-hidden relative group">
      {/* Discount Badge */}
      <div className="absolute bg-red-500 text-white text-xs font-bold rounded px-3 py-1 left-2 top-2 z-10">
        35%
      </div>

      {/* Heart Icon */}
      <button onClick={(e) => handleAddWishlist(e, product)} type="button" className={`absolute bg-gray-200 rounded-full text-black font-bold px-2 py-2 right-2 top-2 z-10 
    ${products?.products.some((item) => item._id === product._id) ? "bg-red-400 text-white cursor-not-allowed" : "hover:bg-red-400 hover:text-white"}`}
        disabled={products?.products.some((item) => item._id === product._id)} >
        <FaRegHeart />
      </button>

      {/* Product Image */}
      <div className="relative">
        <img
          src={product?.image || "https://via.placeholder.com/150"}
          loading="lazy"
          alt="AK-900 Wired Keyboard"
          className="w-full object-cover bg-gray-100 p-5"
        />
        {/* Add to Cart Button */}
        <button
          onClick={(e) => handleAddToCart(e, product)}
          className="absolute bottom-0 left-0 right-0 bg-gray-400 hover:bg-gray-500 text-white text-sm font-bold py-2 opacity-100 group-hover:opacity-100 transition-opacity duration-300"
        >
          Add to Cart
        </button>
      </div>

      {/* Card Content */}
      <Link to={product?._id ? `/view/${product._id}` : "#"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="p-4 ">
        {/* Product Title */}
        <h2 className="text-gray-800 font-semibold text-sm hover:underline">{product?.title}</h2>
        {/* Price Section */}
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-red-500 font-semibold text-md">$960</span>
          <span className="text-gray-500 line-through">$1160</span>
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center text-yellow-400">
          {Array(4).fill("⭐").join("")}
          <span className="text-gray-500 ml-2">(75)</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductsCard;