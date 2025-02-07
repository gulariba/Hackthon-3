import React from "react";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Image src={item.image} alt={item.name} width={80} height={80} />
        <p>{item.name}</p>
      </div>
      <p>Rs. {item.price}</p>
      <div className="flex items-center space-x-2">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-300">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-300">+</button>
      </div>
      <p>Rs. {item.price * item.quantity}</p>
      <ImBin2 onClick={() => removeFromCart(item.id)} className="text-red-500 cursor-pointer" />
    </div>
  );
};

export default CartItem;
