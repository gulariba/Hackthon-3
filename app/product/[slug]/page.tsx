import { groq } from "next-sanity";
import { Product } from "../../../../types/product";
import client from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image"; // Ensure you have this function set up

interface ProductPageProps {
    params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<Product> {
    return client.fetch(
        groq`*[_type == "product" && slug.current == $slug][0]{
            _id,
            product,
            _type,
            image,
            price,
            description,
            productName
        }`, { slug }
    );
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square">
                {product.image && (
                    <Image
                        src={urlFor(product.image).url()} // Ensure the URL function is properly defined
                        alt={product.productname}
                        width={500}
                        height={500}
                        className="rounded-lg shadow-md"
                    />
                )}
            </div>
            <div>
                <h1 className="text-2xl font-bold">{product.productname}</h1>
                <p className="text-lg text-gray-700">{product.description}</p>
                <div className="mt-4">
                    <p className="text-xl font-semibold text-green-500">${product.price}</p>
                </div>
            </div>
        </div>
    );
}
