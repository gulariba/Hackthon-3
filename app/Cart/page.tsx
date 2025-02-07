"use client"; // Client component (important for useState)
import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import CartItem from "../Components/CardItem";

type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const CartPage = () => {
  const [cart, setCart] = useState<CartItemType[]>([
    { id: 1, name: "Product 1", price: 1500, quantity: 1, image: "/images/product1.png" },
    { id: 2, name: "Product 2", price: 2000, quantity: 2, image: "/images/product2.png" },
  ]);

  // ✅ Add to Cart
  const addToCart = (product: CartItemType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ❌ Remove from Cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 🔄 Update Quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  // 🧮 Calculate Total Price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">Your Shopping Cart</h1>

        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}

        <div className="flex justify-between mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold">Total:</h2>
          <h2 className="text-xl font-semibold">Rs. {totalPrice.toLocaleString()}</h2>
        </div>

        <div className="flex justify-center mt-4">
          <Link href="/checkout">
            <button className="bg-black text-white px-6 py-3 rounded-md">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartPage;
