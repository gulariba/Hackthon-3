'use client';

import Hero from '@/app/Components/Hero';
import ShopProduct from '@/app/Components/ShopProduct';
import NewArrivals from '@/app/Components/NewArrivals';
import client from "@/sanity/lib/client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";

// Dynamic import for StripePayment component without SSR
const DynamicComponentWithNoSSR = dynamic(
  () => import('@/app/Components/StripePayment'),
  { ssr: false }
);

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  rating: number;
  slug: string;
}

// Function to fetch products
const getProducts = async (): Promise<Product[]> => {
  return await client.fetch(
    `*[_type=="product"][0..21]{
      _id,
      name,
      description,
      price,
      "image_url": image.asset->url,
      "slug": slug.current,
      rating
    }`
  );
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const addToCart = (productName: string) => {
    setMessage(`${productName} successfully added to cart!`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      <Hero />
      <ShopProduct />

      {/* Success Message */}
      {message && <div className="text-green-600 text-center mt-4">{message}</div>}

      {/* Top Picks Section */}
      <div className="w-full min-h-[800px]">
        <div className="flex flex-col items-center text-center">
          <p className="font-[500] text-[36px] leading-[54px] mt-20">Top Picks For You</p>
          <p className="font-[500] text-[16px] leading-[24px] text-[#9F9F9F] mt-5 max-w-2xl">
            Find a bright idea to suit your taste with our great selection of suspension, floor, and table lights.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4 sm:px-6 w-full">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105">
                <Link href={`/product/${product.slug}`}>
                  <Image src={product.image_url} alt={product.name} width={500} height={500} className="w-full h-48 object-cover" />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.price}</p>
                  <button onClick={() => addToCart(product.name)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewArrivals />

      {/* Our Blog Section */}
      <div className="w-full min-h-[844px] bg-[#FFFFFF] px-11">
        <div className="flex flex-col items-center text-center">
          <p className="font-[500] text-[36px] leading-[54px]">Our Blogs</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 w-full">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105">
                <Link href={`/product/${product.slug}`}>
                  <Image src={product.image_url} alt={product.name} width={500} height={500} className="w-full h-48 object-cover" />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <button onClick={() => addToCart(product.name)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Go to Cart Button */}
      <div className="flex justify-center items-center mt-10">
        <Link href="/Cart">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700">Go to Cart</button>
        </Link>
      </div>

      {/* Stripe Payment Component */}
      <DynamicComponentWithNoSSR />
    </div>
  );
};

export default Home;
