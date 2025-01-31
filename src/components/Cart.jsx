/* eslint-disable react/prop-types */
import axios from "axios";
import toast from "react-hot-toast";
import { Minus, Plus, Trash2, X } from 'lucide-react';
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Cart = ({ onClose }) => {
    const { user } = useAuth();
    const [cart, isLoading, refetchCart] = useCart();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (cart.length > 0) {
            setCartItems(cart.map(item => ({ ...item, quantity: item.quantity ?? 1 })));
        }
    }, [cart]);

    const updateQuantity = (id, action) => {
        setCartItems(prevCart =>
            prevCart.map(item =>
                item._id === id
                    ? { ...item, quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleRemoveToCart = async (Id) => {
        if (!user?.email) {
            toast.error("Please log in to remove items from the cart");
            return;
        }
        try {
            const res = await axios.patch("https://gadget-shop-server-bay.vercel.app/remove-cart", {
                userEmail: user?.email,
                productId: Id,
            });
            if (res.data.modifiedCount) {
                refetchCart();
                toast.success("Removed!");
            }
        } catch {
            toast.error("Failed to remove from cart");
        }
    };

    return (
        <div
            className="fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans"
            onClick={onClose}>
            <div className="w-full max-w-sm bg-white shadow-lg relative ml-auto h-screen" onClick={(e) => e.stopPropagation()}>
                <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
                    <div className="flex items-center gap-4 text-gray-800">
                        <h3 className="text-2xl font-bold flex-1">Shopping cart</h3>
                        <button onClick={onClose} className="text-xl p-2 rounded-full hover:bg-gray-200">
                            <X />
                        </button>
                    </div>


                    {/* Render cart items */}
                    {cart.length > 0 && !isLoading ? (
                        cart.map((item, index) => (
                            <div key={index} className="space-y-4 mt-12">
                                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4">
                                    <div className="flex items-start gap-4 w-full">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-100 p-2 rounded-md">
                                            <img src={item?.image} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm sm:text-base font-bold text-gray-800">{item?.name || "Smart Watch Timex"}</h3>
                                            <h4 className="text-sm sm:text-base font-bold text-gray-800">${item?.price || "60.00"}</h4>

                                            <div className="flex items-center justify-between mt-5">
                                                <button
                                                    onClick={() => handleRemoveToCart(item?._id)}
                                                    type="button"
                                                    className=" font-semibold  text-red-600 hover:text-red-700 text-xs flex items-center gap-1">
                                                    <Trash2 />
                                                </button>
                                                <div
                                                    className="flex items-center px-2 py-1 border border-gray-300 text-gray-800 text-xs bg-transparent rounded-md">
                                                   <button  onClick={() => updateQuantity(item._id, "decrease")} className="hover:text-red-500"> <Minus /></button>
                                                    <span className="mx-3 font-bold">1</span>
                                                   <button onClick={() => updateQuantity(item._id, "increase")} className="hover:text-red-500"> <Plus /></button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <hr className="border-gray-300" />
                            </div>

                        ))
                    ) : (
                        <div className="flex h-1/2 text-center items-center justify-center">
                            <h1>Please add to Cart!</h1>
                        </div>
                    )}
                </div>

                {/* total amount   */}
                <div className="p-4 absolute bottom-0 w-full border-t bg-white">
                    <ul className="text-gray-800 divide-y">
                        <li className="flex flex-wrap gap-4 text-lg font-bold">Subtotal <span className="ml-auto">${totalPrice}</span></li>
                    </ul>
                    <button type="button" className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-red-600 hover:bg-red-700 text-white rounded-md tracking-wide">Make Payment</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
